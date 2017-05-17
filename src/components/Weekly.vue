<template>
<div class="container">
<h6>Week of {{ weekStart }}</h6>
<nav><a class="button" href="#/Calendar">Back</a></nav>
<!-- TODO: add dates to table header? -->
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

<tbody>
  <template v-for="(row, index) in this.fullArray">
  <tr :class="{ altRow: (index % 2) }">
    <td>{{ timestamp[index] }}</td>
    <template v-for="task in row">
    <timeSlot :description='task.description' :startTime='task.startTime'
              :endTime='task.endTime' :color='task.color'
              :weekday='task.weekday' :googleid='task.googleid'>
    </timeSlot>
    </template>
  </tr>
  </template>
</tbody>
</table>
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
      height: 0,
      latest: 17,
      taskArray: [
        {
          color: 'yellow',
          date: '05/13/17',
          description: 'Karate Tournament',
          endTime: 18,
          placed: false,
          startTime: 9,
          weekday: 0
        },
        {
          color: 'green',
          date: '05/12/17',
          description: 'Secret Illuminati Council Meeting',
          endTime: 16,
          placed: false,
          startTime: 13,
          weekday: 0
        },
        {
          color: 'red',
          date: '05/10/17',
          endTime: 21,
          description: 'Bowling Practice',
          placed: false,
          startTime: 19,
          weekday: 0
        },

        {
          color: 'purple',
          date: '05/08/17',
          description: 'Doctor\'s Appointment',
          endTime: 8,
          placed: false,
          startTime: 8,
          weekday: 0
        }
      ],
      taskNav: '',
      timestamp: [],
      weekStart: ''
    }
  },

  methods: {
    // Set the numerical weekday value of the tasks where Sunday is '1'
    setWeekdays (taskArray) {
      for (let task of taskArray) {
        let dateObj = new Date(task.date)
        task.weekday = dateObj.getDay() + 1
      }
    },

    // Get/set first date of the week.
    getWeekStart (task) {
      let dayNum = task.date.split('/')
      dayNum[1] = parseInt(dayNum[1])
      dayNum[1] -= (task.weekday - 1)
      dayNum[1] = '0' + dayNum[1].toString()
      this.weekStart = dayNum.join('/')
    },

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
      this.timestamp.push(stamp)
    },

    // Creates a jagged array of blank tasks and then places real tasks in their
    // time slot.
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
      // create jagged array of blank tasks
      for (let i = 0; i < this.height; i++) {
        for (let j = 0; j < 7; j++) {
          subArray[j] = blank
        }
        fullArray[i] = subArray
        subArray = []
        this.setTimestamp(i)
      }
      // add the real tasks to the array of blank tasks
      for (let task of this.taskArray) {
        fullArray[(task.startTime - this.earliest)][(task.weekday - 1)] = task
        // if task spans more than one cell, remove the cells under it
        if (task.endTime - task.startTime > 0) {
          for (let i = 1; i <= task.endTime - task.startTime; i++) {
            fullArray[task.startTime - this.earliest + i]
            .splice((task.weekday - 1), 1)
          }
        }
      }
      this.fullArray = fullArray
    }
  },

  mounted: function () {
    this.setWeekdays(this.taskArray)
    this.setTableHeight(this.taskArray)
    this.getWeekStart(this.taskArray[0])
    this.createFullArray()
  },

  components: {
    timeSlot: TimeSlot
  }
}
</script>


<style scoped lang="scss">
  @import "../assets/skeleton/skeleton.scss";
  $color: #fff; // set to white like skeleton default so rows could be darkened
  table {
    tr {
      &.altRow {
        background-color: darken($color, 5%);
      }

      &.primaryRow {
        background-color: darken($color, 15%);

        th {
          text-align: center;
          padding-right: 15px;
          padding-left: 15px;
        }
      }
    }

    td, th {
      border-right: 1px solid $light-grey;
    }
  }
</style>
