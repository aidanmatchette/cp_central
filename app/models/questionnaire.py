from django.db import models
from django.contrib.auth.models import Group
from app.models import User


class Questionnaire(models.Model):
    originator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="questionnaires")
    name = models.CharField(max_length=255)
    group = models.ManyToManyField(Group, related_name="questionnaires")
    is_viewable = models.BooleanField(default=False)

    class QuestionnaireType(models.IntegerChoices):
        CUSTOM = 0
        PEER_PROG_FEEDBACK = 1
        POLL = 2
    type = models.IntegerField(choices=QuestionnaireType.choices, default=QuestionnaireType.CUSTOM)


class Question(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name="questions")
    text = models.TextField()

    class ResponseType(models.IntegerChoices):
        TEXT = 0  # Single line text
        TEXTAREA = 1  # Multi line text
        RADIO = 2  # Show all options at once
        COMBO = 3  # Show dropdown menu
        MULTI_SELECT = 4  # Show list to select multiple options
    response_type = models.IntegerField(choices=ResponseType.choices, default=ResponseType.TEXT)


class QuestionOption(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="question_options")
    text = models.TextField()
    is_correct = models.BooleanField(default=False)


class FilledQuestionnaire(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE, related_name="filled_questionnaires")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="filled_questionnaires")
    is_complete = models.BooleanField(default=False)
    # class FilledQuestionnaireStatus(models.IntegerChoices):
    #     NOT_STARTED = 0
    #     IN_PROGRESS = 1
    #     COMPLETE = 2


class QuestionResponse(models.Model):
    filled_questionnaire = models.ForeignKey(FilledQuestionnaire, on_delete=models.CASCADE, related_name="question_responses")
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="question_responses")
    question_option = models.ForeignKey(QuestionOption, on_delete=models.CASCADE, related_name="question_responses")
    text = models.TextField(null=True, blank=True)
