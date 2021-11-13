from django.urls import path, include
from . import views
app_name = 'Vote_app'
urlpatterns = [
    path('', include('rest_framework.urls', namespace='rest_framework_category')),
    path('getUser', views.getUserApi)
]