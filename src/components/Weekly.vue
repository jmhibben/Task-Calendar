<template>
<!-- FIXME: is this <div> and class tag necessary? -->
<div class="content">
<!-- FIXME: needs to load first day of week in 'weekStart' -->
<header>Week of {{ weekStart }}</header>

<nav>
  <!-- FIXME: clicking back should send user back to calendar view -->
  <a class="button prev">Back</a>
</nav>

<!-- FIXME: need to dynamically create rows based on tasks -->
<!-- FIXME: add dates to table header? -->
<!-- FIXME: default hours listed? -->
<!-- FIXME: clicking task should send user to task view with
that task's info? -->

<article>
  <table>
  <thead>
    <tr class="primaryRow">
      <th>Hour</th>
      <th>Sunday</th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
      <th>Saturday</th>
    </tr>
  </thead>

  <!-- FIXME: needs to dynamically assign "alternativeRow" -->
  <tbody>
    <tr :altRow='altRow'>
      <td>{{ rowHour }}</td>
      <timeSlot :description='description' :startTime='startTime'
      :endTime='endTime' :color='color'></timeSlot>
    </tr>
  </tbody>
  </table>
</article>
</div>
</template>


<script>
  import TimeSlot from './TimeSlot.vue'

  // FIXME: dummy container needs integration with state
  let task1 = {
    date: '05/13/17',
    description: 'Karate Tournament',
    startTime: 9,
    endTime: 18,
    color: 'yellow',
    weekday: 7
  }

  let task2 = {
    date: '05/10/17',
    description: 'Bowling Practice',
    startTime: 19,
    endTime: 21,
    color: 'red',
    weekday: 4
  }

  let task3 = {
    date: '05/08/17',
    description: 'Doctor\'s Appointment',
    startTime: 8,
    endTime: 8,
    color: 'purple',
    weekday: 2
  }

  let taskArray = [task1, task2, task3]

  function getTableHeight (taskArray) {
    let earliest = 8
    let latest = 17
    for (let task in taskArray) {
      if (task.startTime < earliest) { earliest = task.startTime }
      if (task.endTime > latest) { latest = task.endTime }
    }
    return [earliest, latest]
  }

  export default {
    name: 'weekly',

    data () {
      return {
        weekStart: '05/07/17',
        taskNav: '',
        altRow: false,
        rowHour: taskContainer.startTime + ':00',
        description: taskContainer.description,
        startTime: taskContainer.startTime,
        endTime: taskContainer.endTime,
        color: taskContainer.color
      }
    },

    // FIXME: not working at all, will revisit
    methods: {
      getWeekStart (taskContainer) {
        data => {
          this.weekStart = ''
        }
      }
    },

    components: {
      timeSlot: TimeSlot
    }
  }
</script>

<!-- FIXME: <style> needs further cleaning and replacing with Skeleton -->
<!-- FIXME: set variables for empty cells and increment variable value for
alternateRow? -->
<style scoped lang="scss">
  html, body {
    font-family: Roboto, "Libre Sans", "Ubuntu Sans", "Open Sans", sans-serif;
  }

  .content {
    margin: 0 auto;
    width: 800px;
    box-sizing: content-box;

    header {
      font-size: 1.3rem;
      font-weight: bold;
      text-align: center;
    }

    nav {
      background-color: #eee;
      height: 100%;
      width: 100%;

      .button {
        background-color: lightgrey;
        border: 2px solid lightgrey;
        border-radius: 4px;
        color: #333;
        padding: 4px;
        text-align: center;
        text-decoration: none;
        width: 80px;

        &.prev {
          float: left;
        }
      }
    }

    article {
      margin-top: 35px;
    }
  }

  table {
    background-color: lightgrey;
    border-collapse: collapse;
    border: 1px solid #888;
    border-radius: 4px;

    tr {
      &.alternateRow {
        background-color: #aaa;
      }

      &.primaryRow {
        background-color: #888;
      }
    }
    th, td {
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      padding: 10px;
      text-align: left;
      vertical-align: top;
      width: 100px;

      &.overlap {
        border-bottom: none;
      }

      &:hover {
        background-color: #999;
      }

    }
    td {
      height: 40px;
    }
  }

  .fab {
    background-color: rgb(78, 146, 233);
    border-radius: 30px;
    border-style: hidden;
    bottom: 30px;
    font-size: 2.5rem;
    height: 60px;
    padding: 0;
    position: fixed;
    right: 20%;
    text-align: center;
    width: 60px;
  }
</style>
