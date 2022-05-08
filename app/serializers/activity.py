from rest_framework import serializers
from app.models import Activity, ActivityGroup, User


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name']


class SimpleActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['name']


class ActivityGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityGroup
        fields = "__all__"

    members = SimpleUserSerializer(many=True, read_only=True)
    activity = SimpleActivitySerializer()

    ''' overrode this method because I wasn't able to create a group via api call '''

    def create(self, validated_data):
        student_data = self.__dict__['_kwargs']['data']['members']  # gets student ids
        student_ids = student_data.split(',') if isinstance(student_data,
                                                            str) else student_data  # converts string to list
        members = User.objects.filter(pk__in=student_ids)  # gets student records
        validated_data['members'] = members
        return super().create(validated_data)


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = "__all__"
        read_only_fields = ['date']
        depth = 1

    activity_groups = ActivityGroupSerializer(many=True)
