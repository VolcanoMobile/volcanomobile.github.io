$(document).ready(function() {


	//////
	$.get("template-header.html", function(data){
		$("body").prepend( data);
		
		var pageName = document.location.href.match(/[^\/]+$/)[0];
		if ( pageName.indexOf( "#" ) >= 0 ) pageName = pageName.substr( 0, pageName.indexOf( "#" ) );

		if ( pageName == "index.html" ){
			 $('.navbar-nav').children().eq(0).addClass( "active" );
		}
		else if ( pageName == "features.html" ){
			 $('.navbar-nav').children().eq(1).addClass( "active" );
		}
		else if ( pageName == "user-manual.html" ){
			 $('.navbar-nav').children().eq(2).addClass( "active" );
		}
		else if ( pageName == "faq.html" ){
			 $('.navbar-nav').children().eq(3).addClass( "active" );
		}
		
	});

	//////
	$.get("template-footer.html", function(data){
		$("body").append( data);
	});


	///// Fix anchor position with fixed navbar
	var bodyPaddingTop = parseInt( jQuery( "body" ).css( "padding-top" ) );

	var shiftWindow = function() {
		//scrollBy(0, -bodyPaddingTop );
		scrollTo(0, $('a[name^="' + location.hash.substr(1) + '"]').offset().top - bodyPaddingTop ); 		
	};

	if (location.hash) shiftWindow();
	window.addEventListener("hashchange", shiftWindow);
	
	/////
	$('.fancybox').fancybox({
		transitionIn	:	"elastic",
		transitionOut	:	"elastic",
		openSpeed		:	500, 
		closeSpeed		:	50, 
		padding         :   0,
		margin          :   10,
		cyclic          :   false,
	});

});
