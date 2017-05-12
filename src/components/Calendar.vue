<template>
<div id="content">
  <div class ="container">
  <div class ="twelve columns">
  <header>
    <a> {{getHeaderDate()}} </a>
  </header>
  <nav><a class="button prev" @click="previous()">Previous</a><a class="button next" @click="next()">Next</a></nav>
  <article>
  <table class="u-full-width">
    <thead>
    <tr>
      <th class="week-day">Sunday</th>
      <th class="week-day">Monday</th>
      <th class="week-day">Tuesday</th>
      <th class="week-day">Wednesday</th>
      <th class="week-day">Thursday</th>
      <th class="week-day">Friday</th>
      <th class="week-day">Saturday</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td><router-link to="/week"><td class="inner">{{calRender[0][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[1][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[2][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[3][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[4][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[5][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[6][0]}}</td></router-link></td>
    </tr>
    <tr>
      <td><router-link to="/week"><td class="inner">{{calRender[7][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[8][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[9][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[10][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[11][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[12][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[13][0]}}</td></router-link></td>
    </tr>
    <tr>
      <td><router-link to="/week"><td class="inner">{{calRender[14][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[15][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[16][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[17][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[18][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[19][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[20][0]}}</td></router-link></td>
    </tr>
    <tr>
      <td><router-link to="/week"><td class="inner">{{calRender[21][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[22][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[23][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[24][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[25][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[26][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[27][0]}}</td></router-link></td>
    </tr>
    <tr>
      <td><router-link to="/week"><td class="inner">{{calRender[28][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[29][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[30][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[31][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[32][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[33][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[34][0]}}</td></router-link></td>
    </tr>
    <tr>
      <td><router-link to="/week"><td class="inner">{{calRender[35][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[36][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[37][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[38][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[39][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[40][0]}}</td></router-link></td>
      <td><router-link to="/week"><td class="inner">{{calRender[41][0]}}</td></router-link></td>
    </tr>
    </tbody>
  </table>
  </article>
  <!-- <div class="other-tasks">
    <div class="task-info">Overview</div>
    <div class="month">
      <div class="task-count">8 tasks due this month</div>
    </div>
    <div class="overdue">
      <div class="task-count">1 task overdue</div>
    </div>
    <div class="dateless">
      <div class="task-count">5 tasks without due dates</div>
    </div>
    <div class="completed">
      <div class="task-count">0 tasks completed</div>
    </div>
  </div> -->
  </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'calendar',
  props: {
    calRender: []
  },
  data: function () {
    return {
      today: new Date(),
      currentDate: new Date(),
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      daysInMonths: ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'],
      headerDate: ''
      // calRender: []
    }
  },

  mounted: function () {
    this.renderCalendar(this.today)
  },

  methods: {

    goToWeek (path = '') {
      this.$router.push('week')
    },

    getHeaderDate (today) {
      this.headerDate = this.months[this.today.getMonth()] + ' ' + this.today.getFullYear()
      return this.headerDate
    },

    previous () {
      let month = this.today.getMonth()
      if (month > 0) {
        this.today.setMonth(this.today.getMonth() - 1)
      } else { // go to dec of prev year
        this.today.setFullYear(this.today.getFullYear() - 1)
        this.today.setMonth(11)
      }
      this.getHeaderDate(this.today)
      this.renderCalendar(this.today)
    },

    next () {
      let month = this.today.getMonth()
      if (month < 11) {
        this.today.setMonth(this.today.getMonth() + 1)
      } else { // do to jan of next year
        this.today.setFullYear(this.today.getFullYear() + 1)
        this.today.setMonth(0)
      }
      this.getHeaderDate(this.today)
      this.renderCalendar(this.today)
    },

    renderCalendar (today) {
      let days = 0
      this.calRender = []
      // check for leap year and set days in this month
      if (this.today.getMonth() === 1) {
        if ((this.today.getFullYear() % 4 === 0 && this.today.getFullYear() % 100 !== 0) || this.today.getFullYear() % 400 === 0) {
          days = 29
        } else days = this.daysInMonths[1]
      } else days = this.daysInMonths[this.today.getMonth()]

      var weeks = [1, 2, 3, 4, 5, 6]

      let lastMonthDays = 0
      // finds out what day the month starts on
      let firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1)
      let firstWeekDay = firstDay.getDay() // 0-6

      // calculate next and last months days to populate calendar
      if (this.today.getMonth() > 0) {
        lastMonthDays = this.daysInMonths[this.today.getMonth() - 1]
      } else lastMonthDays = this.daysInMonths[11] // else dec

      var thisWeek = 0 // counter to access weeks array
      var countDays = 0 // counts up weeks so you can access proper week value
      // fills start with previous months days
      for (let i = firstWeekDay; i > 0; i--) {
        this.calRender.push([lastMonthDays - i + 1, weeks[thisWeek], this.today.getMonth()])
        countDays++
        if (countDays === 7) {
          countDays = 0
          thisWeek++
        }
      }
      // fills calendar with this months days
      for (let x = 1; x <= days; x++) {
        this.calRender.push([x, weeks[thisWeek], this.today.getMonth()])
        countDays++
        if (countDays === 7) {
          countDays = 0
          thisWeek++
        }
      }
      // find remainder of days needed from next month and add them to the end
      let neededDays = 43 - this.calRender.length
      for (let y = 1; y < neededDays; y++) {
        this.calRender.push([y, weeks[thisWeek], this.today.getMonth()])
        countDays++
        if (countDays === 7) {
          countDays = 0
          thisWeek++
        }
      }
    }
  }
}

</script>

<style scoped lang="scss">
// Need to make this mobile-ready 
$overdue: rgb(240, 165, 165);
$nodate: rgb(250, 200, 130);
$completed: rgb(140, 230, 170);

#content {
  margin: 0 auto;
  width: 800px;
  box-sizing: content-box;
  
  header {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }

  nav {
    background-color: #eee;
    height: 100%;
    width: 100%;

    .button {
      background-color: lightgrey;
      border: 1px solid grey;
      border-radius: 4px;
      color: #333;
      padding: 4px;
      text-align: center;
      text-decoration: none;
      width: 80px;

      &.prev {
        float: left; 
      }

      &.next {
        float: right;
      }
    }
    
    &:after {
      clear: both;
    }
  }
  
  article {
    margin-top: 35px;
  }
}

table {
  background-color: lightgrey;
  border-collapse: collapse;
  border: 1px solid grey;
  border-radius: 4px;
  
  th, td {
    border-bottom: 1px solid black;
    padding: 10px;
    text-align: left;
    vertical-align: top;
    width: 100px;

    .week-day {
      height: 25px;
    }
    .inner {
      border-bottom: none;
      padding: 0px;
      width:100px;
      height:100px;
    }
    
    &:hover {
      background-color: #bbb;
    }
  }
  
  td {
    height: 70px;
    color: #999;
    
    &.current {
      color: #333;
    }
    
    & .task-count {
      height: 25px;
      width: 90%;
    }
  }
}

.task-count {
  background-color: rgb(160, 180, 240);
  border: hidden;
  border-radius: 13px;
  
  &.late {
    background-color: $overdue;
  }
}

.other-tasks {
  background-color: lightgrey;
  margin: 10px 0;
  left: 5%;
  padding: 10px;
  position: absolute;
  top: 60px;
  
  .dateless .task-count {
    background-color: $nodate;
  }
  
  .overdue .task-count {
    background-color: $overdue;
  }
  
  .completed .task-count {
    background-color: $completed;
  }
  
  .month, .dateless, .overdue, .completed {
    border-radius: 8px;
    padding: 8px;
    
    .task-count {
      font-size: 0.9rem;
      margin-right: 5px;
      padding: 5px 10px;
      text-align: center;
    }
  }
  
  .task-info {
    font-weight: bold;
    font-size: 1.4rem;
    left: 20px;
    position: relative;
  }
}
</style>
