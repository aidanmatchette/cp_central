import datetime
import json

from django.db.models import OuterRef, Subquery

from app.models import User, UserLink, Appointment, CheckIn
from app.serializers import UserSerializer, RosterSerializer, CheckinStatusSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.core import serializers


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def checkin(request):  # /api/v1/instructor/checkin/
    date = request.data['date'] if 'date' in request.data.keys() else datetime.datetime.now()
    fdate = date.strftime("%Y-%m-%d")
    group = request.user.default_group
    prev = CheckIn.objects.filter(date=date, group=group).first()
    if request.method == 'POST':
        if prev:
            return JsonResponse({"status": "Record not created, already exists for date"}, status=200)
        new_checkin = CheckIn(date=fdate, group=group)
        new_checkin.save()
        return JsonResponse({"status": "Checkin created"}, status=200)
    else:
        cohort = User.objects.raw("""
        SELECT A.*, B.date, C.checkin_id IS NOT NULL as is_checked_in
        from app_user as A
        left outer join app_checkin as B
        left join app_checkin_user as C
        on C.user_id = A.id
        where B.date = %s and A.default_group_id = %s
        """, [fdate, group.pk])
        return JsonResponse(CheckinStatusSerializer(cohort, many=True).data, safe=False, status=200)
