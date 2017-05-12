<template>
<!-- FIXME: is this <div> and class tag necessary? -->
<div class="content">
<!-- FIXME: needs to load first day of week as 'weekStart' -->
<header>Week of {{ weekStart }}</header>

<nav>
  <a class="button prev" href="#">Back</a>
</nav>

<!-- FIXME: need to dynamically create rows based on tasks -->
<!-- TODO: add dates to table header? -->
<!-- TODO: default hours listed? -->
<!-- TODO: clicking task should send user to task view with
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

  <!-- TODO: needs to dynamically assign "alternativeRow" class -->
  <tbody>
    <tr v-for="row in height + 1">
      <td :timestamp="setTimestamp(row - 1)">{{ timestamp }}</td>
      <!-- FIXME: displaying tasks incorrectly -->
      <timeSlot v-for="col in 7" :curTask="taskCheck(col, row - 1)"
      :description='curTask.description' :startTime='curTask.startTime'
      :endTime='curTask.endTime' :color='curTask.color'></timeSlot>
    </tr>
  </tbody>
  </table>
</article>
</div>
</template>


<script>
import TimeSlot from './TimeSlot.vue'

// TODO: dummy container needs integration with state
export default {
  name: 'weekly',

  data () {
    return {
      altRow: false,
      blank: {
        date: '',
        description: '',
        startTime: 100,
        endTime: 0,
        color: '',
        weekday: 0
      },
      curTask: this.blank,
      earliest: 10,
      height: 7,
      latest: 17,
      taskArray: [
        {
          color: 'yellow',
          date: '05/13/17',
          description: 'Karate Tournament',
          endTime: 18,
          startTime: 9,
          weekday: 7
        },

        {
          color: 'red',
          date: '05/10/17',
          endTime: 21,
          description: 'Bowling Practice',
          startTime: 19,
          weekday: 4
        },

        {
          color: 'purple',
          date: '05/08/17',
          description: 'Doctor\'s Appointment',
          endTime: 8,
          startTime: 8,
          weekday: 2
        }
      ],
      taskNav: '',
      timestamp: this.earliest + ':00AM',
      weekStart: '05/07/17'
    }
  },

  methods: {
    // Get/set first date of the week.
    getWeekStart (taskArray) { this.weekStart = taskArray[0].date },

    // Set the start and end points for the table based on task start/end times.
    setTableHeight (taskArray) {
      for (let task of taskArray) {
        if (task.startTime < this.earliest) { this.earliest = task.startTime }
        if (task.endTime > this.latest) { this.latest = task.endTime }
      }
      this.height = this.latest - this.earliest
    },

    // Set the timestamp to be used in the current row.
    setTimestamp (hour) {
      if (this.earliest + hour >= 12) this.timestamp = (this.earliest + hour) + ':00PM'
      else this.timestamp = (this.earliest + hour) + ':00AM'
    },

    // Check each time slot to see if a task should be inserted.
    taskCheck (index, hour) {
      for (let task of this.taskArray) {
        if (task.weekday === index && task.endTime > hour) this.curTask = task
        else this.curTask = this.blank  // Insert a blank time slot if no task
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

<!-- TODO: <style> needs further cleaning and replacing with Skeleton -->
<!-- TODO: set variables for empty cells and increment variable value for
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
