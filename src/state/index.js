import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
// google api files
import { oauthClient } from '../assets/api/oauth'


// This lets us pass the store object through the entire app as `this.$state`
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // initially set to null- there's no way we can know what these will be ahead of time
    auth: {
      code: null,
      token: null
    },
    auth: oauthClient
  },
  getters: {
    getAuthCode: state => {
      return state.auth.code
    },
    getAuthToken: state => {
      return state.auth.token
    }
  },
  // Mutations MUST be called in synchronous code
  // For async calls, use actions
  mutations: {
    // If a second parameter is supplied here, then the second parameter will be treated as an object internally

    // Uses the auth code provided by OAuth redirected back to the app
    // We're storing this to ensure that we can refresh the token if necessary
    setAuthCode: (state, auth) => {
      state.auth.code = auth.code
    },
    // Uses the token returned by oauthClient.getToken
    setAuthToken: (state, auth) => {
      state.auth.token = auth.token
    },
  },
  // Using argument destructuring in actions to simplify use
  // -> `commit` instead of `context.commit`
  actions: {
    // See these for more information on dispatching actions:
    //  https://vuex.vuejs.org/en/actions.html#dispatching-actions
    //  https://vuex.vuejs.org/en/actions.html#dispatching-actions-in-components
    setAuthCode ({ commit }, _code) {
      commit({
        type: 'setAuthCode',
        code: _code
      })
    },
    setAuthToken ({ commit }, _token) {
      commit({
        type: 'setAuthToken',
        token: _token
      })
    }
  }
})
