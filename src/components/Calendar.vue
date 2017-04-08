<template>
<div class="content">
  <header>April 2017</header>
  <nav><a class="button prev" href="#">Previous</a><a class="button next" href="#">Next</a></nav>
  <article>
    <table>
      <tr>
        <th>Monday</th>
        <th>Tuesday</th>
        <th>Wednesday</th>
        <th>Thursday</th>
        <th>Friday</th>
        <th>Saturday</th>
        <th>Sunday</th>
      </tr>
      <tr>
        <td><router-link to="/week">26</router-link></td>
        <td><router-link to="/week">27</router-link></td>
        <td><router-link to="/week">28</router-link></td>
        <td><router-link to="/week">29</router-link></td>
        <td><router-link to="/week">30</router-link></td>
        <td><router-link to="/week">31</router-link></td>
        <td class="current"><router-link to="/week">1</router-link></td>
      </tr>
      <tr>
      <!-- FIXME: `router-link` only affects text content right now -->
        <td class="current"><router-link to="/week">2</router-link></td>
        <td class="current"><router-link to="/week">3</router-link></td>
        <td class="current"><router-link to="/week">4</router-link>
          <button class="task-count late">1 task</button>
        </td>
        <td class="current"><router-link to="/week">5</router-link></td>
        <td class="current"><router-link to="/week">6</router-link></td>
        <td class="current"><router-link to="/week">7
          <button class="task-count">1 task</button>
          </router-link>
        </td>
        <td class="current"><router-link to="/week">8</router-link></td>
      </tr>
      <tr>
        <td class="current"><router-link to="/week">9</router-link></td>
        <td class="current"><router-link to="/week">10</router-link></td>
        <td class="current"><router-link to="/week">11</router-link></td>
        <td class="current"><router-link to="/week">12</router-link></td>
        <td class="current"><router-link to="/week">13
          <button class="task-count">2 tasks</button>
          </router-link>
        </td>
        <td class="current"><router-link to="/week">14</router-link>
          <button class="task-count">1 task</button>
        </td>
        <td class="current"><router-link to="/week">15</router-link></td>
      </tr>
      <tr>
        <td class="current"><router-link to="/week">16</router-link></td>
        <td class="current"><router-link to="/week">17</router-link></td>
        <td class="current"><router-link to="/week">18
          <button class="task-count">3 tasks</button>
          </router-link>
        </td>
        <td class="current"><router-link to="/week">19</router-link></td>
        <td class="current"><router-link to="/week">20</router-link></td>
        <td class="current"><router-link to="/week">21</router-link></td>
        <td class="current"><router-link to="/week">22</router-link></td>
      </tr>
      <tr>
        <td class="current"><router-link to="/week">23</router-link></td>
        <td class="current"><router-link to="/week">24</router-link></td>
        <td class="current"><router-link to="/week">25</router-link></td>
        <td class="current"><router-link to="/week">26</router-link></td>
        <td class="current"><router-link to="/week">27</router-link></td>
        <td class="current"><router-link to="/week">28</router-link></td>
        <td class="current"><router-link to="/week">29</router-link></td>
      </tr>
      <tr>
        <td class="current"><router-link to="/week">30</router-link></td>
        <td><router-link to="/week">1</router-link></td>
        <td><router-link to="/week">2</router-link></td>
        <td><router-link to="/week">3</router-link></td>
        <td><router-link to="/week">4</router-link></td>
        <td><router-link to="/week">5</router-link></td>
        <td><router-link to="/week">6</router-link></td>
      </tr>
    </table>
  </article>
  <div class="other-tasks">
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
  </div>
</div>
</template>

<script>
export default {
  name: 'calendar',
  methods: {
    goToWeek (path = '') {
      this.$router.push('week')
    }
  }
}
</script>

<style scoped lang="scss">
// Need to make this mobile-ready 
$overdue: rgb(240, 165, 165);
$nodate: rgb(250, 200, 130);
$completed: rgb(140, 230, 170);

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
  border: 1px solid lightgrey;
  border-radius: 4px;
  
  th, td {
    border-bottom: 1px solid black;
    padding: 10px;
    text-align: left;
    vertical-align: top;
    width: 100px;
    
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
