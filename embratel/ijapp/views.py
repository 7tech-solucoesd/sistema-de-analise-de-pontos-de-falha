from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from .models import Juncao
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
                l = [x for x in linha.split(';')]
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
                print(j)
                # print(l)
                # input()
            return HttpResponse('/thanks/')
    else:
        form = FileForm()

    return render(request, 'file.html', {'form': form})
