var Default = {
    clear: function(){

        var page = $('body').attr('page');
    
        switch(page){
            case 'juncao':
                Juncao.arrIdJuncao = [];
                Juncao.arrJuncao = [];
            break;
            case 'equipamento':
                Equipamento.arrEquipamento = [];
                Equipamento.arrIdEquipamento = [];
            break;
        }
        $('tr').remove();
		$('.clear-all').hide();
    }
}

$(function(){

    Page.get('juncao');

    $('.menu-busca').on('keydown', function(e){

        if(e.keyCode===13){

            var srcArr = $('.menu-busca').val().split(/[^0-9]/);

            var notFound = [];

            var page = $('body').attr('page');

            if(page === 'juncao'){
                srcArr.forEach( (srcVal,i) => {
                    Juncao.getJuncao(srcVal).then(function(res){

                        $('.menu-busca').val('');

                        Juncao.currentJuncao = JSON.parse(res);

                        if(typeof Juncao.currentJuncao.error === 'undefined'){

                            if(Juncao.arrIdJuncao.find( id => {
                                return Number(id) == Number(JSON.parse(res).vsatname.replace(/[^0-9]/g,''));
                            })){
                                return;
                            }

                            Juncao.arrIdJuncao.push(Juncao.currentJuncao.vsatname.replace(/[^0-9]/g,''));

                            Juncao.arrJuncao.push(JSON.parse(res));

                            Juncao.showDados(JSON.parse(res));

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
            } else if(page === 'equipamento'){

                srcArr.forEach( (srcVal,i) => {
                    Equipamento.getEquipamento(srcVal).then(function(res){

                        $('.menu-busca').val('');

                        Equipamento.currentEquipamento = JSON.parse(res);

                        if(typeof Equipamento.currentEquipamento.error === 'undefined'){

                            if(Equipamento.arrIdEquipamento.find( id => {
                                return Number(id) == Number(JSON.parse(res).jc_BDN.replace(/[^0-9]/g,''));
                            })){
                                return;
                            }

                            Equipamento.arrIdEquipamento.push(Equipamento.currentEquipamento.jc_BDN.replace(/[^0-9]/g,''));

                            Equipamento.arrEquipamento.push(JSON.parse(res));

                            Equipamento.showDados(JSON.parse(res));

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

            }

        }
    });

});