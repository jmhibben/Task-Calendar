<template>
  <td :bgcolor='color' :rowspan='endTime - startTime + 1'>{{ description }}</td>
</template>


<script>
  export default {
    props: ['description', 'startTime', 'endTime', 'color', 'weekday']
  }
</script>


<style scoped lang="scss">
  // FIXME:using deprecated 'bgcolor' attribute until i understand how to send
  // values to <style>
</style>
