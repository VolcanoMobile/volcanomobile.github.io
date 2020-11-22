//
$( document ).ready(function() {
	$(".copyClipboard").each(function(){
		$(this).click(function(){

			//
			var value = $(this).val();
			if ( !value ) value = $(this).attr("value");
			if ( !value ) value = $(this).html();
			
			//
			copyToClipboard( value );
			
			//
			$.notify("'"+value+"' copied in clipboard", "success");
		});
	});
});

//
function copyElementValueToClipboard( element ) {
	var value = $(element).val() ? $(element).val() : $(element).text()
	copyToClipboard( value );
}


//
function copyToClipboard( value ) {
	var $temp = $("<input>");
    $("body").append($temp);
    $temp.val( value ).select();
    document.execCommand("copy");
    $temp.remove();
}
