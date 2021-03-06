import datetime
from app.helpers import get_daily_readme_from_gh
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.models import User, CheckIn, Cohort, Lesson, Questionnaire, ActivityGroup
from app.serializers import UserSerializer, LessonSerializer, CohortSerializer, QuestionnaireSerializer, ActivityGroupSerializer
from . import get_all_choices


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_landing(request):
    # TODO move date parsing into helper
    date = datetime.datetime.strptime(request.GET['date'], '%Y-%m-%d') if 'date' in request.GET.keys() else datetime.datetime.now()
    fdate = date.strftime("%Y-%m-%d")
    user = User.objects.get(id=request.user.id)
    cohort = Cohort.objects.get(pk=user.default_group.pk)
    lessons = Lesson.objects.filter(date=fdate)
    activity_groups = ActivityGroup.objects.filter(members__in=[request.user], activity__date=date)
    questionnaires = Questionnaire.objects.all()
    # curriculum = [get_daily_readme_from_gh(x.lesson_file_path) for x in lessons]
    output = {
        "is_checked_in": CheckIn.objects.filter(user__in=[request.user], date=date).first() is not None,
        'date': fdate,
        'my_info': UserSerializer(request.user).data,
        'cohort': CohortSerializer(cohort).data,
        'class_roster': UserSerializer(User.objects.filter(default_group=cohort.pk), many=True).data,
        'activity_groups': ActivityGroupSerializer(activity_groups, many=True).data,
        'questionnaires': QuestionnaireSerializer(questionnaires, many=True).data,
        'my_feedback': [],  # TODO implement
        # 'curriculum': curriculum,
        'lessons': LessonSerializer(lessons, many=True).data,
        'choices': get_all_choices(),
    }
    return JsonResponse(output)
