const SPECIAL_PROJECTS = [ 'species', 'commons', 'meta' ];
const ALL_PROJECTS = [ 'wikipedia', 'wikivoyage', 'wiktionary',
  'wikisource', 'wikiquote', 'wikinews', 'wikibooks', 'wikiversity' ].concat( SPECIAL_PROJECTS );

module.exports = function ( host ) {
  var parts = host.split('.');
  if ( parts.length === 3 ) {
    var isOrg = parts[2] === 'org';
    var isSpecialProject = parts[1] === 'wikimedia' && SPECIAL_PROJECTS.indexOf( parts[0] ) > -1;
    var isOtherProject = ALL_PROJECTS.indexOf( parts[1] ) > -1;
    return isOrg && ( isOtherProject || isSpecialProject );
  } else {
    return false;
  }
};
