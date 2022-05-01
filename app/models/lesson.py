from django.db import models
from django.contrib.auth.models import Group


class Topic(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="topics")
    parent_topic = models.ForeignKey('self', on_delete=models.CASCADE)
    title = models.CharField(max_length=64)
    description = models.TextField()


# as of now the lesson and schedule are combined,
# May break these out if cohorts are using same base lessons (right now they do not)
class Lesson(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="lessons", null=True)
    description = models.TextField()
    markdown_url = models.URLField(default="https://www.github.com/")  # later on this could be refactored to hold the markdown instead of a link
    img_url = models.URLField(null=True, blank=True)
    date = models.DateField(null=True, blank=True)
    start_time = models.DateTimeField(null=True, blank=True)
    stop_time = models.DateTimeField(null=True, blank=True)


class TopicLink(models.Model):
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name="topic_links")
    url = models.URLField()
    description = models.TextField()

    # class TopicLinkType(models.IntegerChoices):
    #     NONE = 0
    #     GITHUB = 1
    #     BLOG = 2
