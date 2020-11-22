/////////////////////////
///// PRIMARY COLOR /////
/////////////////////////

/** */
var jColorPrimary = null

/** */
function initColorPrimary( colorHexString ){
	jColorPrimary = new jqueryColor( { "hex" : colorHexString });
	jColorPrimary.setCallbackValuesChanged(function( jColor ){
		colorPrimaryChanged( jColor, false );
	});
}

/** */
function initColorPrimaryInputs(){
	//console.log( "initColorPrimaryInputs()" );

	//
    $("#colorpicker").spectrum({
		type: "",
		showPalette: false,
		showButtons: false,
		showAlpha: true,
		showInput: false,
        color: jColorPrimary.getHex(),
		move: function(color) {
			jColorPrimary.setRgba( parseInt( color._r ), parseInt( color._g ), parseInt( color._b ), parseInt( color._a * 255 ) )
		}
    });
	
		
	// RGBA Range Inputs
	$("#colorPrimaryInputRgbaR").change(function(){
		jColorPrimary.setRgba( $(this).val(), jColorPrimary.getRgba().g, jColorPrimary.getRgba().b, jColorPrimary.getRgba().a );
	});
	$("#colorPrimaryInputRgbaG").change(function(){
		jColorPrimary.setRgba( jColorPrimary.getRgba().r, $(this).val(), jColorPrimary.getRgba().b, jColorPrimary.getRgba().a );
	});
	$("#colorPrimaryInputRgbaB").change(function(){
		jColorPrimary.setRgba( jColorPrimary.getRgba().r, jColorPrimary.getRgba().g, $(this).val(), jColorPrimary.getRgba().a );
	});
	$("#colorPrimaryInputRgbaA").change(function(){
		jColorPrimary.setRgba( jColorPrimary.getRgba().r, jColorPrimary.getRgba().g, jColorPrimary.getRgba().b, $(this).val() );
	});
	
 
	//
	$("#colorFormHex").change(function(e){
		jColorPrimary.setHex( $("#colorFormHex").val() )
		setColorPrimaryFormRgbaValues( jColorPrimary );
	});
	
	//
	$("#colorPrimaryLuminanceRange").change(function(){
		var newval=$(this).val();
		jColorPrimary.setLuminance( newval );
	});
	
	//
	$("#colorPrimaryUseAsSecondaryButton").click(function(){
		jColorSecondary.setHex( jColorPrimary.getHex() );
		setColorpickerSecondaryValue( jColorSecondary );
	});
	
	
	
	//
	colorPrimaryChanged( jColorPrimary, true );
}

//
function colorPrimaryChanged( jColor, refreshColorPicker ){
	console.log( "colorPrimaryChanged()" );
	
	//
	//refreshColorPrimaryResults( refreshColorPicker );
	calculateContrast( jColor, jColorSecondary );
	refreshCssResult();
	refreshSecondaryList();
	refreshShareLink();
	$("#colorPrimaryCopyButton").val(jColor.getHex());
}



/** */
function setColorpickerPrimaryValue( jColor ){
	$("#colorpicker").spectrum("set", jColor.getHex() );
}
