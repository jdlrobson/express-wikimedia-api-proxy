# express-wikimedia-api-proxy

- [ ]  Building an express Node.js app?
- [ ] Want to make use of Wikipedia's APIs
- [ ] Don't want to worry about CORs requests?
- [ ] Need something compatible with oauth for API requests which need credentials?

If yes to the above look no further. This simple module is designed to plug into your express app
and give you access to Wikimedia's many APIs. That includes Wikipedia, Wiktionary, Wikivoyage and many more.

All APIs available @
* https://en.m.wikipedia.org/wiki/Special:ApiSandbox
* https://en.wikipedia.org/api/rest_v1/
will be available in your web app for all languages and projects.

## how to use!
```
  const express = require('express');
  const wikiApis = require('express-wikimedia-api-proxy');
  const app = express();
  const cors = require('cors');
  const PORT = app.get( 'port' ) || 8145;

  const base = '/api/wikimedia/';

  wikiApis(app, base, true);
  app.use(cors())
  app.listen(PORT)
  console.log('The APIs are exposed at port:', PORT)
  console.log('http://localhost:' + PORT + base + 'en.wikipedia.org/api.php');
  console.log('http://localhost:' + PORT + base + 'en.wikipedia.org/rest_v1/');
```
