'use strict';

const express = require('express');
const hof = require('hof');
const path = require('path');
const redis = require('redis');
const connectRedisCrypto = require('connect-redis-crypto');
const churchill = require('churchill');
const session = require('express-session');
const expressPartialTemplates = require('express-partial-templates');
const hoganExpressStrict = require('hogan-express-strict');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('hof-logger')();

const config = require('./config');
const rtm = require('./apps/rtm/');

const i18n = hof.i18n({
  path: path.resolve(__dirname, './apps/common/translations/__lng__/__ns__.json')
});

i18n.on('ready', () => {
  const app = express();

  app.use((req, res, next) => {
    req.logger = logger;
    next();
  });

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

  const template = hof.template;
  template.setup(app, {
    path: config.siteroot + '/govuk-assets'
  });

  app.set('views', [
    path.resolve(__dirname, './apps/common/views'),
    require('hof-template-partials').views
  ]);
  app.enable('view cache');
  app.use(expressPartialTemplates(app));
  app.engine('html', hoganExpressStrict);

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.locals.baseUrl = req.baseUrl;
    next();
  });

  // Trust proxy for secure cookies
  app.set('trust proxy', 1);

  // Redis session storage
  logger.info('connecting to redis on ', config.redis.port, config.redis.host);
  const RedisStore = connectRedisCrypto(session);
  const client = redis.createClient(config.redis.port, config.redis.host);

  client.on('error', e => logger.error(e));

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

  app.use(cookieParser(config.session.secret));
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
  app.use(rtm);

  app.get('/cookies', (req, res) => res.render('cookies'));
  app.get('/terms-and-conditions', (req, res) => res.render('terms'));

  // errors
  app.use(hof.middleware.errors({
    logger,
    translate: i18n.translate.bind(i18n),
    debug: config.env === 'development'
  }));

  // eslint-disable-next-line camelcase
  app.listen(config.port, config.listen_host);
  logger.info('App listening on port', config.port);
});
