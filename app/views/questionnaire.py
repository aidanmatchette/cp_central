from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import Group
from app.models import Questionnaire, FilledQuestionnaire, Question, QuestionOption
from app.serializers import QuestionnaireSerializer, FilledQuestionnaireSerializer, QuestionSerializerBase, QuestionOptionSerializer, QuestionSerializer


class QuestionnaireViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Questionnaire.objects.all()
    serializer_class = QuestionnaireSerializer

    @action(methods=['POST'], detail=False)
    def generate(self, request, pk=None):  # noqa
        template_id = request.data['template_id'] if 'template_id' in request.data else None
        # TODO create some logic to pull from a template to create new questionnaires
        new_q = Questionnaire(
            originator_id=request.data['originator'],
            name=request.data['name'],
            is_viewable=(request.data['is_viewable'] == 'on') if 'is_viewable' in request.data else False,
            type=request.data['type']
        )
        new_q.save()
        new_q.group.add(Group.objects.get(pk=request.data['group']))
        new_q.save()
        return JsonResponse(QuestionnaireSerializer(new_q).data, status=200)


class QuestionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()
    serializer_class = QuestionSerializerBase

    @action(methods=['GET'], detail=True)
    def responses(self, request, pk=None):
        question = Question.objects.get(pk=pk)
        return JsonResponse(QuestionSerializer(question).data)


class QuestionOptionViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = QuestionOption.objects.all()
    serializer_class = QuestionOptionSerializer


class FilledQuestionnaireViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FilledQuestionnaire.objects.all()
    serializer_class = FilledQuestionnaireSerializer
