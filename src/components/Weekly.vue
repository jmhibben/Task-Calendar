<template>
<div class="content">
<header>Week of 04-02-2017</header>

<nav>
  <a class="button prev">Back</a>
</nav>

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
  <tbody>
    <tr>
      <td>8:00 AM</td>
      <td></td>
      <td class="overlap monday">Doctor's Appointment</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr class="alternateRow">
      <td>9:00 AM</td>
      <td></td>
      <td class="monday"></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <timeSlot></timeSlot>
    </tr>
    <tr>
      <td>10:00 AM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr class="alternateRow">
      <td>11:00 AM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr>
      <td>12:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr class="alternateRow">
      <td>1:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr>
      <td>2:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr class="alternateRow">
      <td>3:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr>
      <td>4:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr class="alternateRow">
      <td>5:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="overlap saturday"></td>
    </tr>
    <tr>
      <td>6:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td class="saturday"></td>
    </tr>
    <tr class="alternateRow">
      <td>7:00 PM</td>
      <td></td>
      <td></td>
      <td class="overlap tuesday">Bowling practice</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>8:00 PM</td>
      <td></td>
      <td></td>
      <td class="overlap tuesday"></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr class='alternateRow'>
      <td>9:00 PM</td>
      <td></td>
      <td></td>
      <td class="tuesday"></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>10:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr class="alternateRow">
      <td>11:00 PM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>12:00 AM</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
  </table>
</article>
</div>
</template>


<script>
  import TimeSlot from './TimeSlot.vue'

  export default {
    name: 'weekly',
    components: {
      timeSlot: TimeSlot

    }
  }

</script>


<style scoped lang="scss">
  $overdue: rgb(240, 165, 165);
  $nodate: rgb(250, 200, 130);
  $completed: rgb(140, 230, 170);

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

      &.monday {
        background-color: purple;
        &:hover {
          background-color: purple;
        }
      }

      &.tuesday {
        background-color: orange;
        &:hover {
          background-color: orange;
        }
      }

      &.saturday {
        background-color: yellow;
        &:hover {
          background-color: yellow;
        }
      }

      &:hover {
        background-color: #999;
      }

    }
    td {
      height: 40px;
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
