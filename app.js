import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import expressValidator from 'express-validator';
import flash from 'connect-flash';
import path from 'path';
import jade from 'jade';
import mongodb from 'mongodb';
const MongoStore = require('connect-mongo')(session);
import env from './env';

// import Routes here

const app = express();

// View engines & Views folder
app.set('views', './views');
app.set('view engine', 'jade');

// Middlewares
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(expressValidator({
  errorFormatter(param, msg, value) {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += `[${namespace.shift()}]`;
    }
    return {
      param: formParam,
      msg,
      value,
    };
  },
}));
app.use(cookieParser(env.COOKIE_SECRET));

// SessionStore use its own connection!!!!!!!
app.use(session({
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://localhost/sportsblog',
  }),
}));

// Public assets
app.use(express.static(path.join(__dirname, 'public')));


// Use routes here

const server = app.listen(env.PORT, () => {
  console.log(`Server is now listening on locahost:${env.PORT}`);
});
