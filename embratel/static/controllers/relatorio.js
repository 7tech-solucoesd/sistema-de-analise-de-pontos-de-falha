var Relatorio = {

    juncUrls: [{name:'categ', url:'api/getpontoscategory'},
    {name:'ipgw', url:'api/getpontosipgw'},{name:'uf', url:'api/getpontosuf'}],

    eqpUrls:[{name:'dncc', url:'api/getpontosdncc'},{name:'hub',url:'api/getpontoshub'}],

    chartData: [],

    onrender: function(){

        Relatorio.getRelatoriosJunc();

        Relatorio.updateCharts();

    },

    getRelatoriosJunc: function(){

        Relatorio.juncUrls.forEach(el => {
            
            Relatorio.request(el.url, Juncao.arrIdJuncao).then(res => {
                
                Relatorio.chartData.push({
                    name: el.name,
                    data: JSON.parse(res).dados,
                    total: JSON.parse(res).total
                });

            }).catch(error => {
                console.error(error);
            })

        });

    },

    request: function(url, array){

        return $.ajax({
            url: url,
            type: 'POST',
            data: JSON.stringify(array)
        });

    },

    updateCharts: function(){
        Relatorio.chartData.forEach(el => {

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
                        label: 'Junções',
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