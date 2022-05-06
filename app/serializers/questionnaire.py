from rest_framework import serializers
from app.models import Questionnaire, Question, QuestionResponse, QuestionOption, FilledQuestionnaire


class QuestionOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionOption
        fields = "__all__"


class QuestionSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"
    question_options = QuestionOptionSerializer(many=True)


class QuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = "__all__"
    questions = QuestionSerializer(many=True)


class QuestionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionResponse
        fields = "__all__"
    question = QuestionSerializer()
    question_option = QuestionOptionSerializer()


class FilledQuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilledQuestionnaire
        fields = "__all__"
    questionnaire = QuestionnaireSerializer(many=False)
    question_responses = QuestionResponseSerializer(many=True)
