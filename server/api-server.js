const express = require('express')
let server = express()
let cors = require('cors')
let bodyParser = require('body-parser')
const google = require('googleapis')
const chalk = require('chalk')
const os = require('os')
const fs = require('fs')
const path = require('path')
let morgan = require('morgan')
let Loggerr = require('loggerr')

let OAuth2 = google.auth.OAuth2

let generateLogStream = (fileName) => {
  return fs.createWriteStream(fileName, {
    flags: 'a',
    encoding: 'utf8'
  })
}

let debugLog = generateLogStream('./debug.log')
let infoLog  = generateLogStream('./info.log')
let warnLog  = generateLogStream('./warn.log')
let errLog   = generateLogStream('./error.log')
let fullLog  = generateLogStream('./full.log')

// Server colors
let error = chalk.red.bold
let warn = chalk.red
let info = chalk.cyan
let debug = chalk.green.bold

const l = {
  emergency: Loggerr.EMERGENCY,
  alert: Loggerr.ALERT,
  critical: Loggerr.CRITICAL,
  error: Loggerr.ERROR,
  warning: Loggerr.WARNING,
  notice: Loggerr.NOTICE,
  info: Loggerr.INFO,
  debug: Loggerr.DEBUG
}

let sepLogger = new Loggerr({
  streams: Loggerr.levels.map((level) => {
    let outStream
    switch (Loggerr.levels.indexOf(level)) {
      case l.emergency:
      case l.alert:
      case l.critical:
      case l.error:
        outStream = errLog
      case l.warning:
      case l.notice:
        outStream = infoLog
      case l.info:
        outStream = infoLog
      case l.debug:
      default:
        outStream = debugLog
    }
    return outStream
  })
})
let fullLogger = new Loggerr({
  streams: fullLog
})
let consoleLogger = new Loggerr({
  streams: console.log,
  formatter: Loggerr.levels.map((date, level, data) => {
    let color
    switch (Loggerr.levels.indexOf(level)) {
      case l.emergency:
      case l.alert:
      case l.critical:
      case l.error:
        color = error
      case l.warning:
      case l.notice:
        color = warn
      case l.info:
        color = info
      case l.debug:
      default:
        color = debug
    }
    return color(date + ': ' + data.msg)
  })
})

let log = (level, message) => {
  switch (level) {
    case l.emergency:
    case l.alert:
    case l.critical:
    case l.error:
      fullLogger.error(message)
      sepLogger.error(message)
      consoleLogger.error(message)
      console.log(error(message))
      break
    case l.warning:
    case l.notice:
      fullLogger.warning(message)
      sepLogger.warning(message)
      consoleLogger.warning(message)
      console.log(warn(message))
      break
    case l.info:
      fullLogger.info(message)
      sepLogger.info(message)
      consoleLogger.info(message)
      console.log(info(message))
      break
    case l.debug:
    default:
      fullLogger.debug(message)
      sepLogger.debug(message)
      consoleLogger.debug(message)
      console.log(debug(message))
      break
  }
}

log(l.info, 'Opening Programmer\'s Box...')
// body-parser setup for headers
log(l.debug, 'Giving body parser a magnifying glass...')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());

log(l.debug, 'Scoping out a port...')
let port = process.env.PORT || 8079

// OAUTH2 INIT
log(l.info, 'Hiring OAuth2...')
let oauth_config = require('./client_secret')
log(l.debug, 'Giving client its authorization media...')
// Postman Client returns data as expected through this configuration
let oauthClient = new OAuth2(
  oauth_config.web.client_id,
  oauth_config.web.client_secret,
  // `http://${network.interfaces[network.key][network.index].address}${network.port}/calendar`
  // 'http://127.0.0.1:8080/calendar'
  'http://localhost:8080/login'
)

// if any additional scopes are necessary, we can just add them to this
let scopes = [
  'https://www.googleapis.com/auth/calendar'
  // ,'https://www.googleapis.com/auth/profile']
]
log(l.debug,'Locating client\'s place of consent...')
let url = oauthClient.generateAuthUrl({
  access_type: 'online', // explicitly declaring default
  scope: scopes
})

log(l.debug, 'Prepping authorization locker...')
let _auth = {
  tokenSet: false,
  timeout: null,
  is_authorized () {
    return _auth.tokenSet
  }
}

// ROUTING
log(l.info, 'Pressing Router\'s power button...')
let router = express.Router()

// Activating CORS headers
log(l.debug, 'Selecting CORS Lite...')
let corsOptions = {
  // origin: `http://${network.interfaces[network.key][network.index]}${network.port}`,
  // origin: 'http://localhost:8080',
  origin: true,
  credentials: true
  // optionsSuccessStatus: 200
}
log(l.debug, 'Giving Router a CORS Lite...')
router.use(cors(corsOptions))

// CALENDAR
log(l.info, 'Looking for calendar...')
let calendar = google.calendar({
  version: 'v3'
})
// Calendar info
log(l.debug, 'Keeping Cal out- lost its ID')
let _calId = null

// Logging
log(l.info, 'Prodding Morgan into life...')
let requestLogStream = fs.createWriteStream(path.join(__dirname, 'logs/request.log'), {flags: 'a'})
let format = ':date[iso] :remote-addr -- HTTP/:http-version :method :status :url :response-time ms'
router.use(morgan(format, {stream: requestLogStream}))

log(l.info, 'Trying to confuse Router with weird directions...')
router.get('/', (req, res) => {
  log(l.debug, 'Client requesting connection verification')
  res.send({
    message: 'Connection verified'
  })
  log(l.debug, 'Connection verification sent')
})

// AUTHORIZATION

router.route('/auth')
  .get((req, res) => {
    log(l.debug, 'Client requesting auth verification')
    res.send({
      authorized: _auth.is_authorized()
    })
    log(l.debug, 'Auth verification sent')
  })

router.route('/auth/url')
  .get((req, res) => {
    log(l.debug, 'Client requesting auth URL')
    res.send({
      url: url
    })
    log(l.debug, 'Auth URL sent')
  })

router.route('/auth/code/:code')
  // Returns HTML Status Code 204 on success
  .post((req, res) => {
    log(l.debug, 'Client sent auth code')
    // _auth.code = req.params.code
    log(l.debug, 'Getting the token from Google...')
    oauthClient.getToken(req.params.code, (err, tokens) => {
      if (err) {
        log(l.error, 'Unable to get the auth token:')
        log(l.error, err)
      }
      log(l.debug, 'Got response:')
      log(l.debug, tokens)
      oauthClient.setCredentials({
        access_token: tokens
      })
      log(l.debug, 'Setting registered auth client..')
      google.options({
        auth: oauthClient
      })
      log(l.info, 'Auth token(s) stored')
    })
    res.sendStatus(204)
  })

router.route('/auth/token/:token')
  // Returns code 204 on success
  .post((req, res) => {
    log(l.info, 'Setting OAuth2 credentials')
    oauthClient.setCredentials({
      access_token: req.params.token
    })
    google.options({
      auth: oauthClient
    })
    _auth.tokenSet = true
    // _auth.timeout = Date.now() + req.params.expires_in
    log(l.info, 'Auth token recieved')
    res.sendStatus(204)
  })

// add route to handle auth response

// CALENDARS

router.route('/cal')
  // Get a list of all calendars and return the Task calendar
  .get((req, res) => {
    log(l.info, 'Requesting calendar list from Google')
    let cals = calendar.calendarList.list({
      auth: oauthClient
    }, (err, response) => {
      if (err) {
        log(l.error, `There was a problem getting the calendar list from Google:`)
        log(l.error, err)
      }
      log(l.debug, 'Response recieved:')
      log(l.debug, response)
    }) // should be a JSON object- or can at least parse to one
    log(l.debug, 'Attempt complete.')
    // let cals = []
  //   for(let c of cals) {
  //     if(c.summary === "Tasks") {
  //       _cal.task_cal_id = c.id
  //       break
  //     }
  //   }
  //   if(_cal.task_cal_id === null) {
  //     // we need to create the calendar here... AFTER the API is working
  //     res.send({
  //       error: 'Cannot find the Tasks calendar'
  //     })
  //   }
  })

// EVENTS

router.route('/events')
  .get((req, res) => {
    log(l.info, 'Client requesting events list')
    res.send({
      events: [],
      message: 'Events not yet implemented'
    })
    log(l.info, 'Calendar events sent')
  })
  .post((req, res) => {
    // create the new task
    log(l.info, 'Creating new event')
    res.send({
      task_id: 'superfakeid'
    })
    log(l.info, 'New event created')
  })

router.route('/events/:date')
  .get((req, res) => {
    log(l.info, `Client requesting events for ${req.params.date}`)
    res.send({
      date: req.params.date
    })
    log(l.info, 'Sent calendar event')
  })

// router.route('/month/:month')

// START SERVER

// server.set('trust proxy', 'http://127.0.0.1')

server.use('/api', router)
log(l.info, 'Unable to confuse Router.')

server.listen(port)
log(l.info, `Router started server at http://localhost:${port}`)
