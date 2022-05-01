from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from app.models import Activity, ActivityGroup
from app.serializers import ActivitySerializer, ActivityGroupSerializer


class ActivityViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class ActivityGroupViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ActivityGroup.objects.all()
    serializer_class = ActivityGroupSerializer
