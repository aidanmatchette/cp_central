from django.contrib import admin
from .models import User, Appointment, UserLink, TopicLink, Topic, Vote, Question, QuestionResponse, QuestionOption, \
    Lesson, Questionnaire, FilledQuestionnaire, Feedback, ActivityGroup, Activity

admin.site.register(User)
admin.site.register(Appointment)
admin.site.register(UserLink)
admin.site.register(TopicLink)
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
