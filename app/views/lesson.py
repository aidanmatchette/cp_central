from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from app.models import Lesson, Topic, LessonLink
from app.serializers import LessonSerializer, TopicSerializer, LessonLinkSerializer
from rest_framework.response import Response
from ..helpers.github_api import get_daily_readme_from_gh

class LessonViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

    def retrieve(self, request, *args, **kwargs):
        '''
        interecepts the individual lesson request and adds the readme markdown to it via github api call
        '''
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        readme_path = serializer.data["lesson_file_path"]
        response_dict = {'readme': get_daily_readme_from_gh(readme_path)}
        response_dict.update(serializer.data)
        return Response(response_dict)


class TopicViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class LessonLinkViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = LessonLink.objects.all()
    serializer_class = LessonLinkSerializer
