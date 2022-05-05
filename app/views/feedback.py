from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from app.models import Feedback, Vote
from app.serializers import FeedbackSerializer, VoteSerializer


class FeedbackViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    
    def create(self, request, *args, **kwargs):
        feedback = Feedback(
            user=request.user, 
            title=request.data["title"], 
            description=request.data["description"], 
            topic=request.data["topic"], 
            category=request.data["category"],
        )
        feedback.save()

        return JsonResponse(FeedbackSerializer(feedback).data)

class VoteViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
