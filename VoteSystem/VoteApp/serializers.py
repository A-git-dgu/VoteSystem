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
