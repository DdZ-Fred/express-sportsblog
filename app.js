import path from 'path';
import express from 'express';
import jade from 'jade';
import mongodb from 'mongodb';
import camo from 'camo';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import flash from 'connect-flash';
import expressMessages from 'express-messages';
import env from './env';

import routes from './routes/index';
import articles from './routes/articles';
import categories from './routes/categories';
import manage from './routes/manage';


// Camo ODM Connection
const dbUri = 'mongodb://localhost/sportsblog';
let db;
camo.connect(dbUri).then((database) => {
  db = database;
});

const app = express();

// View engines & Views folder
app.set('views', './views');
app.set('view engine', 'jade');


/* **************** *
      MIDDLEWARES
 * **************** */

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

// !!! cookie-parser & session must use the same secret to prevent issues
app.use(cookieParser(env.COOKIE_SESSION_SECRET));

// SessionStore use its own connection!!!!!!!
// TODO: Try to use to same connection for SessionStore and Camo
app.use(session({
  secret: env.COOKIE_SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: dbUri,
  }),
}));

// Provide to all requests the flash() function which allows to send flash messages
// req.flash('messageType', 'messageText')
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});


/* *************** *
    PUBLIC ASSETS
 * *************** */

app.use(express.static(path.join(__dirname, 'public')));


/* *********** *
      ROUTES
 * *********** */

app.use('/', routes);
app.use('/articles', articles);
app.use('/categories', categories);
app.use('/manage', manage);

const server = app.listen(env.PORT, () => {
  console.log(`Server is now listening on locahost:${env.PORT}`);
});
