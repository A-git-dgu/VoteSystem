from rest_framework import serializers
from .models import User
from .models import Election
from .models import Admin

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_ssn', 'id','pwd', 'name', 'name', 'address', 'phonenumber')

    user_ssn = serializers.CharField()
    id = serializers.CharField()
    pwd = serializers.CharField()
    name = serializers.CharField()
    address = serializers.CharField()
    phonenumber = serializers.IntegerField()

class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = ('electionnumber', 'name','type', 'start_date', 'end_date', 'endroll_start', 'endroll_end')
    electionnumber = serializers.IntegerField()
    name = serializers.CharField()
    type = serializers.CharField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    endroll_start = serializers.DateTimeField()
    endroll_end = serializers.DateTimeField()

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = ('candidate_id', 'election_id','candidate_ssn', 'email', 'introduceself','electionpledge', 'carrer', 'approvalstate')
    candidate_id = serializers.IntegerField()
    election = serializers.IntegerField()  # Field name made lowercase.
    candidate_ssn = serializers.CharField()
    email = serializers.CharField()
    introduceself = serializers.CharField()
    electionpledge = serializers.CharField()
    carrer = serializers.CharField()
    approvalstate = serializers.CharField()