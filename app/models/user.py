from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.ImageField(default='default.png', blank=True)

    class TimeZoneChoices(models.TextChoices):
        AST = "AST", "Atlantic Standard Time"
        EST = "EST", "Eastern Standard Time"
        CST = "CST", "Central Standard Time"
        MST = "MST", "Mountain Standard Time"
        PST = "PST", "Pacific Standard Time"
        AKST = "AKST", "Alaska Standard Time"
        HST = "HST", "Hawaii Standard Time"
        SST = "SST", "Samoa Standard Time"
    timezone = models.CharField(max_length=4, choices=TimeZoneChoices.choices, default=TimeZoneChoices.CST)


class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointments")
    start_time = models.DateTimeField()
    stop_time = models.DateTimeField()


class UserLink(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="links")
    name = models.CharField(max_length=64)
    is_public = models.BooleanField(default=True)
    url = models.URLField()

    class UserLinkType(models.IntegerChoices):
        OTHER = 0
        LINKEDIN = 1
        GITHUB = 2
        YOUTUBE = 3
    link_type = models.IntegerField(choices=UserLinkType.choices, default=UserLinkType.OTHER)
