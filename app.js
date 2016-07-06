const path = require('path');
const express = require('express');
const jade = require('jade');
const mongodb = require('mongodb');
const camo = require('camo');
const initDb = require('./data');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const expressMessages = require('express-messages');
const env = require('./env');

const routes = require('./routes/index');
const articles = require('./routes/articles');
const categories = require('./routes/categories');
const manage = require('./routes/manage');


// Camo ODM Connection
const dbUri = 'mongodb://localhost:27017/sportsblog';
let database;
camo.connect(dbUri).then((db) => {
  database = db;
  initDb();
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
