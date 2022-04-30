from rest_framework import serializers
from app.models import User, UserLink, Appointment


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
        exclude = ["password"]
    links = UserLinkSerializer(many=True, read_only=True)
    appointments = AppointmentSerializer(many=True, read_only=True)


class RosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["first_name", "last_name", "id"]