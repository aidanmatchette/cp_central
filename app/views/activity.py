import datetime

from django.http import JsonResponse
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from app.helpers import random_generator
from app.models import Activity, ActivityGroup
from django.db.models import Q
from app.serializers import ActivitySerializer, ActivityGroupSerializer


class ActivityViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

    def get_queryset(self):
        q_group = Q(group=self.request.user.default_group)
        date = self.request.GET["date"] if 'date' in self.request.GET else datetime.datetime.now().strftime("%Y-%m-%d")
        q_date = Q(date__isnull=True) | Q(date=date)
        return Activity.objects.filter(q_group & q_date)

    @action(methods=['POST'], detail=False)
    def random_group(self, request, pk=None):  # noqa
        date = request.data['date'] if 'date' in request.data else None
        group_size = int(request.data['group_size']) if 'group_size' in request.data else 2
        final_groups = random_generator(request, date, group_size)
        activity = Activity(
            group=request.user.default_group,
            name=request.data['name'],
            size=group_size,
            date=date if date != '' else None
        )
        activity.save()

        for group in final_groups:
            activity_group = ActivityGroup(activity=activity)
            activity_group.save()
            for person in group:
                activity_group.members.add(person)

        return JsonResponse(ActivitySerializer(activity).data)


class ActivityGroupViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ActivityGroup.objects.all()
    serializer_class = ActivityGroupSerializer

    @action(methods=['GET'], detail=False)
    def my_groups(self, request, pk=None):  # noqa
        date = request.GET['date'] if 'date' in request.GET else datetime.datetime.now().strftime("%Y-%m-%d")
        include_null_date = request.GET['include_null_date'] if 'include_null_date' in request.GET else False
        q_date = Q(activity__date=date)
        if include_null_date:
            q_date |= Q(activity__date__isnull=True)
        activities = ActivityGroup.objects.filter(Q(members__in=[request.user]) & q_date)
        return JsonResponse(ActivityGroupSerializer(activities, many=True).data, safe=False)
