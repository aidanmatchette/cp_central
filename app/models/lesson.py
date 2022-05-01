from django.db import models
from django.contrib.auth.models import Group


class Topic(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="topics")
    parent_topic = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=64)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'{self.group.name} {self.title}'


# as of now the lesson and schedule are combined,
# May break these out if cohorts are using same base lessons (right now they do not)
class Lesson(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="lessons", null=True)
    title = models.CharField(max_length=64)
    description = models.TextField(null=True, blank=True)
    markdown_url = models.URLField(default="https://www.github.com/")  # later on this could be refactored to hold the markdown instead of a link
    img_url = models.URLField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    stop_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.topic.title} - {self.title}'


class LessonLink(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="lesson_links")
    url = models.URLField()
    description = models.TextField()

    class LessonLinkType(models.IntegerChoices):
        SUPPLEMENT = 0
        CHALLENGE = 1
        ASSESSMENT = 2
    link_type = models.IntegerField(choices=LessonLinkType.choices, default=LessonLinkType.CHALLENGE)
