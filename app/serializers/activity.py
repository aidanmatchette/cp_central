from rest_framework import serializers
from app.models import Activity, ActivityGroup, User

class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class ActivityGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityGroup
        fields = "__all__"
    members = SimpleUserSerializer(many=True, read_only=True)


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"
    activity_groups = ActivityGroupSerializer(many=True)
