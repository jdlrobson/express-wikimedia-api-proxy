const fetch = require('node-fetch');
const isValidHost = require('./is-valid-host');

module.exports = function ( host, path, options ) {
  path = path || '';
  if ( isValidHost(host) ) {
    var url = 'https://' + host + '/api/rest_v1/' + path;

    if ( options.body ) {
      options.body = JSON.stringify( options.body );
    }
    options.headers = { 'Content-Type': 'application/json' };
    return fetch(url, options).then(function (resp) {
      var type = resp.headers.get('content-type') || 'text';
      if ( type.indexOf( 'text/' ) > -1 ) {
        return resp.text().then( (text) => {
          return { text: text };
        });
      } else {
        return resp.json();
      }
    });
  } else {
    throw 'Unknown host.';
  }
};
