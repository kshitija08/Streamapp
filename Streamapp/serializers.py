from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password as vp
from .models import CustomUser
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=False,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )
    username = serializers.CharField(required =True ,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )
    password = serializers.CharField(required=True , write_only = True)
    first_name = serializers.CharField(max_length = 30 , required = True)
    last_name = serializers.CharField(max_length=150 , required = True)
    def validate_password(self, value):
    	if(vp(value) != None):
    		raise serializers.ValidationError(vp(value))
    	return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

    class Meta:
        model = CustomUser
        fields = ( 'username', 'email', 'password' , 'first_name', 'last_name')