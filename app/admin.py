from django.contrib import admin
from .models import User, Appointment, UserLink

admin.site.register(User)
admin.site.register(Appointment)
admin.site.register(UserLink)
