from django.urls import path, include
from .views import UserViewSet, signup, all_choices, TopicViewSet, TopicLinkViewSet, VoteViewSet, LessonViewSet,\
    FeedbackViewSet, ActivityViewSet, ActivityGroupViewSet, FilledQuestionnaireViewSet, QuestionnaireViewSet, \
    CheckInViewSet, AppointmentViewSet, UserLinkViewSet, roster, super_info
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework.routers import DefaultRouter

r = DefaultRouter()
r.register(r'user', UserViewSet, basename="user")
r.register(r'topic', TopicViewSet, basename="topic")
r.register(r'topic_link', TopicLinkViewSet, basename="topic_link")
r.register(r'vote', VoteViewSet, basename="vote")
r.register(r'lesson', LessonViewSet, basename="lesson")
r.register(r'feedback', FeedbackViewSet, basename="feedback")
r.register(r'activity', ActivityViewSet, basename="activity")
r.register(r'activity_group', ActivityGroupViewSet, basename="activity_group")
r.register(r'filled_questionnaire', FilledQuestionnaireViewSet, basename="filled_questionnaire")
r.register(r'questionnaire', QuestionnaireViewSet, basename="questionnaire")
r.register(r'checkin', CheckInViewSet, basename="checkin")
r.register(r'appointment', AppointmentViewSet, basename="appointment")
r.register(r'user_link', UserLinkViewSet, basename="user_link")

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('v1/', include(r.urls)),

    path('signup/', signup, name='signup'),
    path('all_choices/', all_choices, name='all_choices'),
    path('roster/', roster, name='roster'),
    path('super_info/', super_info, name='super_info'),
]
