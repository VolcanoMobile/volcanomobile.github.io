/** */
function midiAccessApiDevicesChanged( vars ) {
	//console.log("devicesChanged: ", vars);

	listMidiInputDevices( vars.midiAccess );
	listMidiOutputDevices( vars.midiAccess );
	refreshNoPortFoundMessage( vars.midiAccess );
}

/** */
function listMidiInputDevices( midiAccess ) {
	var midiInputsView = jQuery( "#midiInputs" );
	midiInputsView.html("");
	if ( midiAccess != null ){
		if ( midiAccess.inputs != null ){
			if ( midiAccess.inputs.size > 0 ){
				for (var inputPort of midiAccess.inputs.values() ) {		
					var html = "<div><b>" + inputPort.name + "</b><br/><small>(" + inputPort.id + ")</small></div>";
					midiInputsView.append( html );
				}
			}
			else midiInputsView.append("No MIDI input available")
		}
		else midiInputsView.append("No MIDI input")
	}
	else midiInputsView.append("No MIDI Access")
}

/** */
function listMidiOutputDevices( midiAccess ) {
	var midiOutputsView = jQuery( "#midiOutputs" );
	midiOutputsView.html("");
	if ( midiAccess != null ){
		if ( midiAccess.outputs != null ){
			if ( midiAccess.outputs.size > 0 ){
				for (var outputPort of midiAccess.outputs.values() ) {		
					var html = "<div><b>" + outputPort.name + "</b><br/><small>(" + outputPort.id + ")</small></div>";
					midiOutputsView.append( html );
				}
			}
			else midiOutputsView.append("No MIDI output available")
		}
		else midiOutputsView.append("No MIDI output")
	}
	else midiOutputsView.append("No MIDI Access")
}


/** */
function refreshNoPortFoundMessage( midiAccess ){
	var showNoPortFoundMessage = false;
	if ( midiAccess && midiAccess.inputs && midiAccess.outputs ){
		if (  ( midiAccess.inputs.size == 0 && midiAccess.outputs.size == 0 ) ){
			showNoPortFoundMessage = true;
		}
	}	
	jQuery(".noMidiPortMessage").css("display", showNoPortFoundMessage ? "" : "none" );	
}