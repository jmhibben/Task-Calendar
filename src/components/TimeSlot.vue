<template>
  <td :bgcolor='color' :rowspan='endTime - startTime'>{{ description }}</td>
</template>


<script>
  export default {
    data () {
      return {
        description: 'Karate Tournament',
        startTime: 14,
        endTime: 17,
        color: 'yellow'
      }
    }
  }
</script>


<style scoped lang="scss">

</style>
