from app.models import User, UserLink, Feedback, Questionnaire, Question, LessonLink
from django.http import JsonResponse
from rest_framework.decorators import api_view


@api_view(['GET'])
def all_choices(request):
    output = {
        "timeZones": User.TimeZoneChoices.choices,
        "userLinkTypes": UserLink.UserLinkType.choices,
        "feedbackTopics": Feedback.FeedbackTopic.choices,
        "feedbackCategories": Feedback.FeedbackCategory.choices,
        "questionnaireTypes": Questionnaire.QuestionnaireType.choices,
        "questionResponseTypes": Question.ResponseType.choices,
        "lessonLinkTypes": LessonLink.LessonLinkType.choices,
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
