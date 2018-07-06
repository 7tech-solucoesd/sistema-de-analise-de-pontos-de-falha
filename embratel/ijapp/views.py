from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from .models import Juncao,BDN
from .forms import FileForm


@staff_member_required
def get_file(request):
    if request.method == 'POST':
        form = FileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            if file is None:
                return HttpResponse('invalid')
            Juncao.objects.all().delete()
            linhas = []
            for line in file:
                linhas.append(line.decode('utf-8', errors='replace'))
                # input()
            for linha in linhas:
                l = [x for x in linha.split(',')]
                j = Juncao()

                j.vsatname = l[0]
                j.nmd = l[1]
                j.ender = l[2]
                j.municipio = l[3]
                j.UF = l[4]
                j.junserviço = l[5]
                j.compart = l[6]
                j.desc = l[7]
                j.nomeserv = l[8]
                j.fone = l[9]
                j.primeid = l[10]
                j.category = l[11]
                j.serial = l[12]
                j.softprof = l[13]
                j.devicetype = l[14]
                j.ipmgmt = l[15]
                j.iplan1 = l[16]
                j.mask = l[17]
                j.servplan = l[18]
                j.AIS = l[19]
                j.OutrouteGroup = l[20]
                j.FAP = l[21]
                j.IPGW = l[22]
                j.Ipipgw = l[23]
                j.IQoS = l[24]
                j.IQoSnum = l[25]
                j.Enable = l[26]
                j.vadb = l[27]
                j.vadb1 = l[28]
                j.vadb2 = l[29]
                j.Enable = l[30]
                j.DDR = l[31]

                j.save()
                print(l)
                # input()
            return HttpResponse('/thanks/')
    else:
        form = FileForm()

    return render(request, 'file.html', {'form': form})


@staff_member_required
def get_file_bdn(request):
    if request.method == 'POST':
        form = FileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            if file is None:
                return HttpResponse('invalid')
            BDN.objects.all().delete()
            linhas = []
            for line in file:
                linhas.append(line.decode('utf-8', errors='replace'))
                # input()
            for linha in linhas:
                l = [x for x in linha.split(';')]
                j = BDN()

                j.jc_agen = l[0]
                j.jc_BDN = l[1]
                j.nome_BDN = l[2]
                j.UF = l[3]
                j.meio_titular = l[4]
                j.backup = l[5]
                j.id_num = l[6]
                j.ip_BDN = l[7]
                j.masc_BDN = [8]
                j.gateway_BDN = l[9]
                j.loop_back = l[10]
                j.VMAC = l[11]
                j.ip_vlan_internet = l[12]
                j.categoria_bradesco = l[13]
                j.juncao = l[14]
                j.vsat = l[15]
                j.category = l[16]
                j.serial = l[17]
                j.IP = l[18]
                j.DNCC = l[19]
                j.IPGW = l[20]
                j.HUB = l[21]
                j.LoadBalance = l[22]
                j.categori = l[23]
                j.vsat = l[24]
                j.serial = l[25]
                j.IP = l[26]
                print(l)
                j.save()
            return HttpResponse('/thanks/')
    else:
        form = FileForm()

    return render(request, 'filebdn.html', {'form': form})
