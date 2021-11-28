from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Candidate
from .models import User
from .models import Election
from .models import Possiblevoter
from .models import Electionresult
from .models import Candidateresult

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

@api_view(['POST'])
def deleteElection(requset):
    if requset.method == 'POST':
        try:
            e=Election.objects.get(admin_id=requset.data['admin_id'])
            e.delete()
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def insertCandidate(request):
    if request.method=='PUT':
        try:
            e = Election.objects.get(election_num=request.data['election_num'])
            u = User.objects.get(user_ssn=request.data['candidate_ssn'])

            queryset = Candidate.objects.create(
                election_num=e,
                candidate_ssn=u,
                candidate_email=request.data['email'],
                introduce_self=request.data['introduceself'],
                election_pledge=request.data['electionpledge'],
                career=request.data['career'],
                approval_state=0
            )
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

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
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def updatePWD(request):
    if request.method=='PUT':
        try:
            findUser = User.objects.get(id=request.data['id'])
            thisUser = User.objects.filter(id=findUser.id)
            thisUser.update(pwd=request.data['pwd'])
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def updateVoterInfo(request):
    if request.method=='PUT':
        try:
            findUser = User.objects.get(id=request.data['id'])
            thisUser = User.objects.filter(id=findUser.id)
            thisUser.update(name=request.data['name'])
            thisUser.update(phonenumber=request.data['phone'])
            thisUser.update(email=request.data['email'])
            thisUser.update(address=request.data['address'])
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def requestOpenElection(request):
    if request.method == 'PUT':
        try:
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
            return Response({'msg': 'failed'}, status=400)


@api_view(['POST'])
def getCandidate(request):
    if request.method=="POST":
        try:
            candidate = User.objects.get(id=request.data['id'])
            candidateElections = Candidate.objects.filter(candidate_ssn=candidate.user_ssn).values("election_num")

            candidate_elections = []
            for election in candidateElections:
                electionName = Election.objects.get(election_num=election['election_num'])
                row = {
                    'election_num': election['election_num'],
                    'name': electionName.election_name
                }
                candidate_elections.append(row)
            return Response(candidate_elections, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getCandidateContent(request):
    if request.method=="POST":
        try:
            candidate = User.objects.get(id=request.data['id'])
            candidateSsn = Candidate.objects.filter(candidate_ssn=candidate.user_ssn).distinct().values("candidate_ssn")
            candidate_elections = []
            thisCandidate = Candidate.objects.get(candidate_ssn=candidateSsn[0]['candidate_ssn'],
                                                  election_num=request.data['election_num'])
            row = {
                'candidate_ssn': candidateSsn[0]['candidate_ssn'],
                'candidate_email': thisCandidate.candidate_email,
                'name': candidate.name,
                'phonenumber': candidate.phonenumber,
                'address': candidate.address,
                'introduce_self': thisCandidate.introduce_self,
                'election_pledge': thisCandidate.election_pledge,
                'career': thisCandidate.career,
                'approval_state': thisCandidate.approval_state
            }
            candidate_elections.append(row)
            return Response(candidate_elections, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'data error'}, status=400)

@api_view(['PUT'])
def updateCandidateContent(request):
    if request.method=='PUT':
        try:
            cursor = connection.cursor()
            sql = "update Candidate SET introduce_self=%s, career=%s, election_pledge=%s WHERE candidate_ssn=%s and election_num=%s"
            result = cursor.execute(sql, [request.data['introduceself'], request.data['career'], request.data['electionpledge'],
                                          request.data['candidate_ssn'], request.data['election_num']])
            connection.commit()
            connection.close()
            return  Response({'msg': 'success'}, status=200)


        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)


@api_view(['POST'])
def getUserElection(request):
    if request.method=='POST':
        try:
            findSSN = User.objects.get(id=request.data['id'])
            findElection = Possiblevoter.objects.filter(voter_ssn=findSSN.user_ssn).values('election_num')
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
                if electionInfo.election_type==-1 or electionInfo.election_type==2:
                    election_status = "0"
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
            return Response(voter_elections, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getAdminElection(request):
    if request.method=='POST':
        try:
            electionInfo = Election.objects.get(admin_id=request.data['id'])
            row = {
                'election_num': electionInfo.election_num,
                'election_name': electionInfo.election_name,
                'election_type': electionInfo.election_type,
                'institution': electionInfo.institution,
                'admin_name': electionInfo.admin_name,
                'admin_email': electionInfo.admin_email,
                'start_date': electionInfo.start_date.date(),
                'end_date': electionInfo.end_date.date(),
                'enroll_start': electionInfo.enroll_start.date(),
                'enroll_end': electionInfo.enroll_end.date()
            }
            election=row
            return Response(election, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)


@api_view(['POST'])
def getAdminCandidate(request):
    if request.method=='POST':
        try:
            findElection = Election.objects.get(admin_id=request.data['id'])
            findCandidate = Candidate.objects.filter(election_num=findElection.election_num).values('candidate_ssn')
            admin_candidate=[]
            index=0
            for candidate in findCandidate:
                userInfo = User.objects.get(user_ssn=candidate['candidate_ssn'])
                candidateInfo = Candidate.objects.get(election_num=findElection.election_num, candidate_ssn=candidate['candidate_ssn'])
                index+=1
                row = {
                    'candidate_name':userInfo.name,
                    'candidate_id':userInfo.id,
                    'approval_state':candidateInfo.approval_state,
                    'index':index
                }
                admin_candidate.append(row)
            return Response(admin_candidate, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)


@api_view(['GET'])
def getPossibleVoter(request):
    if request.method=='GET':
        try:
            datas = Possiblevoter.objects.filter(election_num=request.GET['election_num'])

            possibleVoters=[]
            for data in datas:
                row = {
                    'voter_ssn': data.voter_ssn
                }
                possibleVoters.append(row)
            return Response(possibleVoters, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def insertPossibleVoter(request):
    if request.method=='PUT':
        try:
            e = Possiblevoter.objects.filter(election_num=request.data['election_num'])
            e.delete()
            e = Election.objects.get(election_num=request.data['election_num'])
            for i in request.data['voter_ssn']:
                queryset = Possiblevoter.objects.create(
                    election_num=e,
                    voter_ssn=i,
                    voting_status=0
                )
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['GET'])
def getElectionInfoForUser(request):
    if request.method=='GET':
        try:
            e = Election.objects.get(election_num=request.GET['election_num'])
            candidateInfo = Candidate.objects.filter(election_num=request.GET['election_num'])
            candidates=[]
            for i in candidateInfo:
                if i.approval_state<1: continue;
                userInfo= i.candidate_ssn
                candidate = {
                    'candidate_name': userInfo.name,
                    'candidate_email': i.candidate_email,
                    'introduce_self': i.introduce_self,
                    'election_pledge': i.election_pledge,
                    'career': i.career,
                    'approval_state':i.approval_state
                }
                candidates.append(candidate)

            if e.election_type=='-1' or e.election_type=='0':
                electionType = 0
            else:
                electionType = 1
            if e.election_type=='0' or e.election_type =='1':
                isBallotCount = 0
            else:
                isBallotCount = 1
            row = {
                'election_name':e.election_name,
                'election_type':electionType,
                'ballotCount':isBallotCount,
                'enroll_start':e.enroll_start.date(),
                'enroll_end':e.enroll_end.date(),
                'start_date':e.start_date.date(),
                'end_date':e.end_date.date(),
                'institution':e.institution,
                'admin_name':e.admin_name,
                'admin_email':e.admin_email,
                'candidates':candidates
            }
            electionInfoForUser = row
            return Response(electionInfoForUser, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getAdminCandidateInfo(request):
    if request.method == 'POST':
        try:
            findUser = User.objects.get(id=request.data['candidate_id'])
            findCandidate = Candidate.objects.get(candidate_ssn=findUser.user_ssn,election_num=request.data['election_num'])
            row = {
                'name': findUser.name,
                'phonenumber': findUser.phonenumber,
                'ssn': findUser.user_ssn,
                'email':findUser.email,
                'introduce':findCandidate.introduce_self,
                'pledge':findCandidate.election_pledge,
                'career':findCandidate.career,
                'approval_state':findCandidate.approval_state
            }
            return Response(row, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def requestApproval(request):
    if request.method=='PUT':
        try:
            findUser = User.objects.get(id=request.data['candidate_id'])
            findCandidate = Candidate.objects.filter(candidate_ssn=findUser.user_ssn,election_num=request.data['election_num'])

            # 후보자 기호 구하기
            candidateNum = Candidate.objects.filter(election_num=request.data['election_num']).values('approval_state')
            count = 1;
            for candidate in candidateNum:
                if candidate['approval_state'] >= 1:
                    count += 1;

            findCandidate.update(approval_state=count)
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def requestReject(request):
    if request.method=='PUT':
        try:
            findUser = User.objects.get(id=request.data['candidate_id'])
            findCandidate = Candidate.objects.filter(candidate_ssn=findUser.user_ssn,election_num=request.data['election_num'])
            findCandidate.update(approval_state=-1)
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getElectionName(request):
    if request.method == 'POST':
        try:
            findElection = Election.objects.get(election_num=request.data['election_num'])
            return Response(findElection.election_name, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getVoteCandidate(request):
    if request.method == 'POST':
        try:
            findCandidates = Candidate.objects.filter(election_num=request.data['election_num']).values('candidate_ssn')
            candidates = []
            index = 0
            for candidate in findCandidates:
                candidateNum = Candidate.objects.get(election_num=request.data['election_num'], candidate_ssn=candidate['candidate_ssn'])
                if candidateNum.approval_state < 1: continue;
                userInfo = User.objects.get(user_ssn=candidate['candidate_ssn'])
                index += 1
                row = {
                    'candidate_id': userInfo.id,
                    'candidate_name': userInfo.name,
                    'approval_state': candidateNum.approval_state
                }
                candidates.append(row)
            candidates = sorted(candidates, key=(lambda x:x['approval_state']),reverse=False)
            return Response(candidates, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getElectionResult(request):
    if request.method=='POST':
        try:
            election = Election.objects.get(election_num=request.data['election_num'])
            possibleVoter = Possiblevoter.objects.filter(election_num=request.data['election_num'])
            countPossibleVoter = possibleVoter.count()
            electionResult = Electionresult.objects.get(election_num=request.data['election_num'])
            candidateResults = Candidateresult.objects.filter(election_num=election)
            candidates_info=[]
            for candidateResult in candidateResults:
                candidate = Candidate.objects.get(candidate_ssn=candidateResult.candidate_ssn, election_num = request.data['election_num'])
                row = {
                    'NumberOfCandidate': candidate.approval_state,
                    'candidate_name': candidate.candidate_ssn.name,
                    'polling_rate': candidateResult.polling_rate
                }
                candidates_info.append(row)
            candidates_info = sorted(candidates_info, key=(lambda x:x['polling_rate']), reverse=True)

            send_data = {
                'winner_name': candidates_info[0]['candidate_name'],
                'winner_polling_rate': candidates_info[0]['polling_rate'],
                'winner_number_of_candidate': candidates_info[0]['NumberOfCandidate'],
                'election_name': election.election_name,
                'countPossibleVoter': countPossibleVoter,
                'voting_rate': electionResult.voting_rate,
                'candidateResults': candidates_info
            }
            return Response(send_data, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def changeVotingStatus(request):
    if request.method=='PUT':
        try:
            findUser = User.objects.get(id=request.data['user_id'])
            findVoter = Possiblevoter.objects.filter(election_num=request.data['election_num'],voter_ssn=findUser.user_ssn)
            findVoter.update(voting_status=1)
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getElectionCandidates(request):
    if request.method == 'POST':
        try:
            findCandidates = Candidate.objects.filter(election_num=request.data['election_num']).values('candidate_ssn')
            candidates_count=0
            candidates=""
            for candidate in findCandidates:
                eachCandidate = Candidate.objects.get(election_num=request.data['election_num'],candidate_ssn=candidate['candidate_ssn'])
                if eachCandidate.approval_state < 1:
                    continue
                findId = User.objects.get(user_ssn=candidate['candidate_ssn'])
                candidates += ";" + findId.id
                candidates_count += 1
            candidates = str(candidates_count) + candidates
            return Response(candidates, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def setCandidateResult(request):
    if request.method=='PUT':
        try:
            findUser = User.objects.get(id=request.data['candidate_id'])
            # polling_rate 계산
            number_voters = Possiblevoter.objects.filter(election_num=request.data['election_num'],voting_status=1)
            # divide by 0

            if len(number_voters)==0 or request.data['number_votes']==0:
                polling_rate = 0;
            else:
                polling_rate = (float(request.data['number_votes'])/float(len(number_voters)))*100;
            # insert
            election = Election.objects.filter(election_num=request.data['election_num'])
            Candidateresult.objects.create(
                election_num=election[0],
                candidate_ssn=findUser.user_ssn,
                polling_rate=polling_rate
            )
            # election_type
            if election[0].election_type==1:
                election.update(election_type=2)
            elif election[0].election_type==0:
                election.update(election_type=-1)
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['PUT'])
def setElectionResult(request):
    if request.method=='PUT':
        try:
            possibleVoters = Possiblevoter.objects.filter(election_num=request.data['election_num'])
            voterCount=0
            for possibleVoter in possibleVoters:
                if possibleVoter.voting_status == 1:
                    voterCount += 1
            election = Election.objects.get(election_num=request.data['election_num'])
            Electionresult.objects.create(
                election_num=election,
                voting_rate=(float(voterCount)/float(len(possibleVoters)))*100
            )
            return Response({'msg': 'success'}, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)

@api_view(['POST'])
def getUserModify(request):
    if request.method == 'POST':
        try:
            findUser = User.objects.get(id=request.data['id'])
            user_data = {
                'id': findUser.id,
                'pwd': findUser.pwd,
                'name': findUser.name,
                'fssn': findUser.user_ssn[:6],
                'lssn': findUser.user_ssn[7:],
                'phonenumber': findUser.phonenumber,
                'email': findUser.email,
                'address': findUser.address
            }
            return Response(user_data, status=200)
        except Exception as e:
            print(e)
            return Response({'msg': 'failed'}, status=400)