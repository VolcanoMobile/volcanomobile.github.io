///////////////////////////
///// SECONDARY COLOR /////
///////////////////////////

//
var jColorSecondary = null

/** */
function initColorSecondary( colorHexString ){
	jColorSecondary = new jqueryColor( { "hex" : colorHexString });
	jColorSecondary.setCallbackValuesChanged(function( jsColorObject ){
		colorSecondaryChanged( jsColorObject, false );
	});

	colorSecondaryChanged( jColorSecondary, true );
}


/** */
function initColorSecondaryInputs(){
	
    $("#colorpickerSecondary").spectrum({
		type: "",
		showPalette: false,
		showButtons: false,
		showAlpha: true,
		showInput: false,
        color: jColorSecondary.getHex(),
		move: function(color) {
			jColorSecondary.setRgba( parseInt( color._r ), parseInt( color._g ), parseInt( color._b ), parseInt( color._a * 255 ) )
		}
    });
	
	//
	$("#colorSecondaryLuminanceRange").change(function(){
		var newval=$(this).val();
		jColorSecondary.setLuminance( newval );
		setColorpickerSecondaryValue( jColorSecondary );
	});
	
	//
	$("#colorSecondaryUseAsPrimaryButton").click(function(){
		jColorPrimary.setHex( jColorSecondary.getHex() );
		setColorpickerPrimaryValue( jColorPrimary );
	});
}

/** */
function colorSecondaryChanged( jsColorObject, refreshColorPicker ){
	calculateContrast( jColorPrimary, jsColorObject );
	refreshCssResult();
	refreshSecondaryList();
	setColorSecondaryLuminanceRangeValues( jsColorObject );
	$("#colorSecondaryCopyButton").val(jsColorObject.getHex());

	//
	if ( refreshColorPicker ){
		setColorpickerSecondaryValue( jsColorObject );
	}
	
	refreshShareLink();
}


/** */
function calculateContrast( jsColorObject1, jsColorObject2 ){
	if ( jsColorObject1 && jsColorObject2 ){

		var contrast = jsColorObject1.getContrast( jsColorObject2 );	
		refreshContrastValue( contrast );
	}
}

/** */
function refreshSecondaryList(){
	if ( jColorSecondary ){
		$("#scondaryColorList" ).html(null);
		
		var luminance = 0;
		while ( luminance <= jColorSecondary.getLuminance() ){
			var jColorTmp = new jqueryColor( { "hex" : jColorSecondary.getHex() });
			jColorTmp.setLuminance( luminance );
			createSecondaryListItem( jColorTmp, luminance );
			luminance += 0.025;
		}

		luminance = jColorSecondary.getLuminance();
		while ( luminance <= 1.0 ){
			var jColorTmp = new jqueryColor( { "hex" : jColorSecondary.getHex() });
			jColorTmp.setLuminance( luminance );
			createSecondaryListItem( jColorTmp, luminance );
			luminance += 0.025;
		}
	}
}

/** */
function createSecondaryListItem( jColorTmp, luminance ){
	var contrast = parseInt( jColorPrimary.getContrast( jColorTmp ) * 100 ) / 100.0;
	if ( contrast >= 3.0 ){
		$("#scondaryColorList" ).append(
			$("<div/>", {
				class: "list-group-item androidPrimaryBg androidPrimaryText copyClipboard text-center",
			})
			.css( "color", jColorTmp.getHex() )
			.css( "padding", 0 )
			.val( jColorTmp.getHex() )
			.click(function(){
				copyToClipboard($(this), $(this).val() );
				$.notify("'"+$(this).val()+"' copied in clipboard", "success");
			})			
			.append( 
				$(
					"<span/>", { class: "fa fa-check", title: "Use as secondary" } 
				)
				.css("line-height", "3rem")
				.css("width", "3rem")
				.val( jColorTmp.getHex() )
				.click(function(){
					jColorSecondary.setHex($(this).val());
					setColorpickerSecondaryValue( jColorSecondary );
				})
			)
			.append( 
				$("<span/>", {
					class: "",
				})
				.html( "  " + contrast + "  " )
			)
			.append( 
				$(
					"<span/>", { class: "fa fa-copy", title : "Copy" } 
				)
				.css("width", "3rem")
			)			
		);
	}
}


/** */
function setColorpickerSecondaryValue( jColor ){
	$("#colorpickerSecondary").spectrum("set", jColor.getHex() );
}


/** */
function setColorSecondaryLuminanceRangeValues( jColor ){
	$("#colorSecondaryLuminanceRange").val( jColor.getLuminance() );
}