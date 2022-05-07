from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from app.models import Feedback, Vote, User
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

    @action(methods=['GET'], detail=False)
    def retro(self, request, pk=None):
        group = request.user.default_group
        users = User.objects.filter(default_group=group)
        feedbacks = Feedback.objects.filter(user__in=users)
        return JsonResponse(FeedbackSerializer(feedbacks, many=True).data, safe=False)

    @action(methods=['POST'], detail=True)
    def vote(self, request, pk=None):
        feedback = Feedback.objects.get(pk=pk)
        vote, is_new = Vote.objects.get_or_create(user=request.user, feedback=feedback)
        if not is_new:
            # "un-check" their vote if it is the same
            if vote.is_agreed == request.data['is_agreed']:
                vote.delete()
                return JsonResponse(FeedbackSerializer(feedback).data)

        vote.is_agreed = request.data['is_agreed']
        vote.save()
        return JsonResponse(FeedbackSerializer(feedback).data)


class VoteViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
