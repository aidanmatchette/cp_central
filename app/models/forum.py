from django.db import models
from .user import User


class Forum(models.Model):
    name = models.CharField(max_length=64)


class ForumImage(models.Model):
    image = models.ImageField(null=True, blank=True)


class ForumPost(models.Model):
    forum = models.ForeignKey(Forum, on_delete=models.CASCADE, related_name="forum_posts")
    title = models.CharField(max_length=64)
    body = models.TextField()
    originator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="forum_posts")
    images = models.ManyToManyField(ForumImage, related_name="forum_posts")


class ForumComment(models.Model):
    originator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="forum_comments")
    body = models.TextField()
    accepted_answer = models.BooleanField(default=False)
    images = models.ManyToManyField(ForumImage, related_name="forum_comments")
