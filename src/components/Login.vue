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
    return {
      url: null
    }
  },
  methods: {
    showConsent () {
      console.log(this.$store.dispatch('showLogin')
        .then(() => {
          window.location.href = this.$store.state.auth.url
        }))
    }
  }
}
</script>

<style lang="scss">
.g-signin2 {
  height: 50px;
}
</style>
