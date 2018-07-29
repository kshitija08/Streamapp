from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import CustomUser
from rest_framework import viewsets
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework import generics

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
def play(request):
    return render(request , 'Streamapp/play.html' , {})
