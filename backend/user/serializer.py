from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class registrationUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'role', 'is_active']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # If instance exists, it's an update — make password optional
        if self.instance:
            self.fields['password'].required = False
            self.fields['password'].allow_null = True
            self.fields['password'].allow_blank = True

    def validate_email(self, value):
        user_id = getattr(self.instance, 'id', None)
        if not user_id and CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError('A user with this email already exists')
        if user_id and CustomUser.objects.filter(email=value).exclude(id=user_id).exists():
            raise serializers.ValidationError('A user with this email already exists')
        return value

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance



class RegistrationAdminSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['first_name', 'email', 'password', 'role']
        read_only_fields = ['role']

    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError('User already exists')
        return value

    def create(self, validated_data):
        validated_data['role'] = 'admin'  # Force role to 'admin'
        user = CustomUser.objects.create_user(**validated_data)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(
                request=self.context.get('request'),
                email=email,
                password=password
            )
            if not user:
                raise serializers.ValidationError('Invalid email or password')
        else:
            raise serializers.ValidationError('Must include "email" and "password"')

        self.user = user

        refresh = RefreshToken.for_user(user)
        access = refresh.access_token

        return {
            'refresh': str(refresh),
            'access': str(access),
            'user': {
                'id': user.id,
                'first_name': user.first_name,
                'email': user.email,
                'role': user.role,
            }
        }
