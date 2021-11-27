from django.urls import path, include
from . import views
app_name = 'Vote_app'
urlpatterns = [
    path('', include('rest_framework.urls', namespace='rest_framework_category')),
    path('getUser', views.getUser),
    path('getElection', views.getElection),
    path('insertCandidate', views.insertCandidate),

    path('checkAdminLogin', views.checkAdminLogin),
    path('checkVoterLogin', views.checkVoterLogin),

    path('requestSignup', views.requestSignup),
    path('requestOpenElection', views.requestOpenElection),
    path('getCandidate', views.getCandidate),
    path('getCandidateContent', views.getCandidateContent),
    path('updateCandidateContent', views.updateCandidateContent),

    path('getUserElection', views.getUserElection),
    path('getAdminElection', views.getAdminElection),
    path('deleteElection', views.deleteElection),
    path('getAdminCandidate', views.getAdminCandidate),
    path('getPossibleVoter', views.getPossibleVoter),
    path('insertPossibleVoter', views.insertPossibleVoter),

    path('getElectionInfoForUser', views.getElectionInfoForUser),
    # path('getCandidateInfoForUser', views.getCandidateInfoForUser)

    path('getAdminCandidateInfo', views.getAdminCandidateInfo),
    path('requestReject', views.requestReject),
    path('requestApproval', views.requestApproval),

    path('getElectionName', views.getElectionName),
    path('getVoteCandidate', views.getVoteCandidate),

    path('getElectionResult', views.getElectionResult),
    path('getForCalculateResult', views.getForCalculateResult),

    path('changeVotingStatus', views.changeVotingStatus),
    path('getElectionCandidates', views.getElectionCandidates)
]