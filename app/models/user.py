from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.ImageField()

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
