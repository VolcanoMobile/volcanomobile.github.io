jQuery( document ).ready(function( $ ) {
	
	jQuery('#show-contact-form-button').click( function(){
		//alert(jQuery('#contact-form-hidden').html());
		
		if ( jQuery('#contact').css("display") == "none" ){
			jQuery('#contact-form-visible').html( jQuery('#contact-form-hidden').html() );
		}
		else{
			jQuery('#contact-form-visible').html( "" );
		}
		jQuery('#contact').slideToggle('slow');
	} );
	
	
});


