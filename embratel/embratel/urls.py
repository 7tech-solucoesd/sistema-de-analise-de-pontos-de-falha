"""embratel URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from ijapp.views import get_file
from cjapp.views import (get_juncao, get_pontos_uf, get_pontos_ipgw,
                         get_juncaobdn_dncc,get_juncaobdn_hub,get_juncaobdn,
                         get_juncaobdn_uf,get_juncaobdn_ipgw,get_juncaobdn_category,
                         get_juncao_dncc,get_juncao_hub,
                         get_pontos_category,index)

urlpatterns = [
    # apis para pegar informaçoes juncao BDN
    path('api/getjuncaobdncategory', get_juncaobdn_category),
    path('api/getjuncaobdnipgw', get_juncaobdn_ipgw),
    path('api/getjuncaobdnuf', get_juncaobdn_uf),
    path('api/getjuncaobdndncc', get_juncaobdn_dncc),#feito
    path('api/getjuncaobdnhub', get_juncaobdn_hub),#feito
    path('api/getjuncaobdn/<juncaobdn>',get_juncaobdn),#feito
    # apis para pegar informaçoes juncao agencia
    path('api/getpontoscategory', get_pontos_category),
    path('api/getpontosipgw', get_pontos_ipgw),
    path('api/getpontosuf', get_pontos_uf),
    path('api/getjuncaodncc', get_juncao_dncc),
    path('api/getjuncaohub', get_juncao_hub),
    path('api/getjuncao/<juncao>', get_juncao),
    # outros
    path('admin/import/', get_file),
    path('admin/', admin.site.urls),
    path('', index),
]
