<template>
  
  <!-- FIXME:using deprecated 'bgcolor' attribute until i understand how to send
  values to <style> -->
  <!-- FIXME: router-link to not working -->

  <td :bgcolor='color' :rowspan='endTime - startTime + 1'
  router-link to=''>{{ description }}</td>
</template>


<script>
  export default {
    props: ['description', 'startTime', 'endTime', 'color']
  }
</script>


<style scoped lang="scss">

</style>
