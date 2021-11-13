from django.db import models

# Create your models here.
from django.db import models

# Create your models here.
class Admin(models.Model):
    electionnumber = models.ForeignKey('Election', models.DO_NOTHING, db_column='electionnumber')
    admin_ssn = models.CharField(primary_key=True, max_length=14)
    id = models.CharField(max_length=30)
    pwd = models.CharField(max_length=30)
    name = models.CharField(max_length=10)
    address = models.CharField(max_length=50)
    phonenumber = models.IntegerField(blank=True, null=True)
    email = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'admin'

class Election(models.Model):
    electionnumber = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=30)
    type = models.CharField(max_length=15)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    endroll_start = models.DateTimeField()
    endroll_end = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'election'


class User(models.Model):
    user_ssn = models.CharField(primary_key=True, max_length=14)
    id = models.CharField(max_length=30)
    pwd = models.CharField(max_length=30)
    name = models.CharField(max_length=10)
    address = models.CharField(max_length=50)
    phonenumber = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'