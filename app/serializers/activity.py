from rest_framework import serializers
from app.models import Activity, ActivityGroup


class ActivityGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityGroup
        fields = "__all__"


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"
    activity_groups = ActivityGroupSerializer(many=True)
