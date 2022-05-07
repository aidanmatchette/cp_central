from app.models import ForumPost, ForumComment, Forum, ForumImage, User
from app.serializers import *
from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import Group


class ForumViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Forum.objects.all()
    serializer_class = ForumSerializerBase


class ForumPostViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializerBase


class ForumCommentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ForumComment.objects.all()
    serializer_class = ForumCommentSerializerBase

