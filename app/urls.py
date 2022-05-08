from django.urls import path, include
from .views import UserViewSet, signup, all_choices, TopicViewSet, LessonLinkViewSet, VoteViewSet, LessonViewSet,\
    FeedbackViewSet, ActivityViewSet, ActivityGroupViewSet, FilledQuestionnaireViewSet, QuestionnaireViewSet, \
    AppointmentViewSet, UserLinkViewSet, roster, super_info, instructor_checkin, CohortViewSet, student_landing, search, create_random_groups, \
    search, create_random_groups, QuestionViewSet, QuestionOptionViewSet, refresh_lesson, ForumViewSet, ForumPostViewSet, ForumCommentViewSet
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework.routers import DefaultRouter

r = DefaultRouter()
r.register(r'user', UserViewSet, basename="user")
r.register(r'topic', TopicViewSet, basename="topic")
r.register(r'lesson_link', LessonLinkViewSet, basename="lesson_link")
r.register(r'vote', VoteViewSet, basename="vote")
r.register(r'lesson', LessonViewSet, basename="lesson")
r.register(r'feedback', FeedbackViewSet, basename="feedback")
r.register(r'activity', ActivityViewSet, basename="activity")
r.register(r'activity_group', ActivityGroupViewSet, basename="activity_group")
r.register(r'filled_questionnaire', FilledQuestionnaireViewSet, basename="filled_questionnaire")
r.register(r'questionnaire', QuestionnaireViewSet, basename="questionnaire")
r.register(r'appointment', AppointmentViewSet, basename="appointment")
r.register(r'user_link', UserLinkViewSet, basename="user_link")
r.register(r'cohort', CohortViewSet, basename="cohort")
r.register(r'question', QuestionViewSet, basename="question")
r.register(r'question_option', QuestionOptionViewSet, basename="question_option")

r.register(r'forum', ForumViewSet, basename="forum")
r.register(r'forum_post', ForumPostViewSet, basename="forum_post")
r.register(r'forum_comment', ForumCommentViewSet, basename="forum_comment")

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('v1/', include(r.urls)),

    path('signup/', signup, name='signup'),
    path('all_choices/', all_choices, name='all_choices'),
    path('roster/', roster, name='roster'),
    path('roster/randomize/', create_random_groups, name='create_random_groups'),
    path('super_info/', super_info, name='super_info'),
    path('instructor/checkin/', instructor_checkin, name='instructor_checkin'),
    path('student/landing/', student_landing, name='student_landing'),
    path('search/', search, name='search'),
    path('refresh_lesson/', refresh_lesson, name="refresh_lesson")
]
