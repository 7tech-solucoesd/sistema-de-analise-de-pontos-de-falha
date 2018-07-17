var Bdn = {
	
	currentBdn: {},

	arrBdn: [],

	arrIdBdn: [],

	onrender: function(){

		$('.active').removeClass('active');
        $('[data-page=bdn]').addClass('active');

		if(Bdn.arrBdn.length || Bdn.arrIdBdn.length){
			$('.initial-text').hide();
		}

		Bdn.renderBdn();

	},

	renderBdn: function(){
		Bdn.arrBdn.forEach(bd => {
			Bdn.showDados(bd);
		});
	},

	/**
	 * getEquipamento realiza uma requisição para a api que retorna os dados do equipamento
	 * @param {String} id String contendo o id do equipamento
	 * @return {Functino} retorna a requisição
	 */
	getBdn: function(id){

		return $.ajax({
			url: '/api/getjuncaobdn/' + id
		});

	},

	/**
	 * showDados Função que exibe os dados do equipamento na tela
	 * @param {Number} equip id do equipamento que será exibido
	 */
	showDados: function(bd){
		$('.initial-text').hide();
		$('.clear-all').show();
		var html = $('<tr data-bdn="' + bd.junserviço + '" class="bdn">\
			\
		</tr>');

		Object.keys(bd).forEach(function(key){
			
			html.append('<td data-key="' + key + '"><div class="head">' + key + '</div><div class="content">' + bd[key] +'&nbsp; </div></td>');

		});

		$('.show-bdn').append(html);;

	}
	
}