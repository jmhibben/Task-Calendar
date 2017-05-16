import Vue from 'vue'
import Vuex from 'vuex'
import chalk from 'chalk'
import Loggerr from 'loggerr'

// This lets us pass the store object through the entire app as `this.$state`
Vue.use(Vuex)

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

let logger = new Loggerr({
  streams: Loggerr.levels.map(() => {
    return process.stdout
  }),
  formatter: Loggerr.levels.map((date, level, data) => {
    let color
    switch (Loggerr.levels.indexOf(level)) {
      case l.emergency:
      case l.alert:
      case l.critical:
      case l.error:
        color = error
        break
      case l.warning:
      case l.notice:
        color = warn
        break
      case l.info:
        color = info
        break
      case l.debug:
      default:
        color = debug
    }
    return color(date + ': ' + data.msg)
  })
})

const apihost = 'http://localhost:8079/api'

export default new Vuex.Store({
  state: {
    // initially set to null- there's no way we can know what these will be ahead of time
    auth: {
      url: null,
      tokenSet: false
    },
    user: null,
    calendar: {
      id: null,
      events: {},
      month: null,
      year: null
    }
    // authClient: oauthClient
  },
  getters: {
    getCalendar: (state) => {
      return state.calendar
    },
    getUser: (state) => {
      return state.user
    },
    isAuthenticated: (state) => {
      return state.auth.tokenSet
    }
  },
  // Mutations MUST be called in synchronous code
  // For async calls, use actions
  mutations: {
    // If a second parameter is supplied here, then the second parameter will be treated as an object internally

    // Uses the auth code provided by OAuth redirected back to the app
    // We're storing this to ensure that we can refresh the token if necessary
    setAuthUrl: (state, auth) => {
      // logger.debug(auth)
      state.auth.url = auth.url
    },
    setCalendar: (state, cal) => {
      state.calendar.id = cal
    },
    setCalendarEvents: (state, events) => {
      state.calendar.events = events
    },
    setTokenRecieved: (state) => {
      state.auth.tokenSet = true
    },
    setUser: (state, user) => {
      state.user = user
    }
  },
  // Using argument destructuring in actions to simplify use
  // -> `commit` instead of `context.commit`
  actions: {
    // See these for more information on dispatching actions:
    //  https://vuex.vuejs.org/en/actions.html#dispatching-actions
    //  https://vuex.vuejs.org/en/actions.html#dispatching-actions-in-components
    apiShowLogin ({ commit, state }) {
      // let xhr = sendRequest('GET', '/auth/url')
      // setImmediate(xhr)
      // console.log(xhr)
      if (state.auth.url !== null) {
        logger.info('Already have consent URL')
        return
      }
      let xhr = new XMLHttpRequest()

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          logger.debug(xhr)
          logger.debug(xhr.responseText)
          let response = JSON.parse(xhr.responseText)
          logger.debug(response)
          commit('setAuthUrl', response)
        }
      })

      xhr.open('GET', `${apihost}/auth/url`, false)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send()
    },
    apiSetToken ({ commit }, authCode) {
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 204) {
          console.log(xhr.response)
          commit('setTokenRecieved')
        }
      })

      xhr.open('POST', `${apihost}/auth/code/`, false)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send(`code=${authCode}`)
    },
    apiGetUser ({ commit, state }) {
      let count = 0
      while (state.auth.tokenSet === false) {
        if (++count === 1000) break
      }
      if (!state.auth.tokenSet) {
        logger.warning('Unable to verify token')
        return
      }
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          logger.debug('User response recieved')
          logger.debug(xhr.responseText)
          // commit('setUser')
        }
      })

      xhr.open('GET', `${apihost}/user`, false)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send()
    },
    apiGetTaskCalendar ({ commit }) {
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', () => {
        if (xhr.status === 418) {
          logger.warning('No Tasks calendar found')
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
          logger.debug('Calendar response recieved: ', xhr.responseText)
          // commit('setCalendar')
          let cal = JSON.parse(xhr.responseText)
          logger.debug('Parsed calendars: ', cal)
          commit('setCalendar', cal.calendar)
        }
      })

      xhr.open('GET', `${apihost}/cal`, false)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send()
    },
    apiCreateTaskCalendar ({ commit }) {
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', () => {
        if (xhr.status === 418) {
          logger.debug('No Tasks calendar found')
        }
        if (xhr.readyState === 4 && xhr.status === 200) {
          logger.debug('Calendar response recieved', xhr.responseText)
          // commit('setCalendar')
        }
      })

      xhr.open('POST', `${apihost}/cal`, false)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send()
    },
    apiGetCalendarEvents ({ commit, state }) {
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          logger.debug('Events recieved: ', xhr.responseText)
          console.debug('Events recieved: ', xhr.responseText)
          let events = JSON.parse(xhr.responseText)
          commit('setCalendarEvents', events.events)
        }
      })

      xhr.open('GET', `${apihost}/events`)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send()
    },
    apiGetEventDetails ({ commit }, eid) {
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          logger.debug('Events recieved: ', xhr.responseText)
          console.debug('Events recieved: ', xhr.responseText)
          let events = JSON.parse(xhr.responseText)
          commit('setCalendarEvents', events)
        }
      })

      xhr.open('GET', `${apihost}/events/event/${eid}`)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send()
    }
  }
})

// function sendRequest (method, path) {
//   let api = `${apihost}/api`
//   let xhr = new XMLHttpRequest()
//   xhr.open(method, `${api}${path}`)
//   xhr.withCredentials = true
//   xhr.addEventListener('readystatechange', () => {
//     // console.log('Response recieved')
//     // console.log(xhr)
//     if (xhr.readyState === 4) return xhr
//   })
//   xhr.setRequestHeader('cache-control', 'no-cache')
//   xhr.send()
// }
