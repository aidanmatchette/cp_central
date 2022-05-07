from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Appointment, UserLink, LessonLink, Topic, Vote, Question, QuestionResponse, QuestionOption, \
    Lesson, Questionnaire, FilledQuestionnaire, Feedback, ActivityGroup, Activity, Cohort, CheckIn, Forum, ForumComment, ForumImage, ForumPost

# admin.site.register(User, UserAdmin)
admin.site.register(User)
admin.site.register(Appointment)
admin.site.register(UserLink)
admin.site.register(LessonLink)
admin.site.register(Topic)
admin.site.register(Vote)
admin.site.register(Question)
admin.site.register(QuestionResponse)
admin.site.register(QuestionOption)
admin.site.register(Lesson)
admin.site.register(Questionnaire)
admin.site.register(FilledQuestionnaire)
admin.site.register(Feedback)
admin.site.register(ActivityGroup)
admin.site.register(Activity)
admin.site.register(Cohort)
admin.site.register(CheckIn)

admin.site.register(Forum)
admin.site.register(ForumComment)
admin.site.register(ForumImage)
admin.site.register(ForumPost)

# Dragons1234!@#$
# python -Xutf8 manage.py dumpdata --exclude auth.permission --exclude contenttypes --exclude admin.logentry > data.json
