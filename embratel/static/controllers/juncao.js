var Juncao = {
	
	getJuncao: function(id){

		return $.ajax({
			url: '/api/getjuncao/' + id
		})

	}
	
}