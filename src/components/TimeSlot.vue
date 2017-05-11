<template>
  <!--FIXME:using deprecated 'bgcolor' attribute until i understand how to send
  values to the script tag-->
  <td :bgcolor='color' :rowspan='endTime - startTime + 1'>{{ description }}</td>
</template>


<script>
  export default {
    props: ['description', 'startTime', 'endTime', 'color']
  }
</script>


<style scoped lang="scss">

</style>
