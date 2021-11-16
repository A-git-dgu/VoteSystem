from django.urls import path, include
from . import views
app_name = 'Vote_app'
urlpatterns = [
    path('', include('rest_framework.urls', namespace='rest_framework_category')),
    path('getUser', views.getUserApi),
    path('getElection', views.getElectionApi),
    path('insertCandidate', views.insertCandidate),

    path('checkAdminLogin', views.checkAdminLogin),
    path('checkVoterLogin', views.checkVoterLogin),

    path('requestSignup', views.requestSignup),
    path('getCandidate', views.getCandidateApi)
]