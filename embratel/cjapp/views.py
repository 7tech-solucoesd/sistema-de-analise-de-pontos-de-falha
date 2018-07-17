# -- coding: utf-8 --
import json
from django.http import HttpResponse
from ijapp.models import Juncao
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


def index (request):
    return render(request, 'index.html')
    #template = loader.get_template('index.html')
    #return HttpResponse(template.render())


def get_juncao(request, juncao):
    print(juncao)
    print(juncao.zfill(4))
    j = Juncao.objects.filter(
        junserviço__contains='{}'.format(juncao.zfill(4))).first()
    if(j is not None and len(j.junserviço) > 4):
        j = None
    if j is None:
        return HttpResponse(json.dumps({
            'error': 'Nao pertence a Primisys'
        }))
    d = {
        'vsatname': j.vsatname,
        'nmd': j.nmd,
        'ender': j.ender,
        'municipio': j.municipio,
        'UF': j.UF,
        'junserviço': j.junserviço,
        'compart': j.compart,
        'desc': j.desc,
        'nomeserv': j.nomeserv,
        'fone': j.fone,
        'primeid': j.primeid,
        'category': j.category,
        'serial': j.serial,
        'softprof': j.softprof,
        'devicetype': j.devicetype,
        'ipmgmt': j.ipmgmt,
        'iplan1': j.iplan1,
        'mask': j.mask,
        'servplan': j.servplan,
        'AIS': j.AIS,
        'OutrouteGroup': j.OutrouteGroup,
        'FAP': j.FAP,
        'IPGW': j.IPGW,
        'Ipipgw': j.Ipipgw,
        'IQoS': j.IQoS,
        'IQoSnum': j.IQoSnum,
        'Enable': j.Enable,
        'vadb': j.vadb,
        'vadb1': j.vadb1,
        'vadb2': j.vadb2,
        'Enable': j.Enable,
        'DDR': j.DDR,
    }
    return HttpResponse(json.dumps(d))

def get_juncaobdn(request, juncaobdn):
    tamanho = len(juncaobdn)
    print(len(juncaobdn))
    
    juncaobdn = "30/" + (juncaobdn.zfill(5 - tamanho))
    print(juncaobdn)
    j = Juncao.objects.filter(
        junserviço__contains='{}'.format(juncaobdn)).first()
    
    if j is None:
        return HttpResponse(json.dumps({
            'error': 'Nao pertence a Primisys'
        }))
    d = {
        'vsatname': j.vsatname,
        'nmd': j.nmd,
        'ender': j.ender,
        'municipio': j.municipio,
        'UF': j.UF,
        'junserviço': j.junserviço,
        'compart': j.compart,
        'desc': j.desc,
        'nomeserv': j.nomeserv,
        'fone': j.fone,
        'primeid': j.primeid,
        'category': j.category,
        'serial': j.serial,
        'softprof': j.softprof,
        'devicetype': j.devicetype,
        'ipmgmt': j.ipmgmt,
        'iplan1': j.iplan1,
        'mask': j.mask,
        'servplan': j.servplan,
        'AIS': j.AIS,
        'OutrouteGroup': j.OutrouteGroup,
        'FAP': j.FAP,
        'IPGW': j.IPGW,
        'Ipipgw': j.Ipipgw,
        'IQoS': j.IQoS,
        'IQoSnum': j.IQoSnum,
        'Enable': j.Enable,
        'vadb': j.vadb,
        'vadb1': j.vadb1,
        'vadb2': j.vadb2,
        'Enable': j.Enable,
        'DDR': j.DDR,
    }
    return HttpResponse(json.dumps(d))


@csrf_exempt
def get_pontos_uf(request):

    def f(juncoes):
        dist = {}
        for j in juncoes:
            if j.UF in dist.keys():
                dist[j.UF] += 1
            else:
                dist[j.UF] = 1
        return dist

    return filtra_juncao(request, f)


@csrf_exempt
def get_pontos_ipgw(request):

    def f(juncoes):
        dist = {}
        for j in juncoes:
            if j.IPGW in dist.keys():
                dist[j.IPGW] += 1
            else:
                dist[j.IPGW] = 1
        return dist

    return filtra_juncao(request, f)


@csrf_exempt
def get_pontos_category(request):

    def f(juncoes):
        dist = {}
        for j in juncoes:
            if j.category in dist.keys():
                dist[j.category] += 1
            else:
                dist[j.category] = 1
        return dist

    return filtra_juncao(request, f)

@csrf_exempt
def get_juncao_dncc(request):

    def f(juncoes):
        dist = {}
        for j in juncoes:
            if j.IQoS in dist.keys():
                dist[j.IQoS] += 1
            else:
                dist[j.IQoS] = 1
        return dist

    return filtra_juncao(request, f)

@csrf_exempt
def get_juncao_hub(request):

    def f(juncoes):
        dist = {}
        for j in juncoes:
            if j.OutrouteGroup in dist.keys():
                dist[j.OutrouteGroup] += 1
            else:
                dist[j.OutrouteGroup] = 1
        return dist

    return filtra_juncao(request, f)


def filtra_juncao(request, funcao):
    # print(request,end=" ---------------------")
    if request.method == 'POST':
        n_juncoes = json.loads(request.body.decode('utf-8'))
        juncoes = []
        for j in n_juncoes:
            jun = Juncao.objects.filter(junserviço__contains='{}'.format(
                str(j).zfill(4))).first()
            if(jun is not None and len(jun.junserviço) > 4):
                jun.junserviço = None
            if jun is not None:
                juncoes.append(jun)

        dist = funcao(juncoes)

        d = {
            'total': len(juncoes),
            'dados': dist
        }
    return HttpResponse(json.dumps(d))

#parte dos bdns

@csrf_exempt
def get_juncaobdn_dncc(request):

    def f(bdns):
        dist = {}
        for j in bdns:
            if j.IQoS in dist.keys():
                dist[j.IQoS] += 1
            else:
                dist[j.IQoS] = 1
        return dist

    return filtra_bdn(request, f)


@csrf_exempt
def get_juncaobdn_hub(request):

    def f(bdns):
        dist = {}
        for j in bdns:
            if j.OutrouteGroup in dist.keys():
                dist[j.OutrouteGroup] += 1
            else:
                dist[j.OutrouteGroup] = 1
        return dist

    return filtra_bdn(request, f)

@csrf_exempt
def get_juncaobdn_uf(request):

    def f(bdns):
        dist = {}
        for j in bdns:
            if j.UF in dist.keys():
                dist[j.UF] += 1
            else:
                dist[j.UF] = 1
        return dist

    return filtra_bdn(request, f)

@csrf_exempt
def get_juncaobdn_category(request):

    def f(bdns):
        dist = {}
        for j in bdns:
            if j.category in dist.keys():
                dist[j.category] += 1
            else:
                dist[j.category] = 1
        return dist

    return filtra_bdn(request, f)

@csrf_exempt
def get_juncaobdn_ipgw(request):

    def f(bdns):
        dist = {}
        for j in bdns:
            if j.IPGW in dist.keys():
                dist[j.IPGW] += 1
            else:
                dist[j.IPGW] = 1
        return dist

    return filtra_bdn(request, f)

def filtra_bdn(request, funcao):
    if request.method == 'POST':
        n_bdn = json.loads(request.body.decode('utf-8'))
        bdns = []
        for j in n_bdn:
            j = "30/" + j
            print(j)
            jun = Juncao.objects.filter(junserviço__contains='{}'.format(
                str(j))).first()
            if jun is not None:
                bdns.append(jun)

        dist = funcao(bdns)

        d = {
            'total': len(bdns),
            'dados': dist
        }
    return HttpResponse(json.dumps(d))

