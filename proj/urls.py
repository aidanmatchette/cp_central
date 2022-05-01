import os
from django.conf.urls.static import static
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from dotenv import load_dotenv

load_dotenv()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("app.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# will only serve react app if not in debug mode
if not (os.getenv('DEBUG') == "true"):
    urlpatterns += [path('', TemplateView.as_view(template_name='index.html'))]
