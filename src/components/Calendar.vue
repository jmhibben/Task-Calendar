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
        <td><span>27</span></td>
        <td><span>28</span></td>
        <td> <span>29</span></td>
        <td> <span>30</span></td>
        <td> <span>31</span></td>
        <td class="current"> <span>1</span></td>
        <td class="current"> <span>2</span></td>
      </tr>
      <tr>
        <td class="current"> <span>3</span></td>
        <td class="current"> <span>4</span>
          <button class="task-count late">1 task</button>
        </td>
        <td class="current"> <span>5</span></td>
        <td class="current"> <span>6</span></td>
        <td class="current"> <span>7</span>
          <button class="task-count">1 task</button>
        </td>
        <td class="current"> <span>8</span></td>
        <td class="current"> <span>9</span></td>
      </tr>
      <tr>
        <td class="current"> <span>10</span></td>
        <td class="current"> <span>11</span></td>
        <td class="current"> <span>12</span></td>
        <td class="current"> <span>13</span>
          <button class="task-count">2 tasks</button>
        </td>
        <td class="current"> <span>14</span>
          <button class="task-count">1 task</button>
        </td>
        <td class="current"> <span>15</span></td>
        <td class="current"> <span>16</span></td>
      </tr>
      <tr>
        <td class="current"> <span>17</span></td>
        <td class="current"> <span>18</span>
          <button class="task-count">3 tasks</button>
        </td>
        <td class="current"> <span>19</span></td>
        <td class="current"> <span>20</span></td>
        <td class="current"> <span>21</span></td>
        <td class="current"> <span>22</span></td>
        <td class="current"> <span>23</span></td>
      </tr>
      <tr>
        <td class="current"> <span>24</span></td>
        <td class="current"> <span>25</span></td>
        <td class="current"> <span>26</span></td>
        <td class="current"> <span>27</span></td>
        <td class="current"> <span>28</span></td>
        <td class="current"> <span>29</span></td>
        <td class="current"> <span>30</span></td>
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
export default {}
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
