from django.db import models
from app.models import User


class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="feedbacks")
    title = models.CharField(max_length=64)
    description = models.TextField()

    class FeedbackTopic(models.IntegerChoices):
        LESSON_CONTENT = 0
        LESSON_DELIVERY = 1
        BROKEN_LINK = 2
        ADD = 3
        MODIFY = 4
        REMOVE = 5
    topic = models.IntegerField(choices=FeedbackTopic.choices, default=FeedbackTopic.LESSON_CONTENT)

    class FeedbackCategory(models.IntegerChoices):
        GOOD = 0
        OKAY = 1
        BAD = 2
        SHOUTOUT = 3
        OTHER = 4
    category = models.IntegerField(choices=FeedbackCategory.choices, default=FeedbackCategory.OTHER)


class Vote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votes')
    is_agreed = models.BooleanField(default=True)
    feedback = models.ForeignKey(Feedback, on_delete=models.CASCADE, related_name="votes")
