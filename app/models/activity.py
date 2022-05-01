from django.db import models
from django.contrib.auth.models import Group
from app.models import User


class Activity(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="activities")
    name = models.CharField(max_length=64)


class ActivityGroup(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name="activity_groups")
    members = models.ManyToManyField(User, related_name="activity_groups")
