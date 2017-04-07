<template>
<div class="content">
<header>Week of 04-02-2017</header>
<nav>
  <a class="button prev">Previous</a>
  <a class="button next">Next</a>
</nav>
<article>
  <table>
    <tr>
      <th class="primaryRow">Hour</th>
      <th class="primaryRow">Monday</th>
      <th class="primaryRow">Tuesday</th>
      <th class="primaryRow">Wednesday</th>
      <th class="primaryRow">Thursday</th>
      <th class="primaryRow">Friday</th>
      <th class="primaryRow">Saturday</th>
      <th class="primaryRow">Sunday</th>
    </tr>
    <tr>
      <td><span>8:00 AM</span></td>
      <td class="overlap monday"><span>Doctor's Appointment</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>9:00 AM</span></td>
      <td class="alternateRow monday"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow overlap saturday"><span>Karate Tournament</span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>10:00 AM</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td class="overlap saturday"><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>11:00 AM</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow overlap saturday"><span></span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>12:00 PM</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td class="overlap saturday"><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>1:00 PM</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow overlap saturday"><span></span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>2:00 PM</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td class="overlap saturday"><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>3:00 PM</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow overlap saturday"><span></span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>4:00 PM</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td class="overlap saturday"><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>5:00 PM</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow overlap saturday"><span></span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>6:00 PM</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td class="saturday"><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>7:00 PM</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow overlap tuesday"><span>Bowling practice</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>8:00 PM</span></td>
      <td><span></span></td>
      <td class="overlap tuesday"><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>9:00 PM</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow tuesday"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>10:00 PM</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
    </tr>
    <tr>
      <td class="alternateRow"><span>11:00 PM</span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
      <td class="alternateRow"><span></span></td>
    </tr>
    <tr>
      <td><span>12:00 PM</span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
      <td><span></span></td>
    </tr>
  </table>
</article>
</div>
</template>

<script>
export default {}
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

  th, td {
    border-bottom: 1px solid black;
    border-right: 1px solid black;
    padding: 10px;
    text-align: left;
    vertical-align: top;
    width: 100px;

    &.primaryRow {
      background-color: #888;
    }

    &.alternateRow {
      background-color: #aaa;
    }

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
