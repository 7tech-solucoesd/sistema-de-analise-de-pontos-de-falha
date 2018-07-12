var Juncao = {
	
	currentJuncao: {},

	arrJuncao: [],

	arrIdJuncao: [],

	onrender: function(){

		Juncao.renderJuncoes();

	},

	renderJuncoes: function(){
		Juncao.arrJuncao.forEach(juncao => {
			Juncao.showDados(juncao);
		});
	},

	/**
	 * getJuncao realiza uma requisição para a api que retorna os dados da junção
	 * @param {String} id String contendo o id da junção
	 * @return {Functino} retorna a requisição
	 */
	getJuncao: function(id){

		id = id || $('.menu-busca').val();

		return $.ajax({
			url: '/api/getjuncao/' + id
		});

	},

	/**
	 * showDados Função que exibe os dados da junção na tela
	 * @param {Number} juncao id da junção que será exibida
	 */
	showDados: function(juncao){

		var html = $('<tr data-juncao="' + juncao.junserviço + '" class="juncao">\
			\
		</tr>');

		Object.keys(juncao).forEach(function(key){
			
			html.append('<td data-key="' + key + '"><div class="head">' + key + '</div><div class="content">' + juncao[key] +'&nbsp; </div></td>');

		});

		$('.show-juncoes').append(html);;

	}
	
}