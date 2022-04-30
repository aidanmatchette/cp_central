import os

from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from dotenv import load_dotenv

load_dotenv()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("app.urls")),
]

# will only serve react app if not in debug mode
if not (os.getenv('DEBUG') == "true"):
    urlpatterns += [path('', TemplateView.as_view(template_name='index.html'))]
