from django.db import models
from django.contrib.auth.models import Group


class Cohort(models.Model):
    group = models.OneToOneField(Group, on_delete=models.CASCADE, primary_key=True)
    github_key = models.CharField(max_length=200, blank=True, null=True)
    metadata = models.JSONField(blank=True, null=True)
    calendar_key = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.group.name