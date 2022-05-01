from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from app.models import Questionnaire, FilledQuestionnaire
from app.serializers import QuestionnaireSerializer, FilledQuestionnaireSerializer


class QuestionnaireViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer


class FilledQuestionnaireViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FilledQuestionnaire.objects.all()
    serializer_class = FilledQuestionnaireSerializer
