var Relatorio = {

    juncUrls: [{name:'categ', url:'api/getpontoscategory'},
    {name:'ipgw', url:'api/getpontosipgw'},{name:'uf', url:'api/getpontosuf'}],

    eqpUrls:[{name:'dncc', url:'api/getpontosdncc'},{name:'hub',url:'api/getpontoshub'}],

    chartData: [],

    onrender: function(){

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

    }

}