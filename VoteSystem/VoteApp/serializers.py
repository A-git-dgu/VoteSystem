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