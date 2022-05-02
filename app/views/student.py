import datetime

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.models import User, CheckIn
from app.serializers import UserSerializer, GroupSerializer


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def student_checkin(request):  # /api/v1/instructor/checkin/
    # TODO implement
    pass


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_landing(request):
    # TODO move date parsing into helper
    date = datetime.datetime.strptime(request.data['date'], '%Y-%m-%d') if 'date' in request.data.keys() else datetime.datetime.now()
    fdate = date.strftime("%Y-%m-%d")
    user = User.objects.get(id=request.user.id)
    output = {
        "is_checked_in": CheckIn.objects.filter(user__in=[request.user], date=date).first() is not None,
        'date': fdate,
        'my_info': UserSerializer(request.user).data,
        'group': GroupSerializer(user.default_group).data,
        'class_roster': UserSerializer(user.default_group.user_set.all(), many=True).data,
        'questionnaires': [],  # TODO implement
        'activity_groups': [],  # TODO implement
        'my_feedback': [],  # TODO implement
        'curriculum': [],  # TODO in progress
        'static_links': [],  # TODO in progress
    }
    return JsonResponse(output)
