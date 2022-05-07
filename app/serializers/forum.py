from rest_framework import serializers
from app.serializers import UserSerializer
from app.models import Forum, ForumPost, ForumComment, ForumImage


class ForumImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ForumImage
        fields = "__all__"


class ForumCommentSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = ForumComment
        fields = "__all__"


class ForumPostSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = ForumPost
        fields = "__all__"


class ForumSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = Forum
        fields = "__all__"


class ForumCommentSerializer(ForumCommentSerializerBase):
    originator = UserSerializer()
    images = ForumImageSerializer(many=True)


class ForumPostSerializer(ForumPostSerializerBase):
    forum = ForumSerializerBase()
    originator = UserSerializer()
    images = ForumImageSerializer(many=True)
    forum_comments = ForumCommentSerializer(many=True)


class ForumSerializer(ForumSerializerBase):
    forum_posts = ForumPostSerializer(many=True)
