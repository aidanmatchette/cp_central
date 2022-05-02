from app.models import Cohort
from rest_framework import serializers
from app.serializers import GroupSerializer


class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cohort
        fields = "__all__"
    group = GroupSerializer()
