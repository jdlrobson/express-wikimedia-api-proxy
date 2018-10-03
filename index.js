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

function install(app, base, doNotFlattenResponses) {
  base = base || '/api/wikimedia/';

  // expose php api
  app.all( base + ':host/api.php', ( req, res ) => {
    var options = req.method === 'GET' ? {} : { method: req.method };

    respond( res, function () {
      return new Promise( function ( resolve ) {
        let query = req.query;
        if ( req.body ) {
          query = Object.assign( {}, query, req.body);
        }
        resolve( phpApi( req.params.host, query, options, req.user, doNotFlattenResponses ) )
      } );
    } );
  } );

  // expose restful api
  app.all( new RegExp( base + '([^/]*)/rest_v1/(.*)' ), ( req, res ) => {
    var options = req.method === 'GET' ? {} : { method: req.method };
    respond( res, function () {
      return new Promise( function ( resolve ) {
        if ( req.body ) {
          options.body = req.body;
        }
        resolve( restApi( req.params[0], req.params[1], options ) )
      } );
    } );
  } );
}


module.exports = install;