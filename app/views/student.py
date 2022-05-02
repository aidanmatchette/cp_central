import datetime

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.models import User, CheckIn
from app.serializers import CheckinStatusSerializer


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def student_checkin(request):  # /api/v1/instructor/checkin/
    pass