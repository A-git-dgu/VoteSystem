from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Candidateinfo
from .models import User
from .models import Election
from .models import Admin

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
                'user_ssn':user[0][:6],
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

@api_view(['PUT'])
def insertCandidate(request):
    if request.method=='PUT':
        try:
            print(request.data)
            u = User.objects.get(user_ssn=request.data['candidate_ssn'])
            e = Election.objects.get(electionnumber=request.data['election_id'])
            queryset = Candidateinfo.objects.create(
                candidate_id=None,
                election=e,
                candidate_ssn=u,
                email=request.data['email'],
                introduceself=request.data['introduceself'],
                electionpledge=request.data['electionpledge'],
                carrer=request.data['carrer'],
                approvalstate=0
            )
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=204)

@api_view(['POST'])
def checkAdminLogin(request):
    if request.method=='POST':
        try:
            try:
                findID = Admin.objects.get(id=request.data['id'])
                print(findID.pwd)
                if findID.pwd == request.data['pwd']:
                    return Response({'msg':'Login Success'})
                else:
                    return Response({'msg':'PWD not equal'})
            except Exception as e:
                return Response({'msg': 'not found ID'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=204)

@api_view(['POST'])
def checkVoterLogin(request):
    if request.method=='POST':
        try:
            try:
                findID = User.objects.get(id=request.data['id'])
                if findID.pwd == request.data['pwd']:
                    return Response({'msg':'Login Success'})
                else:
                    return Response({'msg':'PWD not equal'})
            except Exception as e:
                return Response({'msg': 'not found ID'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=204)