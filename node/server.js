var http = require('http');

var url = require('url');

var fs = require('fs');

var mime = require('mime-types');

///// Create server
var server = http.createServer(function(req, res) {
	
	///// Requested ressource path
	var reqResPath = url.parse(req.url).pathname;
	
	
	///// Ressource path
	var resPath = reqResPath.substring(1);
	
	
	///// Check known ressource pathes
	if (reqResPath == '/' ) {
		resPath = "index.html";
	}
	

	///// Read ressource
	fs.readFile( resPath,function (err, data){
		if ( data != null ){
			
			///// Get ressource mime type
			var mimeType = mime.lookup( resPath );

			/////
			res.writeHead(200, {'Content-Type': mimeType,'Content-Length':data.length});
			res.write(data);			
		}
		else{
			/////
			res.writeHead(404, {"Content-Type": "text/plain"});
			res.write("404 Not Found\n");
  		}
  		
  		/////
		res.end();
    });
	
});
server.listen(8080);
