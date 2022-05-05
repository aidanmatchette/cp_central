import datetime
from app.helpers import get_daily_readme_from_gh
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.models import User, CheckIn, Cohort, Lesson
from app.serializers import UserSerializer, LessonSerializer, CohortSerializer
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
    # curriculum = [get_daily_readme_from_gh(x.lesson_file_path) for x in lessons]
    output = {
        "is_checked_in": CheckIn.objects.filter(user__in=[request.user], date=date).first() is not None,
        'date': fdate,
        'my_info': UserSerializer(request.user).data,
        'cohort': CohortSerializer(cohort).data,
        'class_roster': UserSerializer(user.default_group.user_set.all(), many=True).data,
        'questionnaires': [],  # TODO implement
        'activity_groups': [],  # TODO implement
        'my_feedback': [],  # TODO implement
        # 'curriculum': curriculum,
        'lessons': LessonSerializer(lessons, many=True).data,
        'choices': get_all_choices(),
    }
    return JsonResponse(output)
