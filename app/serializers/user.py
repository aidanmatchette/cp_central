from rest_framework import serializers, fields
from app.models import User, UserLink, Appointment, CheckIn
from django.contrib.auth.models import Group


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"


class UserLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLink
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ["password", "user_permissions"]
    links = UserLinkSerializer(many=True, read_only=True)
    appointments = AppointmentSerializer(many=True, read_only=True)
    groups = GroupSerializer(many=True, read_only=True)


class CheckinStatusSerializer(serializers.ModelSerializer):
    date = serializers.DateField()
    is_checked_in = serializers.BooleanField()
    # added to match landing data per Aidan
    links = UserLinkSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "date", "is_checked_in"]


class RosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "id", "is_staff", "is_superuser"]


# class CheckInSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CheckIn
#         fields = "__all__"
