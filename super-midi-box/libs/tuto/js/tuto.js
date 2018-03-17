$(document).ready(function() {


	/////
	var tutoMarkersListsCpt = 0;

	//// Each tuto markers-list
    $(".tuto-image-markers-list").each(
		function(){

			///// Set id
			if ( $(this).attr( "id" ) == null ){
				$(this).attr( "id", $(this).attr( "class" ) + "-" + tutoMarkersListsCpt );
			}
			
			//// Add UI class
			//$(this).find(".tuto-image-markers-list").addClass("list-group");

			/////
			tutoMarkersListsCpt++;
		}
	);
	

	/////
	var tutoImagesCpt = 0;

	//// Each tuto image
    $(".tuto-image").each(
		function(){

			///// Set id
			if ( $(this).attr( "id" ) == null ){
				$(this).attr( "id", $(this).attr( "class" ) + "-" + tutoImagesCpt );
			}
			
			var markersCpt = 0;
			
			//// Each tuto image marker
			$(this).find(".tuto-image-marker").each(
				function(){

					///// Set id
					$(this).attr( "id", "tuto-image-marker-" + markersCpt );
					

					///// Get text
					var markerText = $(this).html();
					/*if ( markerText == null || markerText.length == 0 ){
						markerText = $(this).attr( "alt" );
					}*/
					
					
					///// Set marker title attribute
					var markerTitle = markerText;
					
					// Remove \n
					markerTitle = markerTitle.replace(/(\r\n|\n|\r)/gm,"");

					// Remove extra spaces
					markerTitle = markerTitle.replace(/\s+/g,' ').trim();

					// Replace <br> with \n
					markerTitle = markerTitle.replace(/<br\s*[\/]?>/gi, "\n")
					
					// Remove extra spaces after carriage return
					markerTitle = markerTitle.replace("\n ", "\n")
					
					// Remove html tags
					markerTitle = markerTitle.replace(/(<([^>]+)>)/ig,"");
					
					// Set title
					$(this).attr( "title", markerTitle );

					
					///// Set marker text
					$(this).html( ( markersCpt + 1 ) );
					
					///// Create list item
					var item = $("<div></div>").appendTo( $( "#" + $(this).parent().attr( "markers-list") ) );
					
					var badgeClass = "tuto-badge-default";
					if ( $(this).hasClass( "tuto-image-marker-square" ) ) badgeClass = "tuto-badge-square";
					
					itemHtml = '<span class="number"><span class="tuto-badge ' + badgeClass + '">' + ( markersCpt + 1 ) + '</span></span>';
					itemHtml += '<span class="content">' + markerText + '</span>';
					item.html( itemHtml );
					
					//console.log( '*[class^="tuto-image-square-' + markersCpt + '"]' );
					$(this).closest(".tuto-image").each(function(){
						
						$(this).find( '*[class^="tuto-image-square-' + markersCpt + '"],*[class*="tuto-image-square-' + markersCpt + '"]' ).each(function(){
							$(this).attr( "title", markerTitle );
						})
					})
					markersCpt
					
					/////
					markersCpt++;
				}
			)

			/////
			tutoImagesCpt++;
		}
	);
	
	//// Each tuto image
    $(".tuto-image").click(
		function(e){

			var elementWidth = $(this).width();
			var elementEight = $(this).height();
			
			//tutoDebug( elementWidth + '/' + elementEight, true );

			var posX = $(this).offset().left;
            var posY = $(this).offset().top;
            
            var clickElementX = e.pageX - posX;
            var clickElementY = e.pageY - posY;
			
			//tutoDebug( clickElementX + '/' + clickElementY );
			
            
            var clickElementPercentX = ( clickElementX / elementWidth * 100.0 ).toFixed(1);
            var clickElementPercentY = ( clickElementY / elementEight * 100.0 ).toFixed(1);
			
			/*tutoDebug( "", true );
			tutoDebug( "#" + $(this).attr("id") + " #tuto-image-marker-0 {");
			tutoDebug( "&nbsp;&nbsp;&nbsp;&nbsp;left: " + clickElementPercentX + "%;" );
			tutoDebug( "&nbsp;&nbsp;&nbsp;&nbsp;top: " + clickElementPercentY + "%;");
			tutoDebug( "}" );*/
			
			
			var modalTitle = $(this).attr( "title" );
			if ( modalTitle == null ){
				$('#myModal .modal-header').css( "display", "none" );
				 modalTitle = null;
			}
			else{
				$('#myModal .modal-header').css( "display", "" );
			}
			$('#myModal .modal-title').html( modalTitle );
			
			var clone = $(this).clone();
			$('#myModal .modal-body').html( clone );
			
			$('#myModal').modal('show');	
			
			setTimeout(
				function(){ 
					resizeImageMarkers( clone ); 
				}, 
				500
			);
		}
	);
	
	/////
	resizeImagesMarkers();
});


/*** Window resize ****/
$( window ).resize(function() {
	
	console.log( "Handler for .resize() called." );
	
	/////
	resizeImagesMarkers();	
});


/*** Resize resize ****/
var tutoMarkersSizeFactor = 0.035;
var tutoMarkersMinSize = 8.5;
function resizeImagesMarkers(){
	
	//// Each tuto image
    $(".tuto-image").each(
		function(){
			resizeImageMarkers( $(this) );
		}
	);
	
}
function resizeImageMarkers( tutoImageObject ){

	//console.log( 'resizeImageMarkers ' + tutoImageObject.height() + '/' + tutoImageObject.width() );
	//console.log( 'resizeImageMarkers outer ' + tutoImageObject.outerHeight(false) + '/' + tutoImageObject.outerWidth(false) );

	/////
	var smallestSideSize = tutoImageObject.height()<tutoImageObject.width()?tutoImageObject.height():tutoImageObject.width();
	if ( smallestSideSize <= 0 ){
		var imageObject = tutoImageObject.find( "> img" );
		//console.log( 'resizeImageMarkers imageObject ' + imageObject.height() + '/' + imageObject.width() );
		smallestSideSize = imageObject.height()<imageObject.width()?imageObject.height():imageObject.width();
	}
	//console.log( "smallestSideSize=" + smallestSideSize );

	/////
	var markersFontSize = smallestSideSize * tutoMarkersSizeFactor;
	if ( markersFontSize < tutoMarkersMinSize ) markersFontSize = tutoMarkersMinSize;
	
	//// Each tuto image marker
	tutoImageObject.find(".tuto-image-marker").each(
		function(){

			///// Set font-size
			$(this).css( "font-size", markersFontSize );
		}
	)
}

