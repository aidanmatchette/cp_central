from rest_framework import serializers
from app.models import Feedback, Vote
from .user import UserSerializer


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = "__all__"


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = "__all__"
    votes = VoteSerializer(many=True)
    user = UserSerializer()
