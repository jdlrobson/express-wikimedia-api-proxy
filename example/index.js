const express = require('express')
const wikiApis = require('../')
const app = express();
const PORT = app.get( 'port' ) || 8145;

const base = '/api/wikimedia/';

wikiApis(app, base);
app.listen(PORT)
console.log('The APIs are exposed at port:', PORT)
console.log('http://localhost:' + PORT + base + 'en.wikipedia.org/api.php');
console.log('http://localhost:' + PORT + base + 'en.wikipedia.org/rest_v1/');

console.log('Allow authenticated API requests by assigning req.session an oauth profile')