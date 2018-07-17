var Default = {
    clear: function(){

        var page = $('body').attr('page');
    
        switch(page){
            case 'agencia':
                Agencia.arrIdAgencia = [];
                Agencia.arrAgencia = [];
            break;
            case 'bdn':
                Bdn.arrBdn = [];
                Bdn.arrIdBdn = [];
            break;
        }
        $('tr').remove();
		$('.clear-all').hide();
    }
}

$(function(){

    Page.get('agencia');

    $('.menu-busca').on('keydown', function(e){

        if(e.keyCode===13){

            var srcArr = $('.menu-busca').val().split(/[^0-9\/]/);

            var notFound = [];

            var page = $('body').attr('page');

            if(page === 'agencia'){
                srcArr.forEach( (srcVal,i) => {
                    Agencia.getAgencia(srcVal).then(function(res){

                        $('.menu-busca').val('');

                        Agencia.currentAgencia = JSON.parse(res);

                        if(typeof Agencia.currentAgencia.error === 'undefined'){

                            if(Agencia.arrIdAgencia.find( id => {
                                return Number(id) == Number(JSON.parse(res).junserviço.replace(/[^0-9]/g,''));
                            })){
                                return;
                            }

                            Agencia.arrIdAgencia.push(Agencia.currentAgencia.junserviço.replace(/[^0-9]/g,''));

                            Agencia.arrAgencia.push(JSON.parse(res));

                            Agencia.showDados(JSON.parse(res));

                        } else{
                            notFound.push(srcVal);
                        }

                        if(notFound.length && i+1 === srcArr.length){
                            var text = '';
                            
                            notFound.forEach( e => {
                                text += e + ' ';
                            })
                            
                            swal({
                                title: 'ATENÇÃO!',
                                type: 'warning',
                                text: 'Não encontrados:' + text
                            })
                        }

                    });
                });
            } else if(page === 'bdn'){

                srcArr.forEach( (srcVal,i) => {
                    Bdn.getBdn(Helpers.getBdnServ(srcVal)).then(function(res){

                        $('.menu-busca').val('');

                        Bdn.currentBdn = JSON.parse(res);

                        if(typeof Bdn.currentBdn.error === 'undefined'){

                            if(Bdn.arrIdBdn.find( id => {
                                return Number(id) == Number(Helpers.getBdnServ(JSON.parse(res).junserviço));
                            })){
                                return;
                            }

                            Bdn.arrIdBdn.push(Helpers.getBdnServ(Bdn.currentBdn.junserviço));

                            Bdn.arrBdn.push(JSON.parse(res));

                            Bdn.showDados(JSON.parse(res));

                        } else{
                            notFound.push(srcVal);
                        }

                        if(notFound.length && i+1 === srcArr.length){
                            var text = '';
                            
                            notFound.forEach( e => {
                                text += e + ' ';
                            })
                            
                            swal({
                                title: 'ATENÇÃO!',
                                type: 'warning',
                                text: 'Não encontrados:' + text
                            })
                        }

                    });
                });

            } else{
                setTimeout(() => {
                    
                    swal({
                        title: 'Buscar por:',
                        type: 'question',
                        showCancelButton: true,
                        showConfirmButton: true,
                        confirmButtonText: 'Agências',
                        cancelButtonText: 'BDNs',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#3085d6',
                    }).then(result => {
                        
                        if(result.value){
                            srcArr.forEach( (srcVal,i) => {
                                Agencia.getAgencia(srcVal).then(function(res){
            
                                    $('.menu-busca').val('');
            
                                    Agencia.currentAgencia = JSON.parse(res);
            
                                    if(typeof Agencia.currentAgencia.error === 'undefined'){
            
                                        if(Agencia.arrIdAgencia.find( id => {
                                            return Number(id) == Number(JSON.parse(res).junserviço.replace(/[^0-9]/g,''));
                                        })){
                                            return;
                                        }
            
                                        Agencia.arrIdAgencia.push(Agencia.currentAgencia.junserviço.replace(/[^0-9]/g,''));
            
                                        Agencia.arrAgencia.push(JSON.parse(res));
            
                                        Agencia.showDados(JSON.parse(res));
            
                                    } else{
                                        notFound.push(srcVal);
                                    }
            
                                    if(notFound.length && i+1 === srcArr.length){
                                        var text = '';
                                        
                                        notFound.forEach( e => {
                                            text += e + ' ';
                                        })
                                        
                                        swal({
                                            title: 'ATENÇÃO!',
                                            type: 'warning',
                                            text: 'Não encontrados:' + text
                                        })
                                    }

                                    if(i+1 === srcArr.length){
                                        Relatorio.getRelatoriosJunc().then(function(){
                                            setTimeout(function(){
                                                Relatorio.updateCharts(Relatorio.chartJuncData, 'Agências');
                                            },1000);
                                        });
                                    }
            
                                });
                            });
                        } else{

                            srcArr.forEach( (srcVal,i) => {
                                Bdn.getBdn(Helpers.getBdnServ(srcVal)).then(function(res){
            
                                    $('.menu-busca').val('');
            
                                    Bdn.currentBdn = JSON.parse(res);
            
                                    if(typeof Bdn.currentBdn.error === 'undefined'){
            
                                        if(Bdn.arrIdBdn.find( id => {
                                            return Number(id) == Number(Helpers.getBdnServ(JSON.parse(res).junserviço));
                                        })){
                                            return;
                                        }
            
                                        Bdn.arrIdBdn.push(Helpers.getBdnServ(Bdn.currentBdn.junserviço));
            
                                        Bdn.arrBdn.push(JSON.parse(res));
            
                                        Bdn.showDados(JSON.parse(res));
            
                                    } else{
                                        notFound.push(srcVal);
                                    }
            
                                    if(notFound.length && i+1 === srcArr.length){
                                        var text = '';
                                        
                                        notFound.forEach( e => {
                                            text += e + ' ';
                                        })
                                        
                                        swal({
                                            title: 'ATENÇÃO!',
                                            type: 'warning',
                                            text: 'Não encontrados:' + text
                                        })
                                    }

                                    if(i+1 === srcArr.length){
                                        Relatorio.getRelatoriosBdn().then(function(){
                                            setTimeout(function(){
                                                Relatorio.updateCharts(Relatorio.chartBdnData, 'BDNs');
                                            },1000);
                                        });
                                    }
            
                                });
                            });

                        }

                    })

                }, 500);

            }

        }
    });

});