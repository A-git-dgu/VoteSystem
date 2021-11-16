from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Candidate
from .models import User
from .models import Election
from .models import Possiblevoter

from .serializers import UserSerializer
from .serializers import ElectionSerializer
from .serializers import PossiblevoterSerializer
from .serializers import CandidateSerializer
from django.db import connection

@api_view(['GET'])
def getUser(request):
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
                'phonenumber':user[5],
                'email':user[6]
            }
            users.append(row)

        sendData=UserSerializer(users, many=True).data
        return Response(sendData, status=200)

@api_view(['GET'])
def getElection(request):
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
                'election_num':election[0],
                'election_name':election[1],
                'election_type':election[2],
                'start_date':election[3],
                'end_date':election[4],
                'enroll_start':election[5],
                'enroll_end':election[6],
                'institution':election[7],
                'admin_ssn':election[8],
                'admin_id':election[9],
                'admin_pwd':election[10],
                'admin_name':election[11],
                'admin_phonenumber':election[12],
                'admin_email':election[13]
            }
            elections.append(row)

        sendData=ElectionSerializer(elections, many=True).data
        return Response(sendData, status=200)

@api_view(['PUT'])
def insertCandidate(request):
    if request.method=='PUT':
        try:
            print(request.data)
            e = Election.objects.get(election_num=request.data['election_num'])
            u = User.objects.get(user_ssn=request.data['candidate_ssn'])
            print(e)
            print(u)
            queryset = Candidate.objects.create(
                election_num=e,
                candidate_ssn=u,
                candidate_email=request.data['email'],
                introduce_self=request.data['introduceself'],
                election_pledge=request.data['electionpledge'],
                career=request.data['carrer'],
                approval_state=0
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
                findID = Election.objects.get(admin_id=request.data['id'])
                if findID.admin_pwd == request.data['pwd']:
                    return Response({'msg':'Login Success'})
                else:
                    return Response({'msg':'PWD not equal'})
            except Exception as e:
                print(e)
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

@api_view(['PUT'])
def requestSignup(request):
    if request.method=='PUT':
        try:
            print(request.data)
            queryset = User.objects.create(
                user_ssn=request.data['user_ssn'],
                id=request.data['id'],
                pwd=request.data['pwd'],
                name=request.data['name'],
                address=request.data['address'],
                phonenumber=request.data['phonenumber'],
                email=request.data['email']
            )
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=204)

@api_view(['POST'])
def getCandidate(request):
    if request.method=="POST":
        try:
            cursor = connection.cursor()
            strSql = "SELECT distinct candidate.election_num, election_name FROM candidate, election where candidate_ssn=%s"
            result = cursor.execute(strSql, [request.data['candidate_ssn']])
            datas = cursor.fetchall()
            connection.commit()
            connection.close()
            candidate_elections = []
            for election in datas:
                row = {
                    'election_num': election[0],
                    'name': election[1]
                }
                candidate_elections.append(row)
            return Response(candidate_elections, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=204)

@api_view(['POST'])
def getCandidateContent(request):
    if request.method=="POST":
        try:
            cursor = connection.cursor()
            strSql = "select c.candidate_ssn, c.candidate_email, u.name, u.phonenumber, u.address, c.introduce_self," \
                     "c.election_pledge, c.career, c.approval_state from  candidate c, election e, user u " \
                     "where c.election_num=e.election_num and u.user_ssn=c.candidate_ssn and candidate_ssn=%s and c.election_num=%s;"
            result = cursor.execute(strSql, [request.data['candidate_ssn'], request.data['election_num']])
            datas = cursor.fetchall()
            connection.commit()
            connection.close()
            for data in datas:
                row={
                    'candidate_ssn':data[0],
                    'candidate_email':data[1],
                    'name':data[2],
                    'phonenumber': data[3],
                    'address':data[4],
                    'introduce_self':data[5],
                    'election_pledge':data[6],
                    'career':data[7],
                    'approval_state':data[8]
                }

        except Exception as e:
            print(e)
            return Response({'msg': 'data error'}, status=400)
        return Response(row, status=200)