import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const config = require('./env.js').get(process.env.NODE_ENV);
const app = express();
const log = console.log;
const port = process.env.PORT || 4000;

// Body parser: https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// CORS on ExpressJS: https://github.com/expressjs/cors
app.use(cors());
// Cookie parser: https://github.com/expressjs/cookie-parser
app.use(cookieParser());

// For fontend route
var frontendDir = path.join(path.dirname(path.dirname(__dirname)), 'frontend');
app.use('/home', express.static(path.join(frontendDir, 'build')));
app.get('/home', function(req, res) {
  res.sendFile(path.join(frontendDir, 'build', 'index.html'));
});
app.get('/', function(req, res) {
  res.redirect('/home');
});

app.listen(port, function() {
  log('Server listening at port %d', port);
});

log(config);
