import datetime

from app.models import User, UserLink, Appointment, CheckIn
from app.serializers import UserSerializer, UserLinkSerializer, AppointmentSerializer, RosterSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def checkin(request):  # /api/v1/instructor/checkin/
    date = request.data['date'] if 'date' in request.data.keys() else datetime.datetime.now()
    group = request.user.groups.first()
    prev = CheckIn.objects.filter(date=date).first()
    if request.method == 'POST':
        if prev:
            return JsonResponse({"status": "Record not created, already exists for date"}, status=200)
        new_checkin = CheckIn(date=date)
        new_checkin.save()
        return
    else:
        pass

    return JsonResponse({"done": "done"}, status=200)
