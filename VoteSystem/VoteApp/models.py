from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class Candidate(models.Model):
    election_num = models.OneToOneField('Election', models.DO_NOTHING, db_column='election_num', primary_key=True)
    candidate_ssn = models.ForeignKey('User', models.DO_NOTHING, db_column='candidate_ssn')
    candidate_email = models.CharField(max_length=50)
    introduce_self = models.CharField(max_length=500)
    election_pledge = models.CharField(max_length=1000)
    career = models.CharField(max_length=1000)
    approval_state = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'candidate'
        unique_together = (('election_num', 'candidate_ssn'),)


class Candidateresult(models.Model):
    election_num = models.OneToOneField('Election', models.DO_NOTHING, db_column='election_num', primary_key=True)
    candidate_ssn = models.CharField(max_length=15)
    polling_rate = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'candidateresult'
        unique_together = (('election_num', 'candidate_ssn'),)


class Election(models.Model):
    election_num = models.AutoField(primary_key=True)
    election_name = models.CharField(max_length=50)
    election_type = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    enroll_start = models.DateTimeField()
    enroll_end = models.DateTimeField()
    institution = models.CharField(max_length=30)
    admin_ssn = models.CharField(max_length=15)
    admin_id = models.CharField(unique=True, max_length=30)
    admin_pwd = models.CharField(max_length=30)
    admin_name = models.CharField(max_length=10)
    admin_phonenumber = models.CharField(max_length=15)
    admin_email = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'election'


class Electionresult(models.Model):
    election_num = models.OneToOneField(Election, models.DO_NOTHING, db_column='election_num', primary_key=True)
    voting_rate = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'electionresult'


class Possiblevoter(models.Model):
    election_num = models.OneToOneField(Election, models.DO_NOTHING, db_column='election_num', primary_key=True)
    voter_ssn = models.CharField(max_length=15)
    voting_status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'possiblevoter'
        unique_together = (('election_num', 'voter_ssn'),)


class User(models.Model):
    user_ssn = models.CharField(primary_key=True, max_length=15)
    id = models.CharField(max_length=30)
    pwd = models.CharField(max_length=30)
    name = models.CharField(max_length=10)
    address = models.CharField(max_length=100)
    phonenumber = models.CharField(max_length=15)
    email = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'user'