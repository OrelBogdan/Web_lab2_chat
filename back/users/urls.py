from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    SignInAPIView,
    LogoutAPIView,
    SignUpAPIView,
    UserRetrieveUpdateAPIView,
)

app_name = 'accounts'

urlpatterns = [
    path('signup/', SignUpAPIView.as_view(), name='user_signup'),
    path('signin/', SignInAPIView.as_view(), name='user_signin'),
    path('logout/', LogoutAPIView.as_view(), name="user_logout"),
    path('user/', UserRetrieveUpdateAPIView.as_view(), name='user'),
    path('token/', TokenObtainPairView.as_view(), name='user_token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='user_token_refresh'),
]