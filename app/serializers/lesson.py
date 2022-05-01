from rest_framework import serializers
from app.models import Lesson, Topic, LessonLink


class TopicLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonLink
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
