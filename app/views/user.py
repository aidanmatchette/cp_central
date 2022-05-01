from app.models import User, UserLink, Appointment, CheckIn
from app.serializers import UserSerializer, UserLinkSerializer, AppointmentSerializer, RosterSerializer, CheckInSerializer
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


class UserLinkViewSet(ModelViewSet):  # /api/v1/user_link/
    permission_classes = [IsAuthenticated]
    queryset = UserLink.objects.all()
    serializer_class = UserLinkSerializer


class AppointmentViewSet(ModelViewSet):  # /api/v1/appointment/
    permission_classes = [IsAuthenticated]
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class CheckInViewSet(ModelViewSet):  # /api/v1/checkin/
    permission_classes = [IsAuthenticated]
    queryset = CheckIn.objects.all()
    serializer_class = CheckInSerializer


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
        print(request.data['cohort'])
        # TODO group assignment
        user.save()
        return JsonResponse(UserSerializer(user).data, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error": "error details"}, status=500)
