<template>
<div>
  <!-- This is currently displaying an empty element -->
  <input id="g-signin" type="button" value="Sign in with Google" @click="login">
</div>
</template>

<script>

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
  //     url: () => {
  //       if (this.$route.query === 'object' && this.$route.query.code !== null) {
  //         logger(levels.DEBUG, levels.d, this.$route.query)
  //         console.log('Preparing to change route...')
  //         this.$store.dispatch('apiSetToken', `${this.$route.query.code}`)
  //           .then(() => {
  //             console.log('Changing route...')
  //             this.$router.push('calendar')
  //             return 'calendar'
  //           }).catch((err) => {
  //             console.error('Something went wrong processing the authentication:')
  //             console.error(err)
  //           })
  //       } else {
  //         return this.showConsent()
  //       }
  //     }
  //   }
  // },
  methods: {
    showConsent () {
      this.$store.dispatch('apiShowLogin')
        .then(() => {
          // this.$nextTick(() => {
          setTimeout(() => {
            let url = this.$store.state.auth.url
            logger(levels.DEBUG, levels.d, url)
            // document.location = url
            // return url
          }, 150)
          // })
        }).catch((err) => {
          logger(levels.ERROR, levels.e, 'Unable to redirect:')
          logger(levels.ERROR, levels.e, err)
        })
    },
    login () {
      logger(levels.DEBUG, levels.d, this.$route.query)
      if (this.$route.query.code !== undefined) {
        logger(levels.INFO, levels.i, 'Redirecting to /calendar')
        this.$router.push('calendar')
      } else if (this.$route.query.code === undefined) {
        logger(levels.INFO, levels.i, 'Redirecting to consent page')
        this.showConsent()
      } else {
        logger(levels.DEBUG, levels.d, 'Huh...')
        logger(levels.DEBUG, levels.d, this.$route.query)
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
