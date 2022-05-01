from rest_framework import serializers
from app.models import Lesson, Topic, TopicLink


class TopicLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = TopicLink
        fields = "__all__"


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"
    topic_links = TopicLinkSerializer(many=True)


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"
    topics = TopicSerializer(many=True)
