var Default = {
	
	getJuncao: function(id){

		return $.ajax({
			url: '/api/getjuncao/' + id
		})

	}

}