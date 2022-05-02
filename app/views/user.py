from app.models import User, UserLink, Appointment
from app.serializers import UserSerializer, UserLinkSerializer, AppointmentSerializer, RosterSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

# TODO Make this a permissions set of superusers/staff and make a separate route /
# modelviewsets for information specific to the logged in user


class UserViewSet(ModelViewSet):  # /api/v1/user/
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(methods=['GET'], detail=False)
    def whoami(self, request, pk=None):  # noqa
        return JsonResponse(UserSerializer(request.user).data, status=200)

    @action(methods=['GET', 'POST'], detail=True)
    def checkin(self, request, pk=None):  # noqa
        if request.method == 'POST':
            pass
        else:
            pass
        return JsonResponse(UserSerializer(request.user).data, status=200)


class UserLinkViewSet(ModelViewSet):  # /api/v1/user_link/
    permission_classes = [IsAuthenticated]
    queryset = UserLink.objects.all()
    serializer_class = UserLinkSerializer


class AppointmentViewSet(ModelViewSet):  # /api/v1/appointment/
    permission_classes = [IsAuthenticated]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def roster(request):  # /api/v1/roster/
    # TODO implement, add filtering criteria
    output = User.objects.all()
    return JsonResponse(RosterSerializer(output).data, status=200)


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
