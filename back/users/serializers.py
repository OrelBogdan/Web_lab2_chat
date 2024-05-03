from django.contrib.auth import authenticate
from rest_framework import exceptions, serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import User

from django.core.exceptions import ValidationError
from django.core.validators import validate_email


def email_validation(value):
    error = 'Enter a valid email.'
    
    if not value:
        return False, error
    try:
        validate_email(value)
    except ValidationError:
        return False, error
    
    return True, ''

    
class SignUpSerializer(serializers.ModelSerializer[User]):
    
    password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'surname',
            'patronymic',
            'birth_date',
            'user_gender',
            'email',
            'password',
        ]

    def validate_email(self, value):
        valid, error_text = email_validation(value)

        if not valid:
            raise serializers.ValidationError(error_text)
        try:
            email_name, domain_part = value.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            value = '@'.join([email_name, domain_part.lower()])

        return value

    def create(self, validated_data):
        r""""""
        # TODO: Check birth_date not in future
        user = User.objects.create_user(
            username=validated_data['username'],
            surname=validated_data['surname'],
            patronymic=validated_data['patronymic'],
            user_gender=validated_data['user_gender'],
            email=validated_data['email'],
            password=validated_data['password'],
            birth_date = validated_data['birth_date'],
        )

        # user.birth_date = validated_data.get('birth_date', '')
        # user.gender = validated_data.get('sex', '')
        #user.sex = validated_data.get('sex', '')
        user.is_staff = user.is_superuser = False
        # match user.email:
        #     case "testuser@local.lan":
        #         user.is_superuser = True
        user.save(update_fields=['birth_date', "is_superuser"])

        return user


class SignInSerializer(serializers.ModelSerializer[User]):
    email = serializers.CharField(max_length=255)
    #username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = User.objects.get(email=obj.email)

        return {'refresh': user.tokens['refresh'], 'access': user.tokens['access']}

    class Meta:
        model = User
        fields = [
            'id',
            'email',
            #'username',
            'password',
            'tokens',
        ]

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        if email is None:
            raise serializers.ValidationError('An email address is required to log in.')

        if password is None:
            raise serializers.ValidationError('A password is required to log in.')

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError('A user with this email and password was not found.')

        if not user.is_active:
            raise serializers.ValidationError('This user is not currently activated.')

        return user


class UserSerializer(serializers.ModelSerializer[User]):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = (
            'username',
            'surname',
            'patronymic',
            'birth_date',
            'user_gender',
            'email',
            'password',
            'tokens',
        )
        read_only_fields = ('tokens',)

    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance

    
class LogOutSerializer(serializers.Serializer[User]):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token) # .blacklist()
        except TokenError as ex:
            raise exceptions.AuthenticationFailed(ex)
