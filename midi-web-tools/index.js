/** */
var myMidiAccessApi;

/** */
jQuery( document ).ready(function() {
	
	//
	myMidiAccessApi = new jMidiAccessApi({

		initCallback : function( vars ){
			//console.log("initCallback midiSupported: "+vars.midiSupported);
			
			// Check if browser supports MIDI
			jQuery( "#midiSupported" ).css( "display", vars.midiSupported ? "" : "none" );
			jQuery( ".midiNotSupportedMessage" ).css( "display", vars.midiSupported ? "none" : "" );
			
		},
		onRequestMidiAccessSuccess : function( vars ){
			jQuery( "#requestMIDIAccessSuccess" ).css( "display", "" );
			jQuery( "#midiPorts" ).css( "display", "" );
			
			if ( vars.midiSupported ){
				midiAccessApiDevicesChanged( vars );
			}
		},
		onRequestMIDIAccessFailure : function(){
			jQuery( "#requestMIDIAccessFailure" ).css( "display", "" );	
			jQuery( "#midiPorts" ).css( "display", "none" );	
		},
		deviceStateChangeCallback : function( midiPort, vars ){
			//console.log("Device state changed: "+midiPort.type+" "+midiPort.name+" "+midiPort.state);
			midiAccessApiDevicesChanged( vars );
		},
		portConnectedCallback : function( midiPort, vars ){
			//console.log("Port connected type: "+midiPort.type+", name: "+midiPort.name)
			midiAccessApiDevicesChanged( vars );
		},
		portDisconnectedCallback : function( midiPort, vars ){
			//console.log("Port disconnected type: "+midiPort.type+", name: "+midiPort.name)
			midiAccessApiDevicesChanged( vars );
		},
		receiveCallback : function( midiMessageEvent ){
			myMidiAccessApi.send( midiMessageEvent );
			logMidiInputEventArray( MIDIMessageEventParser.parseEvent( midiMessageEvent ) );
		},
		logLevel : jMidiAccessApi.LOG_LEVEL_ERROR
	});	
});


/** Redirect to https */
if ( location.hostname !== "localhost" ){
	if (location.protocol !== 'https:') {
		location.replace(`https:${location.href.substring(location.protocol.length)}`);
	}
}