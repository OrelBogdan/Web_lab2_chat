"""
URL configuration for calculator project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from urls import views as UrlsViews
from rest_framework.routers import DefaultRouter
from django.urls import include, path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
# from . import views

schema_view = get_schema_view(
   openapi.Info(
      title="Programmer Calculator API",
      default_version='v1',
      description="Simple API schema",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
# router.register(r'items', ItemViewSet)
# router.register(r'urls', UrlsViews.UrlViewSet, basename="urls")

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/', include(router.urls)),
#     # path('', views.index, name='index'),
#     # path('about/', views.about, name='about'),
#     # path('aboutme/', views.aboutme, name='aboutme'),
#     # path('calculator/', views.calculator, name='calculator'),
#     # path('register/', views.register, name='register'),
#     # path('signin/', views.signin, name='signin'),
# ]
# urlpatterns = [
#    path('', include(router.urls)),
#    path('users/', include('users.urls')),
#    path('api/', include('users.urls')),
#    path('admin/', admin.site.urls),
#    path('chat/', include('chat.urls')),
#    path('ws/chat/', include('chat.urls')),
#    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
#    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
#    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
# ]

urlpatterns = [
   path('', include(router.urls)),
   path('users/', include('users.urls')),
   # path('api/urls/<str:user_id>/', UrlsViews.UserUrlsView.as_view()),
   path('admin/', admin.site.urls),
   path('api/', include('users.urls', namespace='users')),
   path('chat/', include('chat.urls')),
   path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]