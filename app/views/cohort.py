from app.models import Cohort
from django.contrib.auth.models import Group
from app.serializers import CohortSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet


class CohortViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Cohort.objects.all()
    serializer_class = CohortSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return JsonResponse(serializer.data, status=200)

    def create(self, request, *args, **kwargs):
        instance = Cohort(
            group=Group.objects.get(pk=request.POST['group']),
            github_key=request.POST['github_key'] if 'github_key' in request.POST else None,
            metadata=request.POST['metadata'] if 'metadata' in request.POST else None,
            calendar_key=request.POST['calendar_key'] if 'calendar_key' in request.POST else None,
        )
        instance.save()
        return JsonResponse(CohortSerializer(instance).data)
