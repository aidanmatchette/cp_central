import datetime
from django.db.models import Exists, OuterRef
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.models import User, CheckIn, Lesson
from app.serializers import CheckinStatusSerializer, CheckinSerializer, LessonSerializer, AttendanceSerializer
from app.helpers import get_daily_readme_from_gh


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def instructor_checkin(request):  # /api/v1/instructor/checkin/
    group = request.user.default_group

    if request.method == 'POST':
        date = request.data['date'] if 'date' in request.data.keys() else datetime.datetime.now().strftime("%Y-%m-%d")
        prev = CheckIn.objects.filter(date=date, group=group).first()
        if prev:
            return JsonResponse({"status": "Record not created, already exists for date"}, status=200)
        new_checkin = CheckIn(date=date, group=group)
        new_checkin.save()
        return JsonResponse({"status": "Checkin created"}, status=200)
    else:  # GET
        date = request.GET['date'] if 'date' in request.GET.keys() else datetime.datetime.now().strftime("%Y-%m-%d")
        roster = User.objects.filter(default_group=group)
        roster = roster.annotate(present=Exists(CheckIn.objects.filter(user=OuterRef('pk'), group=group, date=date)))

        return JsonResponse(AttendanceSerializer(roster, many=True).data, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def refresh_lesson(request):
    # id, search by date(future functionality)
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
