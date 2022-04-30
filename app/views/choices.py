from app.models import User
from django.http import JsonResponse
from rest_framework.decorators import api_view


@api_view(['GET'])
def all_choices(request):
    output = {
        "timeZones": User.TimeZoneChoices.choices,
        "cohorts": [
            {"group_id": 1,
             "name": "QUEBEC"
             },

            {"group_id": 2,
             "name": "PAPA"
             },
        ]
    }
    return JsonResponse(output, status=200)
