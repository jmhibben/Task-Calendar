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

let OAuth2 = google.auth.OAuth2
let calendar = google.calendar('v3')

// Server colors
let request = chalk.cyan
let success = request.bold
let failed = chalk.red
let error = failed.bold

let network = fs.createWriteStream(path.join(__dirname, 'network.json'), {flags: 'a'})
network.write(os.networkInterfaces())
network.close()
// console.log(os.networkInterfaces())

// body-parser setup for headers

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());

let port = process.env.PORT || 8079

// OAUTH2 INIT

let oauth_config = require('./client_secret')

let oauthClient = new OAuth2(
  oauth_config.web.client_id,
  oauth_config.web.client_secret,
  'http://127.0.0.1:8080/calendar'
)

// Calendar info

let _cal = {
  task_cal_id: null
}

// if any additional scopes are necessary, we can just add them to this
let scopes = ['https://www.googleapis.com/auth/calendar']

let url = oauthClient.generateAuthUrl({
  access_type: 'online', // explicitly declaring default
  scope: scopes
})

// ROUTING

let router = express.Router()

let _auth = {
  code: '',
  token: '',
  timeout: null,
  is_authorized () {
    return _auth.timeout !== null || Date.now() <= _auth.timeout
  }
}

// Activating CORS headers
let corsOptions = {
  origin: 'http://127.0.0.1:8080',
  credentials: true
}
router.use(cors(corsOptions))

// Logging
let requestLogStream = fs.createWriteStream(path.join(__dirname, 'logs/request.log'), {flags: 'a'})
let format = ':date[iso] :remote-addr -- :remote-user HTTP/:http-version :method :status :url :response-time ms'
router.use(morgan(format, {stream: requestLogStream}))

// router.use((req, res, next) => {
//   // general logger
//   console.log(request(`Request: ${req.method} -> ${req.path}`))
//   next()
// })

router.get('/', (req, res) => {
  res.json({
    message: 'Connection verified'
  })
})

// AUTHORIZATION

router.route('/auth')
  .get((req, res) => {
    res.send({
      authorized: _auth.is_authorized()
    })
    console.log(success('Client notified of authorization status'))
  })

router.route('/auth/url')
  .get((req, res) => {
    res.send({
      url: url
    })
    console.log(success('URL sent to client'))
  })

router.route('/auth/code/:code')
  // Returns HTML Status Code 204 on success
  .post((req, res) => {
    // console.log(req.params)
    _auth.code = req.params.code
    res.sendStatus(204)
    console.log(success('Auth code recieved'))
  })

router.route('/auth/token/:token')
  // Returns code 204 on success
  .post((req, res) => {
    _auth.token = req.params.token
    // _auth.timeout = Date.now() + req.params.expires_in
    res.sendStatus(204)
    console.log(success('Auth token recieved'))
  })

// add route to handle auth response

// CALENDARS

router.route('/cal')
  // Get a list of all calendars and return the Task calendar
  .get((req, res) => {
    // let cals = calendar.calendarList() // should be a JSON object- or can at least parse to one
    let cals = []
    for(c of cals) {
      if(c.summary === "Tasks") {
        _cal.task_cal_id = c.id
        break
      }
    }
    if(_cal.task_cal_id === null) {
      // we need to create the calendar here... AFTER the API is working
      res.send({
        error: 'Cannot find the Tasks calendar'
      })
    }
  })

// EVENTS

router.route('/events')
  .get((req, res) => {
    res.send({
      events: [],
      message: 'Events not yet implemented'
    })
    console.log(success('Sent calendar events'))
  })
  .post((req, res) => {
    // create the new task
    res.send({
      task_id: 'superfakeid'
    })
  })

router.route('/events/:date')
  .get((req, res) => {
    res.send({
      date: req.params.date
    })
    console.log(success('Sent calendar event'))
  })

// router.route('/month/:month')

// START SERVER

// server.set('trust proxy', 'http://127.0.0.1')

server.use('/api', router)

server.listen(port)
console.log(`Task Calendar API listening on port ${port}`)
