$(document).ready(function() {

	/////load faq
	loadFAQ( 'faq-container' );
	
});


function loadFAQ( containerId ){
	
	console.log('loadFAQ containerId: ' + containerId );

	$.getJSON("json/faq.json", function( jsonObject ) {
		
		console.log('loadFAQ jsonObject.name: ' + jsonObject.name );

		var faqCpt = 0;
		
		$.each(jsonObject.faqs, function(i, faq) {
			
			console.log('loadFAQ ' + i + ': ' + faq.question );

			
			anchorHtml = $('<a name="' + faq.anchorName + '"></a>');
			$( '#' + containerId ).append( anchorHtml );


			faqHtml = $("<div></div>");
			faqHtml.addClass( 'card' );
			
			questionHtml = $("<div></div>");
			questionHtml.addClass( 'card-header' );

			responseId = 'collapse-' + faqCpt;

			questionLink = $("<a></a>");
			questionLink.attr( 'href', '#' + responseId );
			questionLink.attr( 'data-parent', '#' + containerId );
			questionLink.attr( 'data-toggle', 'collapse' );
			questionLink.html( faq.question );

			responseCollapseHtml = $("<div></div>");
			responseCollapseHtml.addClass( 'collapse' );
			responseCollapseHtml.attr( 'id', responseId );
			
			responseHtml = $("<div></div>");
			responseHtml.html( faq.response );
			responseHtml.addClass( 'card-body' );

			responseStepsHtml = $("<ol></ol>");
			
			
			$.each(faq.responseSteps, function(i, step) {
				stepHtml = $("<li></li>");
				stepHtml.html( step );
				responseStepsHtml.append( stepHtml );
			});
			
			
			
				questionHtml.html( questionLink );

			faqHtml.append( questionHtml );
			
					responseHtml.append( responseStepsHtml );
					responseHtml.append( faq.responseFoot );
				
				responseCollapseHtml.html( responseHtml );
				
			faqHtml.append( responseCollapseHtml );
			

			$( '#' + containerId ).append( faqHtml );
			$( '#' + containerId ).append( '<br/>' );
			
			faqCpt++;

		});
	});
}
