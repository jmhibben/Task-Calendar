<template>
  <td :bgcolor='color' :rowspan='endTime - startTime + 1' :googleid='googleid'
      @click='taskNav()'>
    {{ description }}
  </td>
</template>


<script>
  export default {
    props: ['description', 'startTime', 'endTime', 'color', 'weekday', 'googleid'],
    methods: {
      taskNav () {
        this.$router.push('task')
      }
    }
  }
</script>


<style scoped lang="scss">
  // FIXME:using deprecated 'bgcolor' attribute until i understand how to send
  // values to <style>, if possible
  @import "../assets/skeleton/skeleton.scss";
</style>
