const fetch = require('node-fetch');
const isValidHost = require('./is-valid-host');

module.exports = function ( host, path, options ) {
  path = path || '';
  if ( isValidHost(host) ) {
    var url = 'https://' + host + '/api/rest_v1/' + path;
    if ( url[url.length-1] !== '/' ) {
      url += '/';
    }
    return fetch(url, options).then(function (resp) {
      return resp.json();
    });
  } else {
    throw 'Unknown host.';
  }
};
