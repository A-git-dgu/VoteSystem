from rest_framework import serializers
from .models import User
from .models import Election
from .models import Candidate
from .models import Possiblevoter

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_ssn', 'id','pwd', 'name', 'address', 'phonenumber', 'email')

    user_ssn = serializers.CharField()
    id = serializers.CharField()
    pwd = serializers.CharField()
    name = serializers.CharField()
    address = serializers.CharField()
    phonenumber = serializers.CharField()
    email = serializers.CharField()

class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = ('election_num','election_name','election_type','start_date','end_date','enroll_start','enroll_end','institution','admin_ssn','admin_id','admin_pwd','admin_name','admin_phonenumber','admin_email')
    election_num = serializers.IntegerField()
    election_name = serializers.CharField()
    election_type = serializers.IntegerField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    enroll_start = serializers.DateTimeField()
    enroll_end = serializers.DateTimeField()

    institution = serializers.CharField()
    admin_ssn = serializers.CharField()
    admin_id = serializers.CharField()
    admin_pwd = serializers.CharField()
    admin_name = serializers.CharField()
    admin_phonenumber = serializers.CharField()
    admin_email = serializers.CharField()

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('election_num','candidate_ssn', 'candidate_email', 'introduce_self','election_pledge', 'career', 'approval_state')
    election_num = serializers.IntegerField()
    candidate_ssn = serializers.CharField()
    candidate_email = serializers.CharField()
    introduce_self = serializers.CharField()
    election_pledge = serializers.CharField()
    career = serializers.CharField()
    approval_state = serializers.IntegerField()


class PossiblevoterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Possiblevoter
        fields = ('election_num', 'candidate_ssn', 'candidate_email', 'introduce_self', 'election_pledge', 'career',
                  'approval_state')

    election_num = serializers.IntegerField()
    voter_ssn = serializers.CharField()
    voting_status = serializers.IntegerField()