var Equipamento = {
	
	currentEquipamento: {},

	arrEquipamento: [],

	arrIdEquipamento: [],

	onrender: function(){

		$('.active').removeClass('active');
        $('[data-page=equipamento]').addClass('active');

		if(Equipamento.arrEquipamento.length || Equipamento.arrIdEquipamento.length){
			$('.initial-text').hide();
		}

		Equipamento.renderEquipamentos();

	},

	renderEquipamentos: function(){
		Equipamento.arrEquipamento.forEach(equip => {
			Equipamento.showDados(equip);
		});
	},

	/**
	 * getEquipamento realiza uma requisição para a api que retorna os dados do equipamento
	 * @param {String} id String contendo o id do equipamento
	 * @return {Functino} retorna a requisição
	 */
	getEquipamento: function(id){

		id = id || $('.menu-busca').val();

		return $.ajax({
			url: '/api/getBDN/' + id
		});

	},

	/**
	 * showDados Função que exibe os dados do equipamento na tela
	 * @param {Number} equip id do equipamento que será exibido
	 */
	showDados: function(equip){
		$('.initial-text').hide();
		$('.clear-all').show();
		var html = $('<tr data-equip="' + equip.jc_BDN + '" class="equipamento">\
			\
		</tr>');

		Object.keys(equip).forEach(function(key){
			
			html.append('<td data-key="' + key + '"><div class="head">' + key + '</div><div class="content">' + equip[key] +'&nbsp; </div></td>');

		});

		$('.show-equips').append(html);;

	}
	
}