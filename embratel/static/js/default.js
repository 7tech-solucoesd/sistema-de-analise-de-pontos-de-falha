var Default = {

}

$(function(){

    Page.get('juncao');

    $('.menu-busca').on('keydown', function(e){

        if(e.keyCode===13){

            var srcVal = $('.menu-busca').val();

            var page = $('body').attr('page');

            if(page === 'juncao'){

                Juncao.getJuncao(srcVal).then(function(res){

                    $('.menu-busca').val('');

                    Juncao.currentJuncao = JSON.parse(res);

                    if(typeof Juncao.currentJuncao.error === 'undefined'){

                        if(Juncao.arrIdJuncao.find( id => {return id == JSON.parse(res).junserviço})){
                            return;
                        }

                        Juncao.arrIdJuncao.push(Juncao.currentJuncao.junserviço);

                        Juncao.arrJuncao.push(JSON.parse(res));

                        Juncao.showDados(JSON.parse(res));

                    } else{
                        alert(Juncao.currentJuncao.error);
                    }

                });

            } else{

            }

        }
    });

});