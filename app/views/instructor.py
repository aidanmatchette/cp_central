import datetime

from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.models import User, CheckIn, Lesson
from app.serializers import CheckinStatusSerializer, CheckinSerializer, LessonSerializer
from app.helpers import get_daily_readme_from_gh


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def instructor_checkin(request):  # /api/v1/instructor/checkin/
    date = request.data['date'] if 'date' in request.data.keys() else datetime.datetime.now().strftime("%Y-%m-%d")
    # fdate = date
    group = request.user.default_group
    prev = CheckIn.objects.filter(date=date, group=group).first()
    if request.method == 'POST':
        if prev:
            return JsonResponse({"status": "Record not created, already exists for date"}, status=200)
        new_checkin = CheckIn(date=date, group=group)
        new_checkin.save()
        return JsonResponse({"status": "Checkin created"}, status=200)
    else:
        checked_in = CheckIn.objects.filter(group=group, date=date)
        if not checked_in.first():
            return JsonResponse({"checked_in": []})
        ids = CheckinSerializer(checked_in, many=True).data[0]['user']
        return JsonResponse({"checked_in": ids})
        # cohort = User.objects.raw("""
        # SELECT A.*, B.date, C.checkin_id IS NOT NULL as is_checked_in
        # from app_user as A
        # left outer join app_checkin as B
        # left join app_checkin_user as C
        # on C.user_id = A.id
        # where B.date = %s and A.default_group_id = %s
        # group by A.username
        # """, [fdate, group.pk])
        # return JsonResponse(CheckinStatusSerializer(cohort, many=True).data, safe=False, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def refresh_lesson(request):
    #id, search by date(future functionality)
    try:
        lesson = Lesson.objects.get(id=request.data["id"])
        new_markdown = get_daily_readme_from_gh(lesson.lesson_file_path)
        # print(new_markdown)
        lesson.markdown = new_markdown
        lesson.save()
        return JsonResponse(LessonSerializer(lesson).data, safe=False)
    except Exception as e:
        print(e)
        return JsonResponse({"error": "error"})
