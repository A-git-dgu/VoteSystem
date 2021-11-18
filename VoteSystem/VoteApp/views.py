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

from datetime import datetime

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

# Login
@api_view(['POST'])
def checkAdminLogin(request):
    if request.method=='POST':
        try:
            try:
                findID = Election.objects.get(admin_id=request.data['id'])
                if findID.admin_pwd == request.data['pwd']:
                    return Response({'msg':'Login Success'}, status=200)
                else:
                    return Response({'msg':'PWD not equal'}, status=204)
            except Exception as e:
                print(e)
                return Response({'msg': 'not found ID'}, status=204)
        except Exception as e:
            print(e)
            return Response({'msg': 'Login failed'}, status=400)

@api_view(['POST'])
def checkVoterLogin(request):
    if request.method=='POST':
        try:
            try:
                findID = User.objects.get(id=request.data['id'])
                if findID.pwd == request.data['pwd']:
                    return Response({'msg':'Login Success'}, status=200)
                else:
                    return Response({'msg':'PWD not equal'}, status=204)
            except Exception as e:
                return Response({'msg': 'not found ID'}, status=204)
        except Exception as e:
            print(e)
            return Response({'msg': 'Login failed'}, status=400)

# 선거개설 및 회원가입
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

@api_view(['PUT'])
def requestOpenElection(request):
    if request.method == 'PUT':
        try:
            print(request.data)
            print(request.data['election_type'])
            print(request.data['start_date'])
            print("transfer")
            print(datetime.strptime(request.data['start_date'], "%m/%d/%Y"))
            print("==")
            queryset = Election.objects.create(
                election_name=request.data['election_name'],
                election_type=request.data['election_type'],
                start_date=datetime.strptime(request.data['start_date'], "%m/%d/%Y"),
                end_date=datetime.strptime(request.data['end_date'], "%m/%d/%Y"),
                enroll_start=datetime.strptime(request.data['enroll_start'], "%m/%d/%Y"),
                enroll_end=datetime.strptime(request.data['enroll_end'], "%m/%d/%Y"),

                institution=request.data['institution'],
                admin_ssn=request.data['admin_ssn'],
                admin_id=request.data['admin_id'],
                admin_pwd=request.data['admin_pwd'],
                admin_name=request.data['admin_name'],
                admin_phonenumber=request.data['admin_phonenumber'],
                admin_email=request.data['admin_email']
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
def getUserElection(request):
    if request.method=='POST':
        try:
            print("id = ")
            print(request.data)
            findSSN = User.objects.get(id=request.data['id'])
            print(findSSN.user_ssn)
            findElection = Possiblevoter.objects.filter(voter_ssn=findSSN.user_ssn).values('election_num')
            print(findElection)
            voter_elections=[]
            index=0
            for electionNum in findElection:
                electionInfo = Election.objects.get(election_num=electionNum["election_num"])
                voterElection = Possiblevoter.objects.get(voter_ssn=findSSN.user_ssn,election_num=electionNum["election_num"])

                # 선거 종료 여부 판단
                now = datetime.now()
                election_status = "0"
                if now.date() <= electionInfo.end_date.date():
                    election_status = "1"
                index+=1
                row = {
                    'election_num':electionInfo.election_num,
                    'election_name':electionInfo.election_name,
                    'start_date':electionInfo.start_date.date(),
                    'end_date':electionInfo.end_date.date(),
                    'election_status':election_status,
                    'voting_status':voterElection.voting_status,
                    'index':index
                }
                voter_elections.append(row)
            print(voter_elections)
            return Response(voter_elections, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=204)