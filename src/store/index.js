import Vue from 'vue'
import Vuex from 'vuex'

// This lets us pass the store object through the entire app as `this.$state`
Vue.use(Vuex)

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
      // console.log(auth.url)
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
      // let xhr = sendRequest('GET', '/api')
      // console.log(xhr)
      let xhr = new XMLHttpRequest()

      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === 4) {
          // console.log(xhr)
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
      let xhr = new XMLHttpRequest()
      xhr.addEventListener('readystatecange', function () {
        if (xhr.readyState === 4 && xhr.status === 204) {
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
//   let api = 'http://localhost:8079'
//   let xhr = new XMLHttpRequest()
//   xhr.open(method, `${api}${path}`)
//   xhr.withCredentials = true
//   xhr.addEventListener('readystatechange', () => {
//     if (xhr.readyState === 4) return xhr
//   })
//   xhr.send()
// }
