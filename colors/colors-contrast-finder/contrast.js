$( document ).ready(function() {
	
	var primary = getUrlParameter("primary");
	var secondary = getUrlParameter("secondary");
	//alert(primary);
	
	//
	initColorPrimary( primary ? "#"+primary : "#cce5ff" );
	initColorPrimaryInputs();
	
    // 
	initColorSecondary( secondary ? "#"+secondary : "#004085");
	initColorSecondaryInputs();

	//
	$("#showStyleLayoutButton").click(function(){
		$("#cssLayout").slideToggle();
	});

	// HEX input
	$("#colorFormHex").focus(function () {
		$(this).select();
	});
	$("#colorFormHex").focus();
});



function refreshCssResult(){
	cssText = "<style>"
	if ( jColorPrimary != null ){
		cssText += "\n\n/** PRIMARY **/";
		cssText += "\n.androidPrimaryBg{";
		cssText += "\n	background-color: " + jColorPrimary.getRgbaString() + ";";
		cssText += "\n.}";
	}
	if ( jColorSecondary != null ){
		cssText += "\n.androidPrimaryText{";
		cssText += "\n	color: " + jColorSecondary.getHex() + ";";
		cssText += "\n}";
	}
	if ( jColorSecondary != null ){
		cssText += "\n\n/** SECONDARY **/";
		cssText += "\n.androidSecondaryBg{";
		cssText += "\n	background-color: " + jColorSecondary.getRgbaString() + ";";
		cssText += "\n.}";
		cssText += "\n.androidSecondaryText{";
		cssText += "\n	color: " + jColorSecondary.getTextHex() + ";";
		cssText += "\n}";
	}
	cssText += "\n";
	cssText += "\n</style>";
	$("#cssResult").html( cssText );
	$("#cssResultHtml").html( cssText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') );
}

/** */
function refreshContrastValue( value ){
	$("#contrastResult").html( parseInt(value*100)/100.0 );
	
	if (value >= 4.5){ $("#contrastResultText").html( "Good contrast" ); }
	else if (value >= 3.0){ $("#contrastResultText").html( "Good contrast for big text" ); }
	else { $("#contrastResultText").html( "Bad contrast" ); }
}

/** */
function refreshShareLink(){
	if ( jColorPrimary && jColorSecondary) $("#shareLink").attr("href", "contrast.html?primary="+jColorPrimary.getHex().substr(1)+"&secondary="+jColorSecondary.getHex().substr(1));
}