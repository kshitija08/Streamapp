from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
urlpatterns = [
    path('signup/', views.SignUp.as_view(), name='signup'),
    path('login/', auth_views.login, {'template_name': 'Streamapp/login.html'}, name='login'),
]