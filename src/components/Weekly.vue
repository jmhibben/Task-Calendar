<template>
<!-- FIXME: is this <div> and class tag necessary? -->
<div class="content">
<!-- FIXME: needs to load first day of week as 'weekStart' -->
<header>Week of {{ weekStart }}</header>

<nav>
  <a class="button prev" href="#">Back</a>
</nav>

<!-- TODO: add dates to table header? -->
<!-- TODO: default hours listed? -->
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
    <tr v-for="(row, index) in this.fullArray">
      <td :timestamp="setTimestamp(index)">{{ timestamp }}</td>
      <!-- FIXME: displaying tasks incorrectly -->
      <template v-for="task in row">
      <timeSlot :description='task.description' :startTime='task.startTime'
                :endTime='task.endTime' :color='task.color'
                :weekday='task.weekday'>
      </timeSlot>
      </template>
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
      earliest: 10,
      fullArray: [],
      height: 7,
      latest: 17,
      taskArray: [
        {
          color: 'yellow',
          date: '05/13/17',
          description: 'Karate Tournament',
          endTime: 18,
          placed: false,
          startTime: 9,
          weekday: 7
        },

        {
          color: 'red',
          date: '05/10/17',
          endTime: 21,
          description: 'Bowling Practice',
          placed: false,
          startTime: 19,
          weekday: 4
        },

        {
          color: 'purple',
          date: '05/08/17',
          description: 'Doctor\'s Appointment',
          endTime: 8,
          placed: false,
          startTime: 8,
          weekday: 2
        }
      ],
      taskNav: '',
      timestamp: '10:00AM',
      weekStart: '05/07/17'
    }
  },

  methods: {
    // Get/set first date of the week.
    // FIXME: wrong date
    getWeekStart (taskArray) { this.weekStart = taskArray[0].date },

    // Set the start and end points for the table based on task start/end times.
    setTableHeight (taskArray) {
      for (let task of taskArray) {
        if (task.startTime < this.earliest) { this.earliest = task.startTime }
        if (task.endTime > this.latest) { this.latest = task.endTime }
      }
      // console.log('from setTableHeight ' + this.earliest)
      this.height = (this.latest - this.earliest + 1)
    },

    // Set the timestamp to be used in the current row.
    setTimestamp (hour) {
      let start = this.earliest
      let stamp = this.timestamp
      // console.log('from setTimestamp ' + start + ' ' + stamp)
      if (start + hour > 12) stamp = (start - 12 + hour) + ':00PM'
      else if (start + hour === 12) stamp = '12:00PM'
      else stamp = (start + hour) + ':00AM'
      this.timestamp = stamp
    },

    createFullArray () {
      let blank = {
        date: '',
        description: '',
        startTime: 0,
        endTime: 0,
        color: '',
        weekday: 0
      }
      let fullArray = []
      let subArray = []
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < 7; j++) {
          subArray[j] = blank
        }
        fullArray[i] = subArray
        subArray = []
      }
      for (let task of this.taskArray) {
        fullArray[(task.startTime - this.earliest)][(task.weekday - 1)] = task
        if (task.endTime - task.startTime > 0) {
          // console.log(task.description + ' height: ' + (task.endTime - task.startTime))
          for (let i = 1; i <= task.endTime - task.startTime; i++) {
            // console.log('length before: ' + fullArray[task.startTime - this.earliest + i].length)
            // console.log('splicing: ' + task.description + i + ' at ' + (task.startTime - this.earliest + i) + ', ' + (task.weekday - 1))
            fullArray[task.startTime - this.earliest + i]
            .splice((task.weekday - 1), 1)
            // console.log('length after: ' + fullArray[task.startTime - this.earliest + i].length)
          }
        }
      }
      this.fullArray = fullArray
    }
  },

  mounted: function () {
    this.setTableHeight(this.taskArray)
    this.getWeekStart(this.taskArray)
    this.createFullArray()
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
