import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import htmlMetaTags from 'html-meta-tags';
import compression from 'compression';
import * as fs from "fs";

const config = require('./env.js').get(process.env.NODE_ENV);
const app = express();
const log = console.log;
const port = process.env.PORT || 4000;

// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors());
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser());
// Use gzip compression
app.use(compression());

/**
 * API calls, use Postman for testing
 * This block should declare before default route
 */
app.get('/api/about', function (req, res) {
  res.json({'about': 'https://nhancv.github.io'});
});


/**
 * Config default route to single page reactJS app
 */
// For frontend route
const frontendDir = path.join(path.dirname(__dirname), 'client');
// Serve any static files.
app.use('/pub', express.static(frontendDir));
// Handle React routing, return all requests to React app
app.get('*', function (req, res) {
  //https://www.npmjs.com/package/html-meta-tags
  const seoTAG = htmlMetaTags({
    "keywords": ["nhancv", "reactjs", "nodejs", "expressjs"],
    "description": `Treact Template ${new Date()}`,
    "path": `${req.path}`,
  }, {shouldIgnoreCharset: true});
  let data = fs.readFileSync(path.join(frontendDir, 'index.html'), 'utf8')
    .replace('<meta name="SEO_HERE">', seoTAG);
  res.send(data);
});


/**
 * Start listen
 */
app.listen(port, function () {
  log('Server listening at port %d', port);
});

log(config);
