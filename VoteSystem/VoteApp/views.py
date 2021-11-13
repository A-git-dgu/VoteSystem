from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import UserSerializer
from .serializers import ElectionSerializer
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

@api_view(['GET'])
def getElectionApi(request):
    if request.method=='GET':
        cursor = connection.cursor()
        strSql = "SELECT * FROM election"
        result = cursor.execute(strSql)
        datas = cursor.fetchall()
        connection.commit()
        connection.close()
        elections = []
        for election in datas:
            row = {
                'electionnumber': election[0],
                'name': election[1],
                'type':election[2],
                'start_date': election[3],
                'end_date': election[4],
                'endroll_start': election[5],
                'endroll_end' :election[6]
            }
            elections.append(row)

        sendData=ElectionSerializer(elections, many=True).data
        return Response(sendData, status=200)