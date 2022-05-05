from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import Group

default_user_metadata = {
    "mentor": "",
    "resume_coach": "",
    "group_team": "",
    "interviewer": "",
    "interview_date": ""
}


class User(AbstractUser):
    avatar = models.ImageField(default='default.png', blank=True)
    metadata = models.JSONField(null=True, blank=True, default=default_user_metadata)
    default_group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='default_users', null=True, blank=True)
    markdown = models.TextField(default="", null=True, blank=True)

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

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name} - {self.name}'


class CheckIn(models.Model):
    date = models.DateField()
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='checkins')
    user = models.ManyToManyField(User, related_name="checkins")
