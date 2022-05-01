from rest_framework import serializers
from app.models import Lesson, Topic, LessonLink


class LessonLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonLink
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"
    lesson_links = LessonLinkSerializer(many=True)


class TopicSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = "__all__"
    lessons = LessonSerializer(many=True)


class TopicSerializer(TopicSerializerBase):
    sub_topics = TopicSerializerBase(many=True)
