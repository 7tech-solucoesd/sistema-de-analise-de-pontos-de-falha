# -- coding: utf-8 --
from django.db import models

# Create your models here.


class Juncao(models.Model):
    vsatname = models.CharField(max_length=8)
    nmd = models.CharField(max_length=200)
    ender = models.CharField(max_length=200)
    municipio = models.CharField(max_length=200)
    UF = models.CharField(max_length=200)
    junserviço = models.CharField(max_length=200)
    compart = models.CharField(max_length=200)
    desc = models.CharField(max_length=200)
    nomeserv = models.CharField(max_length=200)
    fone = models.CharField(max_length=200)
    primeid = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    serial = models.CharField(max_length=200)
    softprof = models.CharField(max_length=200)
    devicetype = models.CharField(max_length=200)
    ipmgmt = models.CharField(max_length=200)
    iplan1 = models.CharField(max_length=200)
    mask = models.CharField(max_length=200)
    servplan = models.CharField(max_length=200)
    AIS = models.CharField(max_length=200)
    OutrouteGroup = models.CharField(max_length=200)
    FAP = models.CharField(max_length=200)
    IPGW = models.CharField(max_length=200)
    Ipipgw = models.CharField(max_length=200)
    IQoS = models.CharField(max_length=200)
    IQoSnum = models.CharField(max_length=200)
    Enable = models.CharField(max_length=200)
    vadb = models.CharField(max_length=200)
    vadb1 = models.CharField(max_length=200)
    vadb2 = models.CharField(max_length=200)
    Enable = models.CharField(max_length=200)
    DDR = models.CharField(max_length=200)
