/*
 * MIT License
 *
 * Copyright (c) 2018 Nhan Cao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import htmlMetaTags from 'html-meta-tags';
import compression from 'compression';
import * as fs from "fs";
import * as ENV from "./env";
import * as Controller from "./controller";

const config = ENV.get();
const app = express();
const log = console.log;
const port = process.env.PORT || 4000;

//////////////////////////////////////////////////////////////////
/**
 * Config app
 */
// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors());
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser());
// Use gzip compression
app.use(compression());

//////////////////////////////////////////////////////////////////
/**
 * Declare controller
 */
const aboutController: Controller.IAbout = new Controller.About();

/**
 * API calls, use Postman for testing
 * This block should declare before default route
 */
//About module
app.get('/api/about', aboutController.getAbout);


//////////////////////////////////////////////////////////////////
/**
 * Config default route to single page reactJS app
 */
// For frontend route
const frontendDir = path.join(path.dirname(__dirname), 'client');
// Serve any static files.
app.use('/pub', express.static(frontendDir));
// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
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
app.listen(port, () => {
  log('Server %s listening at port %d', config.env, port);
});
