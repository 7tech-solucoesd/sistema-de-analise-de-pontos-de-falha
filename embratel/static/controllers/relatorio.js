var Relatorio = {

    juncUrls: [{name:'categ', url:'api/getpontoscategory'},
    {name:'ipgw', url:'api/getpontosipgw'},{name:'uf', url:'api/getpontosuf'}],

    eqpUrls:[{name:'dncc', url:'api/getpontosdncc'},{name:'hub',url:'api/getpontoshub'}],

    chartJuncData: [],

    onrender: function(){

        $('.active').removeClass('active');
        $('[data-page=relatorio]').addClass('active');

        Relatorio.getRelatoriosJunc().then(function(){
            setTimeout(function(){
                Relatorio.updateCharts(Relatorio.chartJuncData, 'Junções');
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
            Relatorio.juncUrls.forEach((el,index) => {
                
                Relatorio.request(el.url, Juncao.arrIdJuncao).then(res => {
                    
                    Relatorio.chartJuncData.push({
                        name: el.name,
                        data: JSON.parse(res).dados,
                        total: JSON.parse(res).total
                    });

                    if(index+1 === Relatorio.juncUrls.length) resolve();

                }).catch(error => {

                    if(index+1 === Relatorio.juncUrls.length) resolve();

                    console.error(error);
                })

            });
        });

    },

    getRelatoriosBdn: function(){
        
        Relatorio.chartBdnData = [];

        return new Promise(function(resolve, reject){
            Relatorio.eqpUrls.forEach((el,index) => {
                
                Relatorio.request(el.url, Equipamento.arrIdEquipamento).then(res => {
                    
                    Relatorio.chartBdnData.push({
                        name: el.name,
                        data: JSON.parse(res).dados,
                        total: JSON.parse(res).total
                    });

                    if(index+1 === Relatorio.eqpUrls.length) resolve();

                }).catch(error => {

                    if(index+1 === Relatorio.eqpUrls.length) resolve();

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

            var ctx = $('#'+el.name).get(0).getContext('2d');

            var myChart = new Chart(ctx, {
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

        });
    }

}