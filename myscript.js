//js
$("p,strong,h1,h2,h3").each(function(){
	if($(this).text){
	var pre_bro_string = $(this).text();
	var bro_random = Math.floor((Math.random()*3)+1);
	if(bro_random == 1){
		var bro_string = 'Bro, ' + pre_bro_string;
	} else if(bro_random == 2) {
		var bro_string = pre_bro_string + ', bro';
	} else {
		var bro_string = pre_bro_string;
	}
	
	$(this).text(bro_string);
	}
});
