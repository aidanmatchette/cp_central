from django.db import models
from django.contrib.auth.models import Group
from app.models import User


class Activity(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="activities")
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name

class ActivityGroup(models.Model):
    activity = models.ForeignKey(Activity, on_delete=models.CASCADE, related_name="activity_groups")
    members = models.ManyToManyField(User, related_name="activity_groups")

    def __str__(self):
        return f"Group {self.id} / {self.activity.name}"