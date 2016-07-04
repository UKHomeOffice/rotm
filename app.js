'use strict';

const express = require('express');
const app = express();
const path = require('path');
const logger = require('./lib/logger');
const churchill = require('churchill');
const session = require('express-session');
const config = require('./config');

require('moment-business');

if (config.env !== 'ci') {
  app.use(churchill(logger));
}

app.use('/public', express.static(path.resolve(__dirname, './public')));

app.use((req, res, next) => {
  req.baseUrl = config.siteroot + req.baseUrl;
  res.locals.assetPath = config.siteroot + '/public';
  res.locals.gaTagId = config.ga.tagId;
  next();
});

app.set('view engine', 'html');

const template = require('hof').template;
template.setup(app, {
  path: config.siteroot + '/govuk-assets'
});

app.set('views', path.resolve(__dirname, './apps/common/views'));
app.enable('view cache');
app.use(require('express-partial-templates')(app));
app.engine('html', require('hogan-express-strict'));

app.use(require('body-parser').urlencoded({extended: true}));
app.use(require('body-parser').json());

app.use((req, res, next) => {
  res.locals.baseUrl = req.baseUrl;
  next();
});

// Redis session storage
logger.info('connecting to redis on ', config.redis.port, config.redis.host);
const redis = require('redis');
const RedisStore = require('connect-redis-crypto')(session);
const client = redis.createClient(config.redis.port, config.redis.host);

client.on('error', (e) => logger.error(e));

const redisStore = new RedisStore({
  client,
  ttl: config.session.ttl,
  secret: config.session.secret
});

function secureCookies(req, res, next) {
  const cookie = res.cookie.bind(res);
  res.cookie = (name, value, options) => {
    options = options || {};
    options.secure = (req.protocol === 'https');
    options.httpOnly = true;
    options.path = '/';
    cookie(name, value, options);
  };
  next();
}

app.use(require('cookie-parser')(config.session.secret));
app.use(secureCookies);

const sessionOpts = Object.assign({
  store: redisStore,
  name: config.session.name,
  cookie: {secure: config.protocol === 'https'},
  secret: config.session.secret,
  saveUninitialized: true,
  resave: true
}, config.session);

app.use(session(sessionOpts));

// apps
app.use(require('./apps/rtm/'));

app.get('/cookies', (req, res) => res.render('cookies'));
app.get('/terms-and-conditions', (req, res) => res.render('terms'));

// errors
app.use(require('hof').middleware.errors({
  logger: require('./lib/logger'),
  translate: require('hof').i18n.translate,
  debug: config.env === 'development'
}));

// eslint-disable-next-line camelcase
app.listen(config.port, config.listen_host);
logger.info('App listening on port', config.port);
