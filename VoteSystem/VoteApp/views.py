from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.decorators import api_view

from .models import User
from .models import Election
from .models import Admin

from .serializers import UserSerializer
from django.db import connection

@api_view(['GET'])
def getUserApi(request):
    if request.method=='GET':

        cursor = connection.cursor()

        strSql = "SELECT * FROM user"
        result = cursor.execute(strSql)
        datas = cursor.fetchall()

        connection.commit()
        connection.close()

        users = []
        for user in datas:
            row = {
                'user_ssn':user[0],
                'id':user[1],
                'pwd':user[2],
                'name':user[3],
                'address':user[4],
                'phonenumber':user[5]
            }
            users.append(row)

        sendData=UserSerializer(users, many=True).data
        return Response(sendData, status=200)
