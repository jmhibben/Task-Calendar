<template>
<!-- FIXME: is this <div> and class tag necessary? -->
<div class="content">
<!-- FIXME: needs to load first day of week in 'weekStart' -->
<header>Week of {{ weekStart }}</header>

<nav>
  <!-- FIXME: clicking back should send user back to calendar view -->
  <a class="button prev" href="#">Back</a>
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
    <tr v-for="i in (latest-earliest)">

      <td :timestamp="setTimestamp(earliest + i)">
        {{ (earliest + i) + ':00 ' + timestamp}}</td>

      <td v-for="j in 7" :curTask="taskCheck(j)">
        <timeSlot :description='curTask.description' :startTime='curTask.startTime'
                  :endTime='curTask.endTime' :color='curTask.color'></timeSlot>
      </td>
    </tr>
  </tbody>
  </table>
</article>
</div>
</template>


<script>
  import TimeSlot from './TimeSlot.vue'

  // FIXME: dummy container needs integration with state
  export default {
    name: 'weekly',

    data () {
      return {
        weekStart: '05/07/17',
        taskNav: '',
        altRow: false,
        curTask: {
          date: '',
          description: '',
          startTime: 100,
          endTime: 0,
          color: '',
          weekday: 0
        },
        taskArray: [
          {
            date: '05/13/17',
            description: 'Karate Tournament',
            startTime: 9,
            endTime: 18,
            color: 'yellow',
            weekday: 7
          },

          {
            date: '05/10/17',
            description: 'Bowling Practice',
            startTime: 19,
            endTime: 21,
            color: 'red',
            weekday: 4
          },

          {
            date: '05/08/17',
            description: 'Doctor\'s Appointment',
            startTime: 8,
            endTime: 8,
            color: 'purple',
            weekday: 2
          }
        ],
        earliest: 10,
        latest: 17,
        timestamp: 'AM'
      }
    },

    // FIXME: will need to update with proper week start date dynamically
    methods: {
      getWeekStart (taskArray) { this.weekStart = taskArray[0].date },

      setTableHeight (taskArray) {
        for (let task of taskArray) {
          if (task.startTime < this.earliest) { this.earliest = task.startTime }
          if (task.endTime > this.latest) { this.latest = task.endTime }
        }
      },

      setTimestamp (hour) {
        if (hour >= 12) this.timestamp = 'PM'
        else this.timestamp = 'AM'
      },

      taskCheck (index) {
        for (let task of this.taskArray) {
          if (task.weekday === index) this.curTask = task
        }
      }
    },

    mounted: function () {
      this.setTableHeight(this.taskArray)
      this.getWeekStart(this.taskArray)
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
