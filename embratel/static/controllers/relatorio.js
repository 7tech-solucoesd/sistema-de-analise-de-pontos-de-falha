var Relatorio = {

    agnUrls: [
        {name:'agn-categ', url:'api/getpontoscategory'},
        {name:'agn-ipgw', url:'api/getpontosipgw'},
        {name:'agn-uf', url:'api/getpontosuf'},
        {name:'agn-dncc', url:'api/getjuncaodncc'},
        {name:'agn-hub', url:'api/getjuncaohub'}
    ],

    bdnUrls:[
        {name:'bdn-dncc', url:'api/getjuncaobdndncc'},
        {name:'bdn-hub',url:'api/getjuncaobdnhub'},
        {name:'bdn-uf', url:'api/getjuncaobdnuf'},
        {name:'bdn-ipgw', url:'api/getjuncaobdnipgw'},
    ],

    chartJuncData: [],

    chartBdnData: [],

    charts: {},

    onrender: function(){

        Relatorio.charts = {};

        $('.active').removeClass('active');
        $('[data-page=relatorio]').addClass('active');

        Relatorio.getRelatoriosJunc().then(function(){
            setTimeout(function(){
                Relatorio.updateCharts(Relatorio.chartJuncData, 'Agências');
            },1000);
        });

        Relatorio.getRelatoriosBdn().then(function(){
            setTimeout(function(){
                Relatorio.updateCharts(Relatorio.chartBdnData, 'BDNs');
            },1000);
        });

    },

    getRelatoriosJunc: function(){
        
        Relatorio.chartJuncData = [];

        return new Promise(function(resolve, reject){
            Relatorio.agnUrls.forEach((el,index) => {
                
                Relatorio.request(el.url, Agencia.arrIdAgencia).then(res => {
                    
                    Relatorio.chartJuncData.push({
                        name: el.name,
                        data: JSON.parse(res).dados,
                        total: JSON.parse(res).total
                    });

                    if(index+1 === Relatorio.agnUrls.length) resolve();

                }).catch(error => {

                    if(index+1 === Relatorio.agnUrls.length) resolve();

                    console.error(error);
                })

            });
        });

    },

    getRelatoriosBdn: function(){
        
        Relatorio.chartBdnData = [];

        return new Promise(function(resolve, reject){
            Relatorio.bdnUrls.forEach((el,index) => {
                
                Relatorio.request(el.url, Bdn.arrIdBdn).then(res => {
                    
                    Relatorio.chartBdnData.push({
                        name: el.name,
                        data: JSON.parse(res).dados,
                        total: JSON.parse(res).total
                    });

                    if(index+1 === Relatorio.bdnUrls.length) resolve();

                }).catch(error => {

                    if(index+1 === Relatorio.bdnUrls.length) resolve();

                    console.error(error);
                })

            });
        });

    },

    request: function(url, array){

        return $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(array)
        });

    },

    updateCharts: function(chartData, type){
        chartData.forEach(el => {

            var dados = [];

            Object.keys(el.data).forEach(e => {
                dados.push(el.data[e]);
            });

            var ctx = $('#' + el.name).get(0).getContext('2d');

            if(typeof Relatorio.charts[el.name] === 'undefined'){ 
                Relatorio.charts[el.name] = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Object.keys(el.data),
                        datasets: [{
                            label: type,
                            data: dados,
                            backgroundColor: Helpers.poolColors(dados.length || 1)
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    beginAtZero:true
                                }
                            }]
                        }
                    }
                });
            } else{
                Relatorio.charts[el.name].config.data =  {
                    labels: Object.keys(el.data),
                    datasets: [{
                        label: type,
                        data: dados,
                        backgroundColor: Helpers.poolColors(dados.length || 1)
                    }]
                }
                Relatorio.charts[el.name].update();
            }

        });
    },

    getPDF: function(){
        $('.header').hide();
        $('.get-pdf').hide();
        window.print();
        $('.header').show();
        $('.get-pdf').show();
    }

}