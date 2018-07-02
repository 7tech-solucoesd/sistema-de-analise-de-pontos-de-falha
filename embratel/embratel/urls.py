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
                         get_pontos_hub, get_pontos_category, get_pontos_dncc)

urlpatterns = [
    path('api/getpontosdncc', get_pontos_dncc),
    path('api/getpontoscategory', get_pontos_category),
    path('api/getpontoshub', get_pontos_hub),
    path('api/getpontosipgw', get_pontos_ipgw),
    path('api/getpontosuf', get_pontos_uf),
    path('api/getjuncao/<juncao>', get_juncao),
    path('admin/import/', get_file),
    path('admin/', admin.site.urls),
]
