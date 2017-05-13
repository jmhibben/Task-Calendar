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
    return console.log
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

const apihost = 'http://localhost:8079'

export default new Vuex.Store({
  state: {
    // initially set to null- there's no way we can know what these will be ahead of time
    auth: {
      url: null,
      tokenSet: false
    }
    // authClient: oauthClient
  },
  getters: {
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
    setTokenRecieved: (state) => {
      state.auth.tokenSet = true
    }
  },
  // Using argument destructuring in actions to simplify use
  // -> `commit` instead of `context.commit`
  actions: {
    // See these for more information on dispatching actions:
    //  https://vuex.vuejs.org/en/actions.html#dispatching-actions
    //  https://vuex.vuejs.org/en/actions.html#dispatching-actions-in-components
    apiShowLogin ({ commit }) {
      // let xhr = sendRequest('GET', '/auth/url')
      // setImmediate(xhr)
      // console.log(xhr)
      let xhr = new XMLHttpRequest()

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          // console.log(xhr)
          logger.debug(xhr)
          // console.log(xhr.responseText) // debug
          let response = JSON.parse(xhr.responseText)
          // console.log(response)
          commit('setAuthUrl', response)
        }
      })

      // xhr.open('GET', `${apihost}/api`)
      xhr.open('GET', `${apihost}/api/auth/url`)
      xhr.withCredentials = true
      xhr.setRequestHeader('cache-control', 'no-cache')
      xhr.send()
      // console.log(xhr)
    },
    apiSetToken ({ commit }, authCode) {
      // let xhr = sendRequest('POST', `/code/${authCode}`)
      // setImmediate(xhr)
      // console.log(xhr)
      // let xhr = sendRequest('POST', `/code/${authCode}`)
      // console.log(xhr)
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatecange', () => {
        if (xhr.readyState === 4 && xhr.status === 204) {
          console.log(xhr.response)
          commit('setTokenRecieved')
        }
      })

      xhr.open('POST', `${apihost}/api/auth/code/${authCode}`)
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
