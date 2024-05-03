import uuid
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from rest_framework_simplejwt.tokens import RefreshToken

class UserManager(BaseUserManager):
    def create_user(self, username, email, password, birth_date,surname, patronymic, user_gender):
        if username is None:
            raise TypeError("NO username.")
        if email is None:
            raise TypeError("NO email.")
        if password is None:
            raise TypeError("NO password.")


        user = self.model(username=username, email=self.normalize_email(email), birth_date=birth_date,surname=surname, patronymic = patronymic, user_gender = user_gender)
        user.is_superuser = True
        user.is_active = True
        user.is_staff = True
        user.set_password(password)
        user.save()

        return user

class User(AbstractBaseUser, PermissionsMixin):


    # id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True, null=False)
    surname = models.CharField(max_length=255, unique=False, null=True)
    patronymic = models.CharField(max_length=255, unique=False, null=True)
    email = models.EmailField(db_index=True, unique=True, null=False)
    user_gender = models.CharField(max_length=255,unique=False,null=True)
    birth_date = models.DateField(null=True)
    password = models.CharField(max_length=255, null=False)
    is_staff = models.BooleanField(default=False, null=False)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "email"
    # REQUIRED_FIELDS = ["username", "password"]
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def __str__(self):
        string = self.email if self.email != "" else self.username
        return f"{self.id} {string}"

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


    def get_username(self):
        return self.email

