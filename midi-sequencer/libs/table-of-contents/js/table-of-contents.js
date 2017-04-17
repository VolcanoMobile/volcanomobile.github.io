$(document).ready(function() {
	
	//// Each title
	$(":header").each(
	
		function(){

			/////
			var titleLevel = parseInt( $(this).prop("tagName").replace( /^\D+/g, ''), 10 );

			if ( titleLevel > 1  &&  titleLevel < 4 ){			
				
				/////
				var anchorName = 'anchor-title-' + $(this).html();
				anchorName = anchorName.split(' ').join('-');///// Remove white spaces
				anchorName = anchorName.replace('<br/>','-'); ///// Remove <br/> tags
				anchorName = anchorName.replace('<br>','-'); ///// Remove <br> tags
				anchorName = anchorName.replace(/(<([^>]+)>)/ig,""); ///// Remove html tags
				anchorName = anchorName.toLowerCase();
				
				///// Create anchor link just before title
				var anchorLink = $('<a></a>').attr('name', anchorName ).insertBefore( $(this) );
			}
		}
	);
	
	//// Each title
    $(".references-table").each(
		function(){
	
			/////
			//var referencesTable = $('<div></div>').attr('id', 'tuto-references-table').attr('class', 'tuto-references-table').prependTo( $(this) );
			//referencesTable.addClass( "list-group" );
			
			var referencesTable = $(this);
				
			//// Each title
			$(":header").each(
				function(){
					
					/////
					var titleLevel = parseInt( $(this).prop("tagName").replace( /^\D+/g, ''), 10 );
					
					
					if ( titleLevel > 1  &&  titleLevel < 4 ){
						
						var referenceTitle = $(this).html().replace("<br/>", " - ");
						referenceTitle = referenceTitle.replace("<br>", " - ");
						
						/////
						var paddingLeft = ( titleLevel - 2 ) * 2;
						
						
						/////
						var anchorName = 'anchor-title-' + $(this).html();
						anchorName = anchorName.split(' ').join('-');///// Remove white spaces
						anchorName = anchorName.replace('<br/>','-'); ///// Remove <br/> tags
						anchorName = anchorName.replace('<br>','-'); ///// Remove <br> tags
						anchorName = anchorName.replace(/(<([^>]+)>)/ig,""); ///// Remove html tags
						anchorName = anchorName.toLowerCase();
						
						/////
						var reference = $('<a></a>').appendTo( referencesTable );
						reference.attr( 'href', '#' + anchorName );
						
						///// Item CSS class
						var itemCssClass = '';
						
						// Bootstrap
						if ( referencesTable.hasClass( 'dropdown-menu' ) ){
							itemCssClass = itemCssClass + ' dropdown-item';
						}
						if ( referencesTable.hasClass( 'list-group' ) ){
							itemCssClass = itemCssClass + ' list-group-item';
						}
						
						
						reference.addClass( 'tuto-references-table-reference ' + itemCssClass );

						/////
						var referenceText = $('<span></span>').appendTo( reference );
						referenceText.css( 'padding-left', paddingLeft + 'em' );
						referenceText.append( referenceTitle ); 
					}
				}
			);
		}
	);
	
});

