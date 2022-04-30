from app.models import User, UserLink
from django.http import JsonResponse
from rest_framework.decorators import api_view


@api_view(['GET'])
def all_choices(request):
    output = {
        "timeZones": User.TimeZoneChoices.choices,
        "linkTypes": UserLink.UserLinkType.choices,
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
