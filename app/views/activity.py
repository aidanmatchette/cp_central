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

    def get_queryset(self):
        date = self.request.GET["date"] if 'date' in self.request.GET else None
        if date is not None:
            return Activity.objects.filter(date=date)
        return super().get_queryset()

class ActivityGroupViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ActivityGroup.objects.all()
    serializer_class = ActivityGroupSerializer