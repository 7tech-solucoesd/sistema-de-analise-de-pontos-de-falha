var Agencia = {
	
	currentAgencia: {},

	arrAgencia: [],

	arrIdAgencia: [],

	onrender: function(){

		$('.active').removeClass('active');
        $('[data-page=agencia]').addClass('active');

		if(Agencia.arrAgencia.length || Agencia.arrIdAgencia.length){
			$('.initial-text').hide();
		}

		Agencia.renderAgencia();

	},

	renderAgencia: function(){
		Agencia.arrAgencia.forEach(agn => {
			Agencia.showDados(agn);
		});
	},

	/**
	 * getJuncao realiza uma requisição para a api que retorna os dados da junção
	 * @param {String} id String contendo o id da junção
	 * @return {Functino} retorna a requisição
	 */
	getAgencia: function(id){

		id = id || $('.menu-busca').val();

		return $.ajax({
			url: '/api/getjuncao/' + id
		});

	},

	/**
	 * showDados Função que exibe os dados da junção na tela
	 * @param {Number} juncao id da junção que será exibida
	 */
	showDados: function(agn){
		$('.initial-text').hide();
		$('.clear-all').show();
		var html = $('<tr data-agencia="' + agn.junserviço + '" class="agencia">\
			\
		</tr>');

		Object.keys(agn).forEach(function(key){
			
			if(key === 'Enable' || key === 'vadb' || key === 'vadb1' || key === 'vadb2' || key === 'DDR') return;

			html.append('<td data-key="' + key + '"><div class="head">' + key + '</div><div class="content">' + agn[key] +'&nbsp; </div></td>');

		});

		$('.show-agencia').append(html);;

	}
	
}