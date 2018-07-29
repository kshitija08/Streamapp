from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
from rest_framework.authtoken.views import obtain_auth_token
urlpatterns = [
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('login/', auth_views.login, {'template_name': 'Streamapp/login.html'}, name='login'),
    path('obtain-auth-token/', obtain_auth_token),
    path('register/' , views.sign_up.as_view() , name='register'),
    path('play/', views.play , name='play'),
]