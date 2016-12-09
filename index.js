const phpApi = require( './lib/phpApi' );
const restApi = require( './lib/restApi' );

function respond( res, method ) {
  return method().then( function ( data ) {
    var responseText = JSON.stringify( data );
    res.status( 200 );
    res.send( responseText );
    return responseText;
  } ).catch( function ( error ) {
    var msg = error.toString();
    var code = 500;
    if ( msg.indexOf( 'Not logged in' ) > -1 ) {
      code = 401;
    } else if ( msg.indexOf( '404' ) > -1 ) {
      code = 404;
    }
    res.status( code );
    res.send( JSON.stringify( {
      msg: msg
    } ) );
  } );
}

function install(app, base) {
  base = base || '/api/wikimedia/';

  // expose php api
  app.all( base + ':host/api.php', ( req, res ) => {
    var options = req.method === 'GET' ? {} : { method: req.method };

    respond( res, function () {
      return new Promise( function ( resolve ) {
        resolve( phpApi( req.params.host, req.query, options, req.session ) )
      } );
    } );
  } );

  // expose restful api
  app.all( new RegExp( base + '([^/]*)/rest_v1/(.*)' ), ( req, res ) => {
    var options = req.method === 'GET' ? {} : { method: req.method };
    respond( res, function () {
      return new Promise( function ( resolve ) {
        resolve( restApi( req.params[0], req.params[1], options ) )
      } );
    } );
  } );
}


module.exports = install;