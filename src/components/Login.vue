<template>
<div>
  <!-- This is currently displaying an empty element -->
  <input id="g-signin" type="button" value="Sign in with Google" @click="showConsent">
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    console.log(typeof this.$route.query === 'object')
    if (this.$route.query === 'object' && this.$route.query.code !== null) {
      console.log('Preparing to change route...')
      this.$store.dispatch('apiSetToken', `${this.$route.query.code}`)
        .then(() => {
          console.log('Changing route...')
          this.$router.push('calendar')
        }).catch((err) => {
          console.error('Something went wrong processing the authentication:')
          console.error(err)
        })
    }
    // no need for a near-instant redirect here!
    return {
      url: null
    }
  },
  methods: {
    showConsent () {
      this.$store.dispatch('apiShowLogin')
        .then(() => {
          console.log(this.$store.state.auth.url)
          // Redirect to the consent page
          this.url = this.$store.state.auth.url
          document.location = this.url
        }).catch((err) => {
          console.error('Unable to redirect:')
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss">
.g-signin2 {
  height: 50px;
}
</style>
