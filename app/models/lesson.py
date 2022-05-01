from django.db import models
from django.contrib.auth.models import Group


class Lesson(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="lessons")
    description = models.TextField()
    date = models.DateField(null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    stop_time = models.DateTimeField(null=True, blank=True)


class Topic(models.Model):
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="topics")
    parent_topic = models.ForeignKey('self', on_delete=models.CASCADE)
    description = models.TextField()
    markdown_url = models.URLField()  # later on this could be refactored to hold the markdown instead of a link
    img_url = models.URLField()


class TopicLink(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="topic_links")
    url = models.URLField()
    description = models.TextField()

    # class TopicLinkType(models.IntegerChoices):
    #     NONE = 0
    #     GITHUB = 1
    #     BLOG = 2
