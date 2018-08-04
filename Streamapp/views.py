from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer , tokenSerializer ,UserInfoSerializer
from .models import CustomUser
from rest_framework import viewsets ,permissions ,generics, status
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view ,authentication_classes ,permission_classes
from rest_framework.authentication import TokenAuthentication

from .forms import CustomUserCreationForm
class SignUp(generic.CreateView):
    form_class = CustomUserCreationForm
    success_url = reverse_lazy('login')
    template_name = 'Streamapp/signup.html'
class sign_up(generics.CreateAPIView):
	queryset = CustomUser.objects.all()
	serializer_class = 	UserSerializer
	def perform_create(self, serializer):
		serializer.save()
class UserInfo(generics.RetrieveAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = CustomUser.objects.all()
    serializer_class = 	UserInfoSerializer
    def perform_create(self, serializer):
        serializer.save()
def play(request):
    return render(request , 'Streamapp/play.html' , {})
@api_view(['POST'])
@authentication_classes((TokenAuthentication,))
@permission_classes((IsAuthenticated,))
def tokenUser(request):
    try:
        data1 = request.data
        token = Token.objects.get(key = data1['key'])
    except Token.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        ser = (tokenSerializer(token))
        return Response(ser.data)