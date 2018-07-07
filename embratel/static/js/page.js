var Page = {

    /**
     * Guarda o histórico de páginas acessadas
     * @type {Array}
     */
    history: [],

    /**
     * Retorna para a página anterior
     */
    back: function(){

        if(Page.history[Page.history.length-2] === 'login') return;

        // Remove a ultima página do historico
        Page.history.pop();

        // A nova página então será a ultima da lista
        var page = Page.history[Page.history.length-1];

        // Caso não exista, saímos do codigo
        if(!page) return;

        // Caso exista requisitamos-la
        return Page.get(page).then(function(){

            // Apagamos a página atual, para que não se repita novamente
            Page.history.pop();

        });

    },

    getActual: function(){
        return $('body').attr('page');
    },

    /**
     * Vai para a página selecionada
     * @param  {String} view    O nome da página em app/views/ em formato html
     * @param  {Object} objData Objeto a ser passado para o onrender do objeto
     */
    get: function(view, objData){

        return new Promise(function(resolve, reject){
            // Faz uma requisição ajax para a pasta das views
            $.get('static/views/' + view + '.html').then(function(response){

                Page.history.push(view);

                var lastPage = $('body').attr('page');

                if(typeof lastPage !== 'undefined'){

                    // Paga o controller da view
                    var oldController = window[Helpers.capitalize(lastPage)] || false;

                    // Verifica a existencia do controller
                    if(oldController){
                        if(typeof oldController.onexit === 'function'){

                            // Executa o método onexit do oldController
                            oldController.onexit();

                        }
                    }

                }

                // Adiciona a resposta ao elemento com id all
                $('#main').html(response);

                if(typeof Navbar !== 'undefined') Navbar.close();

                $('body').attr('page', view);

                // Paga o controller da view
                var controller = window[Helpers.capitalize(view)] || false;

                $('.page-title').text('');

                // Verifica a existencia do controller
                if(controller){

                    if(typeof controller.onrender === 'function'){

                        // Executa o método onrender do controller
                        controller.onrender(objData);

                        $(document).scrollTop(0);

                    }

                    if(controller.navbarTitle){
                        $('.page-title').html(controller.navbarTitle);
                    }
                    
                }

                if($('body').hasClass('is-smartphone')){
                    var barHeight = $('.smartphone-navbar').css('height');

                    $('body').css('padding-top', barHeight);
                }

                resolve()

            }).catch(reject);
        });

    },

    /**
     * Recarrega a view atual
     */
    reloadPage: function(){

        return Page.get($('body').attr('page'));

    },

    /**
     * Pega apenas o HTML da página requisitada
     * @param  {[type]} view Nome da view a ser requisitada
     */
    html: function(view){

        return new Promise(function(resolve, reject){
            // Faz uma requisição ajax para a pasta das views
            $.get('app/views/' + view + '.html').then(function(response){

                // Paga o controller da view
                var controller = window[Helpers.capitalize(view)] || false;

                resolve(response);

            }).catch(reject);
        });

    }

}