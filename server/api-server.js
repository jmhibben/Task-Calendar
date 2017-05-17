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
// let Loggerr = require('loggerr')
let moment = require('moment')

let OAuth2 = google.auth.OAuth2

let l = {
  debug: 0,
  trace: 1,
  info: 2,
  log: 3,
  warn: 4,
  error: 5
}

let log = require('tracer').dailyfile({
  root: 'server/logs',
  maxLogFiles: 10,
  allLogsFileName: 'full',
  format: [
    '{{timestamp}} : {{file}}:{{line}} > {{title}} -- {{message}}',
    {
      error: '{{timestamp}} : {{file}}:{{line}} > {{title}} -- {{message}}\nCall Stack:\n{{stack}}'
    }
  ],
  dateformat: 'hh:MM:ss.l tt'
})

log.info('Opening Programmer\'s Box...')
// body-parser setup for headers
log.debug('Giving body parser a magnifying glass...')
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());

log.debug('Scoping out a port...')
let port = process.env.PORT || 8079

// OAUTH2 INIT
log.info('Hiring OAuth2...')
let oauth_config = require('./client_secret')
log.debug('Giving client its authorization media...')
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
log.debug('Locating client\'s place of consent...')
let url = oauthClient.generateAuthUrl({
  access_type: 'online', // explicitly declaring default
  scope: scopes
})

log.debug('Prepping authorization locker...')
let _auth = {
  token: null,
  timeout: null,
  user: null,
  is_authorized () {
    return this.token != null
  },
}

// ROUTING
log.info('Pressing Router\'s power button...')
let router = express.Router()

// Activating CORS headers
log.debug('Selecting CORS Lite...')
let corsOptions = {
  // origin: `http://${network.interfaces[network.key][network.index]}${network.port}`,
  // origin: 'http://localhost:8080',
  origin: true,
  credentials: true
  // optionsSuccessStatus: 200
}
log.debug('Giving Router CORS Lite...')
router.use(cors(corsOptions))

// CALENDAR
log.info('Looking for Calendar...')
let calendar = google.calendar({
  version: 'v3'
})
// Calendar info
log.debug('Keeping Calendar out- knows its age, but lost its ID')
let now = moment()
let _cal = {
  id: null,
  month: now.month(), // default
  year: now.year(), //default
  events: {} // will store `moment(<date>).format('MM-DD-YY'): _event.id` pairs
}

// People info
log.debug('Checking if Router is a People person')
let people = google.people({
  version: 'v1'
})

log.debug('Router wants to know why nobody likes them')
let _user = null

// Logging
log.info('Prodding Morgan into life...')
let requestLogStream = fs.createWriteStream(path.join(__dirname, 'logs/request.log'), {flags: 'a'})
let format = ':date[iso] :remote-addr -- HTTP/:http-version :method :status :url :response-time ms'
router.use(morgan(format, {stream: requestLogStream}))

log.info('Trying to confuse Router with weird directions...')
router.get('/', (req, res) => {
  log.info('Client requesting connection verification')
  res.send({
    message: 'Connection verified'
  })
  log.info('Connection verification sent')
})

// AUTHORIZATION

router.route('/auth')
  .get((req, res) => {
    log.info('Client requesting auth verification')
    res.send({
      authorized: _auth.is_authorized()
    })
    log.info('Auth verification sent')
  })

router.route('/auth/url')
  .get((req, res) => {
    log.info('Client requesting auth URL')
    res.send({
      url: url
    })
    log.info('Auth URL sent')
  })
// TODO: refactor for using request body to contain code, rather than the route
router.route('/auth/code')
  // Returns HTML Status Code 204 on success
  .post((req, res) => {
    log.info('Client sent auth code')
    // log.debug('Auth request:\n', req)
    let code = req.headers.referer.split('=')[1]
    log.debug('Auth code:\n', code)
    log.info('Getting the token from Google...')
    oauthClient.getToken(code, (err, tokens) => {
      if (err) {
        log.error('Unable to get the auth token:', err)
        res.sendStatus(404)
      }
      log.debug('Got response:', tokens)
      oauthClient.setCredentials({
        access_token: tokens.access_token
      })
      log.info('Setting registered auth client..')
      google.options({
        auth: oauthClient
      })
      log.info('Auth token(s) stored')
      res.sendStatus(204)
    })
  })

// CALENDARS

router.route('/cal')
  // Get a list of all calendars and return the Task calendar if it exists
  .get((req, res) => {
    log.info('Requesting calendar list from Google')
    calendar.calendarList.list({
      auth: oauthClient
    }, (err, response) => {
      if (err) {
        log.error(`There was a problem getting the calendar list from Google:`, err)
        res.sendStatus(400)
        // log.error(err)
      }
      // log.debug('Calendar response recieved', response.items)
      for (let cal of response.items) {
        if (cal.primary === true) {
          log.debug('Primary calendar: ', cal)
          _cal.id = cal.id
          res.send({calendar: cal.id})
        }
      }
    }) // should be a JSON object- or can at least parse to one
    log.debug('Attempt complete.')
  })
  .post((req, res) => {
    log.info('Client requesting creation of Tasks calendar')
    calendar.calendars.insert({
      summary: 'Tasks'
    }, (err, response) => {
      if (err) {
        log.error('An error occurred while creating the Tasks calendar:', err)
        // log.error(err)
        res.send({
          status: 418,
          error: err,
          message: 'Tasks calendar could not be created'
        })
      }
      log.debug('Calendar creation response:', response)
      // log.debug(response)
      res.sendStatus(204)
    })
  })

// router.route('/cal/:cal_id')
//   .get((req, res) => {
//     log.debug('Client requesting calendar', req.params)
//   })

// EVENTS

router.route('/events')
  .get((req, res) => {
    log.info('Client requesting events list')
    calendar.events.list({
      auth: oauthClient,
      calendarId: 'primary',
      singleEvents: true,
      timeMin: moment(`${_cal.year}/${_cal.month}`).toISOString(),
      orderBy: 'startTime'
    }, (err, response) => {
      if (err) {
        log.error('Unable to get the events list: ', err)
        res.sendStatus(400)
      }
      log.debug('Fetching and filtering events')
      let events = {}
      log.debug('Cal:', _cal)
      for(let event of response.items) {
        // log.debug(event)
        let date = moment(event.start.dateTime)
        // log.debug('Date: ', date)
        if (date.format('M-YYYY') === `${_cal.month}-${_cal.year}`) {
          log.debug('Date matches criteria')
          let day = date.format('M-D')
          if (events[day] === undefined) {
            events[day] = []
          }
          events[day].push(event.id)
        }
      }
      log.debug('Event list: ', events)
      if (events.length === 0) {
        res.send({
          events: null,
          message: 'No events found'
        })
      } else {
        res.send({
          events: events
        })
      }
    })
    // res.send({
    //   events: [],
    //   message: 'Events not yet implemented'
    // })
    log.info('Calendar events sent')
  })
  .post((req, res) => {
    // create the new task
    log.info('Creating new event')
    res.send({
      task_id: 'superfakeid'
    })
    log.info('New event created')
  })

router.route('/events/event/:id')
  .get((req, res) => {
    let id = req.params.id
    calendar.events.get({
      auth: oauthClient,
      calendarId: _cal.id,
      eventId: id
    }, (err, response) => {
      if (err) {
        log.error('There was an error fetching the event: ', err)
        res.sendStatus(400)
      }
      log.debug('Event found: ', response)
      res.send({
        event: response
      })
      log.info('Event sent to client')
    })
  })

router.route('/events/:date')
  .get((req, res) => {
    log.info(`Client requesting events for ${req.params.date}`)
    res.send({
      date: req.params.date
    })
    log.info('Sent calendar events')
  })

// USER

router.route('/user')
  // get the user's information
  .get((req, res) => {
    // fetch a fresh copy of the GoogleUser object
    // serve it to the client
    log.info('Client requesting User object')
    let me
    people('people/me',
      (err, response) => {
        if (err) {
          log.error('There was a problem getting the User object from Google:')
          log.error(err)
        }
        log.debug('User response recieved:')
        log.debug(response)
        // res.send(response)
      })
    res.send({
      user: me})
  })
  .post((req, res) => {
    log.info('Client sending user data')
    log.debug(req)
  })

// START SERVER

// server.set('trust proxy', 'http://127.0.0.1')

server.use('/api', router)
log.info('Unable to confuse Router.')

server.listen(port)
log.info(`Router started server at http://localhost:${port}`)
