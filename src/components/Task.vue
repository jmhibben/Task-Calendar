<template>
  <div class="content">
  <header>Week of 04-02-2017</header>
  <nav>
    <a class="button prev">Previous</a>
    <a class="button next">Next</a>
  </nav>
  <article>
    <form>
      Name of Event: <input type='textarea'>
      <br><br>
      Start Time:<select name="startTime">
      <option value="time"> 12:00</option>
      <option value="time"> 1:00</option>
      <option value="time"> 2:00</option>
      <option value="time"> 3:00</option>
      <option value="time"> 4:00</option>
      <option value="time"> 5:00</option>
      <option value="time"> 6:00</option>
      <option value="time"> 7:00</option>
      <option value="time"> 8:00</option>
      <option value="time"> 9:00</option>
      <option value="time"> 10:00</option>
      <option value="time"> 11:00</option>
      </select>&nbsp&nbsp<select name="dayornight">
      <option value="am">am</option>
      <option value="am">pm</option>
      </select>&nbsp&nbsp&nbsp
      End Time:<select name="endTime">
      <option value="time"> 12:00</option>
      <option value="time"> 1:00</option>
      <option value="time"> 2:00</option>
      <option value="time"> 3:00</option>
      <option value="time"> 4:00</option>
      <option value="time"> 5:00</option>
      <option value="time"> 6:00</option>
      <option value="time"> 7:00</option>
      <option value="time"> 8:00</option>
      <option value="time"> 9:00</option>
      <option value="time"> 10:00</option>
      <option value="time"> 11:00</option>
      </select>&nbsp&nbsp<select name="dayornight">
      <option value="am">pm</option>
      <option value="am">am</option>
      </select><br><br><br>
      Color: <select name="colors">
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
      <option value="purple">Purple</option>
      <option value="grey">Grey</option>
      </select><br><br><br><br><br>
       <input type="submit" value="Submit">
    </form>
  </article>
  <button class="fab">+</button>
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
    background-color: teal;
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
