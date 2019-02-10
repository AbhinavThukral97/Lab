$(document).ready(function(){
	function search(string){
		$('tr.project').each(function(index){
			var str = $(this).text();
			if(str.toUpperCase().indexOf(string.toUpperCase()) > -1)
				$(this).removeClass('hide');
			else
				$(this).addClass('hide');
		});
	}

	$('input.search').keyup(function(e){
		val = $('input.search').val();
		search(val);
	});

	$('input#name').keydown(function(e){
		$('input#name').val($('input#name').val().replace(' ','-'));
	});
});