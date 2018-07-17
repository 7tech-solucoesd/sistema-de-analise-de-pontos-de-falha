var Helpers = {
	
    capitalize: function(string){
        return string.toString()[0].toUpperCase() + string.toString().substr(1);
    },

    poolColors: function(a){
        var pool = [];
        for(i=0;i<a;i++){
            pool.push(Helpers.dynamicColors());
        }
        return pool;
    },

    dynamicColors: function(){
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ", 0.6)";
    },

    getBdnServ: function(bdn){
        var serv = bdn.split('/');

        if(serv.length > 1)
            return serv[1];
        else return bdn;
    }

}