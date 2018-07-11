import json
from django.http import HttpResponse
from ijapp.models import Juncao,BDN
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt


# Create your views here.


def index (request):
    return render(request, 'index.html')
    #template = loader.get_template('index.html')
    #return HttpResponse(template.render())



def get_juncao(request, juncao):
    j = Juncao.objects.filter(
        vsatname__contains='{}'.format(juncao.zfill(4))).first()
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

def get_BDN(request, bdn):
    j = BDN.objects.filter(
        jc_BDN__contains='{}'.format(bdn.zfill(5))).first()
    if j is None:
        return HttpResponse(json.dumps({
            'error': 'Nao pertence a Primisys'
        }))
    d = {
        'jc_agen': j.jc_agen,
        'jc_BDN': j.jc_BDN,
        'nome_BDN': j.nome_BDN,
        'UF': j.UF,
        'meio_titular': j.meio_titular,
        'backup': j.backup,
        'id_num': j.id_num,
        'ip_BDN': j.ip_BDN,
        'masc_BDN': j.masc_BDN,
        'gateway_BDN': j.gateway_BDN,
        'loop_back': j.loop_back,
        'VMAC': j.VMAC,
        'ip_vlan_internet': j.ip_vlan_internet,
        'categoria_bradesco': j.categoria_bradesco,
        'juncao': j.juncao,
        'vsat': j.vsat,
        'category': j.category,
        'serial': j.serial,
        'IP': j.IP,
        'DNCC': j.DNCC,
        'IPGW': j.IPGW,
        'HUB': j.HUB,
        'LoadBalance': j.LoadBalance,
        'categori': j.categori,
        'vsat': j.vsat,
        'serial': j.serial,
        'IP': j.IP,
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


def filtra_juncao(request, funcao):
    # print(request,end=" ---------------------")
    if request.method == 'POST':
        n_juncoes = json.loads(request.body.decode('utf-8'))
        juncoes = []
        for j in n_juncoes:
            jun = Juncao.objects.filter(vsatname__contains='{}'.format(
                str(j).zfill(4))).first()
            if jun is not None:
                juncoes.append(jun)

        dist = funcao(juncoes)

        d = {
            'total': len(juncoes),
            'dados': dist
        }
    return HttpResponse(json.dumps(d))


@csrf_exempt
def get_pontos_dncc(request):

    def f(bdns):
        dist = {}
        for j in bdns:
            if j.DNCC in dist.keys():
                dist[j.DNCC] += 1
            else:
                dist[j.DNCC] = 1
        return dist

    return filtra_bdn(request, f)


@csrf_exempt
def get_pontos_hub(request):

    def f(bdns):
        dist = {}
        for j in bdns:
            if j.HUB in dist.keys():
                dist[j.HUB] += 1
            else:
                dist[j.HUB] = 1
        return dist

    return filtra_bdn(request, f)

def filtra_bdn(request, funcao):
    if request.method == 'POST':
        n_bdn = json.loads(request.body.decode('utf-8'))
        bdns = []
        for j in n_bdn:
            jun = BDN.objects.filter(jc_BDN__contains='{}'.format(
                str(j).zfill(5))).first()
            if jun is not None:
                bdns.append(jun)

        dist = funcao(bdns)

        d = {
            'total': len(bdns),
            'dados': dist
        }
    return HttpResponse(json.dumps(d))