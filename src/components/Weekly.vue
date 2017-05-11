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
    <tr class="alternateRow">
      <td>9:00 AM</td>
      <timeSlot :description='description' :startTime='startTime'
      :endTime='endTime' :color='color'></timeSlot>
    </tr>
    <tr>
      <td>10:00 AM</td>
    </tr>
    <tr class="alternateRow">
      <td>11:00 AM</td>
    </tr>
    <tr>
      <td>12:00 PM</td>
    </tr>
    <tr class="alternateRow">
      <td>1:00 PM</td>
    </tr>
    <tr>
      <td>2:00 PM</td>
    </tr>
    <tr class="alternateRow">
      <td>3:00 PM</td>
    </tr>
    <tr>
      <td>4:00 PM</td>
    </tr>
    <tr class="alternateRow">
      <td>5:00 PM</td>
    </tr>
    <tr>
      <td>6:00 PM</td>
    </tr>
  </tbody>
  </table>
</article>
</div>
</template>


<script>
  import TimeSlot from './TimeSlot.vue'

  // FIXME: dummy container needs integration with state
  let taskContainer = {
    date: '05/13/17',
    description: 'Karate Tournament',
    startTime: 9,
    endTime: 18,
    color: 'yellow'
  }

  export default {
    name: 'weekly',

    data () {
      return {
        weekStart: '',
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
          this.weekStart = taskContainer.date
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
