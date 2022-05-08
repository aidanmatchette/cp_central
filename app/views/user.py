import datetime
import json
from random import shuffle

from app.models import User, UserLink, Appointment, CheckIn, Activity, ActivityGroup, Cohort
from app.serializers import UserSerializer, UserLinkSerializer, AppointmentSerializer, RosterSerializer, ActivitySerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.viewsets import ModelViewSet
from django.contrib.auth.models import Group
from django.db.models import Count

# TODO Make this a permissions set of superusers/staff and make a separate route /
# modelviewsets for information specific to the logged in user


class UserViewSet(ModelViewSet):  # /api/v1/user/
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=['GET'], detail=False)
    def whoami(self, request, pk=None):  # noqa
        return JsonResponse(UserSerializer(request.user).data, status=200)

    @action(methods=['GET', 'POST'], detail=False)
    def checkin(self, request, pk=None):  # noqa
        fdate = datetime.datetime.now().strftime("%Y-%m-%d")
        checkin = CheckIn.objects.filter(date=fdate).first()
        if not checkin:
            return JsonResponse({'status': 'error: no check set for that date yet'}, status=400)
        if request.method == 'POST':
            checkin.user.add(request.user)
            checkin.save()
            return JsonResponse({'status': 'checked in', 'date': checkin.date}, status=200)
        else:
            # TODO implement
            return JsonResponse({"error": "Not implemented yet"}, status=400)

    @action(methods=['PATCH'], detail=True, permission_classes=[IsAdminUser])  # /api/v1/user/<user_id>/add_to_cohort/
    def add_to_cohort(self, request, pk=None):
        body = json.loads(request.body)
        group = Group.objects.get(pk=body["cohort_id"])
        student = User.objects.get(pk=self.kwargs['pk'])
        group.user_set.add(student)
        student.metadata = None
        student.default_group = group
        student.save()
        serializedStudent = UserSerializer(student).data
        return JsonResponse(data={'student' : serializedStudent}, status=204)


class UserLinkViewSet(ModelViewSet):  # /api/v1/user_link/
    permission_classes = [IsAuthenticated]
    queryset = UserLink.objects.all()
    serializer_class = UserLinkSerializer


class AppointmentViewSet(ModelViewSet):  # /api/v1/appointment/
    permission_classes = [IsAuthenticated]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def roster(request):  # /api/v1/roster/
    # TODO implement, add filtering criteria
    group = request.user.default_group
    output = User.objects.filter(default_group=group)
    return JsonResponse(UserSerializer(output, many=True).data, safe=False, status=200)


@api_view(['POST', 'GET'])
def signup(request):  # /api/signup/
    try:
        # TODO add validation
        user = User()
        user.username = request.data['email']
        user.set_password(request.data['password'])
        user.email = request.data['email']
        user.first_name = request.data['firstName']
        user.last_name = request.data['lastName']
        if 'timeZone' in request.data.keys():
            user.timezone = request.data['timeZone']
        user.metadata = {
            "cohort_requested": request.data['cohort']
        }

        user.save()
        return JsonResponse(UserSerializer(user).data, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error": "error details"}, status=500)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def super_info(request):  # /api/v1/super_info/
    waiting_approval = User.objects.filter(metadata__has_key='cohort_requested')
    json_data = UserSerializer(waiting_approval, many=True).data
    output = {
        'awaiting_approval': json_data
    }
    return JsonResponse(output, status=200)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_random_groups(request):      # api/roster/randomize
    
    '''
    variables
    '''
    size = int(request.data['group_size'])
    name = request.data['name']
    date = request.data['date']
    
    '''
    objects
    '''
    group = Group.objects.get(id=request.user.default_group_id)
    students = User.objects.filter(is_staff=False, groups=group) # gets only students
    activity = Activity.objects.create(name=name, group=group, size=size, date=date)

    '''
    gets previously assigned groups and formats them as a list of lists of student ids 
    [[5, 6], [1, 3], ....]
    '''
    prev_activity_groups = ActivityGroup.objects.annotate(group_size=Count('members')).filter(group_size=size, activity__group=group)
    prev_activity_groups_members = [ag.members.all() for ag in prev_activity_groups]
    prev_ag_student_ids = [[student.id for student in group ] for group in prev_activity_groups_members]
    
    ''' 
    generates list of student ids 
    '''
    student_ids = [student.id for student in students]

    ''' 
    -   best way that I could come up with to try to minimize repeat groups
        the less possible (previously unmatched) groups, the harder it is find those unmatched groups 
    -   the while loop breaks when the groups are completely random, or the groups have been shuffled three times
    -   the for loop iterates over the shuffled groups and checks if
        each newly shuffled group has been previously created for past activities
        -   if the group is the same as a previous activity, it'll increment the "same group counter"
        -   if the group is the same as a previous activity, AND the same group limit has been reached (.5 or half of the current groups)
            the loop_count will be incremented, the groups will be reshuffled, and the process will start over
            
    '''
    completely_random = False
    loop_count = 0
    while not completely_random and loop_count < 4:  
        same_groups_counter = 0
        shuffle(student_ids)
        new_rando_groups = [student_ids[i * size:(i + 1) * size] for i in range((len(student_ids) + size - 1) // size )]
        for group in new_rando_groups:
            group.sort()
            if group in prev_ag_student_ids and same_groups_counter <= (.5 * len(new_rando_groups)):
                same_groups_counter += 1
            elif group in prev_ag_student_ids:
                loop_count += 1
                break
        completely_random = True

    '''creates records for each activity group'''
    for index, new_rando_group in enumerate(new_rando_groups):
        group_num = index + 1
        new_rando_groups[index] = ActivityGroup.objects.create(activity=activity, group_number=group_num)
        new_rando_groups[index].members.set(new_rando_group)

    json_data = ActivitySerializer(activity, many=False).data
    
    return JsonResponse({'activity': json_data}, status=201, safe=False)