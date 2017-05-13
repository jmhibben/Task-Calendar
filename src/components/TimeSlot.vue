<template>
  <td :bgcolor='color' :rowspan='endTime - startTime + 1'
      @click="taskNav()">{{ description }}</td>
</template>


<script>
  export default {
    props: ['description', 'startTime', 'endTime', 'color', 'weekday'],
    methods: {
      // FIXME: needs to nav to task bringing props with it
      taskNav () {
        console.log('task ' + this.desctiption + ' clicked')
      }
    }
  }
</script>


<style scoped lang="scss">
  // FIXME:using deprecated 'bgcolor' attribute until i understand how to send
  // values to <style>
</style>
