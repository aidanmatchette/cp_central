from django.db.models import Q
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from app.models import Lesson, LessonLink, Feedback
from app.serializers import LessonSerializer, LessonLinkSerializer, FeedbackSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search(request):
    search_text = request.GET['keyword']
    lessons = Lesson.objects.filter(markdown__icontains=search_text)
    lesson_links = LessonLink.objects.filter(description__icontains=search_text)
    feedback = Feedback.objects.filter(Q(title__contains=search_text) | Q(description__icontains=search_text))
    results = {
        "lessons": LessonSerializer(lessons, many=True).data,
        "links": LessonLinkSerializer(lesson_links, many=True).data,
        "feedback": FeedbackSerializer(feedback, many=True).data,
    }
    return JsonResponse(results)
