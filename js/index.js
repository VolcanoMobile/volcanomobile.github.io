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
	
	/////load games
	loadApps( 'game', '#games-container' )
	
	
	/////load apps
	loadApps( 'app', '#apps-container' )
	
	
	/////load reviews
	loadReviews( '#reviews-container' )
	
});


function loadApps( type, containerId ){
	
	$.getJSON("json/apps.json", function( jsonObject ) {
		
		//console.log('getJSON jsonObject.name: ' + jsonObject.name );

		$.each(jsonObject.apps, function(i, app) {
			
			//	console.log('getJSON app ' + i + ': ' + app.name );

			if ( app.type == type || type == 'all' ){
				
				
				htmlCol = $("<div></div>");
				htmlCol.addClass( 'col-6 col-sm-4 col-md-3 col-lg-2' );
				htmlCol.attr( 'itemscope', "" );
				htmlCol.attr( 'itemtype', "http://schema.org/MobileApplication" );

				var urlTarget = "_blank";
				if ( app.urlTarget != null ) urlTarget = app.urlTarget;
				htmlLink = $( '<a href="' + app.url + '" target="' + urlTarget + '"></a>');
				
				htmlCard = $("<div></div>");
				htmlCard.addClass( );
				
				htmlCardBlock = $("<div></div>");
				htmlCardBlock.addClass( '' );
				
				appImage = $("<img></img>");
				appImage.attr( 'src', app.icon );
				appImage.attr( 'alt', app.name );
				appImage.attr( 'title', app.name );
				appImage.addClass( 'img-fluid' );

				htmlTitle = $("<div></div>");
				htmlTitle.html( app.name );
				htmlTitle.attr( 'itemprop', "name" );
				htmlTitle.css("display", "none")

				htmlOperatingSystem = $("<span></span>");
				htmlOperatingSystem.html( "Android" );
				htmlOperatingSystem.attr( 'itemprop', "operatingSystem" );
				htmlOperatingSystem.css("display", "none")

				htmlApplicationCategory = $("<span></span>");
				htmlApplicationCategory.html( app.category );
				htmlApplicationCategory.attr( 'itemprop', "applicationCategory" );
				htmlApplicationCategory.css("display", "none")

				/*htmlApplicationOffers = $("<span></span>");
				htmlApplicationOffers.html( '<span itemprop="priceCurrency" content="USD">$</span><span itemprop="price">0.0</span>' );
				htmlApplicationOffers.attr( 'itemprop', "offers" );
				htmlApplicationOffers.attr( 'itemscope', "" );
				htmlApplicationOffers.attr( 'itemtype', "http://schema.org/Offer" );
				htmlApplicationOffers.css("display", "none");*/

				/*htmlApplicationAggregateRating = $("<span></span>");
				htmlApplicationAggregateRating.html( '<span itemprop="ratingValue">5</span><span itemprop="bestRating">5</span><span itemprop="ratingCount">5</span>' );
				htmlApplicationAggregateRating.attr( 'itemprop', "aggregateRating" );
				htmlApplicationAggregateRating.attr( 'itemscope', "" );
				htmlApplicationAggregateRating.attr( 'itemtype', "http://schema.org/AggregateRating" );
				htmlApplicationAggregateRating.css("display", "none")*/

				htmlCardBlock.append( appImage );
				htmlCardBlock.append( htmlTitle );
				htmlCardBlock.append( htmlOperatingSystem );
				htmlCardBlock.append( htmlApplicationCategory );
				//htmlCardBlock.append( htmlApplicationOffers );
				//htmlCardBlock.append( htmlApplicationAggregateRating );
				
				htmlCard.html( htmlCardBlock );
				
				htmlLink.html( htmlCard );
				
				htmlCol.html( htmlLink );
				
				$( containerId ).append(htmlCol);
				$( containerId ).append("\n\r");
			}
		});
	});
}


function loadReviews( containerId ){
	
	$.getJSON("json/reviews.json", function( jsonObject ) {
		
		console.log('loadReviews jsonObject.name: ' + jsonObject.name );

		$.each(jsonObject.reviews, function(i, review) {
			
			console.log('loadReviews app ' + i + ': ' + review.name );

			
			htmlCol = $("<div></div>");
			htmlCol.addClass( 'col-6 col-lg-4' );
			
			htmlLink = $( '<a href="' + review.url + '" target="_blank"></a>');
			
			card = $("<div></div>");
			card.addClass( 'card text-center' );
			
			cardBlock = $("<div></div>");
			cardBlock.addClass( 'card-block' );
			
			reviewer = $("<div></div>");
			reviewer.addClass( 'reviewer-icon-container' );
			reviewerImage = $("<img></img>");
			reviewerImage.attr( 'src', review.reviewerIcon );
			reviewerImage.attr( 'alt', review.text );
			reviewerImage.attr( 'title', review.text );
			reviewerImage.addClass( 'img-fluid reviewer-icon' );

			reviewContent = $("<div></div>");
			reviewContent.addClass( '' );

			appImage = $("<img></img>");
			appImage.attr( 'src', review.appIcon );
			appImage.attr( 'alt', review.text );
			appImage.attr( 'title', review.text );
			appImage.addClass( 'app-icon' );

			text = $("<div></div>");
			text.html( review.text );
			text.addClass( 'card-title' );

					reviewContent.append( appImage );
					reviewContent.append( text );
			
				cardBlock.append( reviewContent );

					reviewer.append( reviewerImage );
			
				cardBlock.append( reviewer );
				
			card.append( cardBlock );
			
			htmlLink.html( card );
			
			htmlCol.html( htmlLink );
			
			$( containerId ).append(htmlCol);

		});
	});
}


