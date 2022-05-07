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

    @action(methods=['GET'], detail=True)
    def posts(self, request, pk=None):  # noqa
        forums = Forum.objects.get(pk=pk)
        return JsonResponse(ForumSerializer(forums).data)


class ForumPostViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializerBase

    @action(methods=['POST'], detail=True)
    def add_comment(self, request, pk=None):  # noqa
        post = ForumPost.objects.get(pk=pk)
        comment = ForumComment(
            post=post,
            originator=request.user,
            body=request.data['body']
        )
        comment.save()
        return JsonResponse(ForumPostSerializer(post).data)


class ForumCommentViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ForumComment.objects.all()
    serializer_class = ForumCommentSerializerBase

