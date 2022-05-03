from app.models import User, UserLink, Feedback, Questionnaire, Question, LessonLink
from app.serializers import GroupSerializer
from django.contrib.auth.models import Group
from django.http import JsonResponse
from rest_framework.decorators import api_view


def get_all_choices():
    return {
        "timeZones": User.TimeZoneChoices.choices,
        "userLinkTypes": UserLink.UserLinkType.choices,
        "feedbackTopics": Feedback.FeedbackTopic.choices,
        "feedbackCategories": Feedback.FeedbackCategory.choices,
        "questionnaireTypes": Questionnaire.QuestionnaireType.choices,
        "questionResponseTypes": Question.ResponseType.choices,
        "lessonLinkTypes": LessonLink.LessonLinkType.choices,
        "cohorts": GroupSerializer(Group.objects.all(), many=True).data,
    }


@api_view(['GET'])
def all_choices(request):
    return JsonResponse(get_all_choices(), status=200)
