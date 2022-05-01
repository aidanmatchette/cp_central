from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from app.models import Lesson, Topic, TopicLink
from app.serializers import LessonSerializer, TopicSerializer, TopicLinkSerializer


class LessonViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer


class TopicViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class TopicLinkViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = TopicLink.objects.all()
    serializer_class = TopicLinkSerializer
