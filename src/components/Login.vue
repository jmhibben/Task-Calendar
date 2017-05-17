<template>
<div>
  <!-- This is currently displaying an empty element -->
  <input id="g-signin" type="button" value="Sign in with Google" @click="redirect">
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

const levels = {
  DEBUG: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3,
  FAILURE: 4,
  d: 'DEBUG',
  i: 'INFO',
  w: 'WARNING',
  e: 'ERROR',
  f: 'FAILURE'
}

function logger (level, name, message) {
  if (level >= levels.ERROR) {
    console.error(`${name}`)
    console.error(message)
  } else if (level === levels.warning) {
    console.error(`${name}: ${message}`)
  } else if (level === levels.info) {
    console.log(`${name}: ${message}`)
  } else {
    console.log(`${name}`)
    console.log(message)
  }
}

export default {
  name: 'login',
  // data () {
  //   return {
  //     hasCode: false
  //   }
  // },
  computed: mapState({
    auth: 'auth',
    user: 'user',
    cal: 'calendar',
    event: 'event'
  }),
  mounted () {
    logger(levels.DEBUG, levels.d, `Already authenticated? ${this.isAuthenticated()}`)
    logger(levels.DEBUG, levels.d, window.location.href)
    let temp = window.location.href.split('?')[1]
    if (temp !== undefined) {
      let code = temp.split('=')[1]
      logger(levels.DEBUG, levels.d, code.split('#')[0])
      this.apiSetToken(code.split('#')[0])
      this.apiGetTaskCalendar()
      logger(levels.DEBUG, levels.d, this.cal.id)
      /* Test Block - Comment these lines out when ready */
      this.apiGetCalendarEvents()
      logger(levels.DEBUG, levels.d, this.cal.events)
      let eid = this.cal.events[Object.keys(this.cal.events)[1]][0]
      this.apiGetEventDetails(eid)
      logger(levels.DEBUG, levels.d, this.event.start.dateTime)
      /* End Test Block */
    }
  },
  methods: {
    ...mapActions([
      'apiShowLogin',
      'apiSetToken',
      'apiGetUser',
      'apiGetTaskCalendar',
      'apiGetCalendarEvents',
      'apiGetEventDetails'
    ]),
    ...mapGetters([
      'isAuthenticated',
      'getUser',
      'getCalendar'
    ]),
    redirect () {
      this.apiShowLogin()
      // force the system to wait a moment until the url is present
      let count = 0
      while (this.auth.url === null) {
        if (++count === 2000) break
      }
      logger(levels.DEBUG, levels.d, `Consent URL: ${this.auth.url}`)
      // redirect only if the URL has been set
      if (this.auth.url !== null) {
        window.location = this.auth.url
      }
    }
  }
}
</script>

<style lang="scss">
.g-signin {
  height: 50px;
}
</style>
