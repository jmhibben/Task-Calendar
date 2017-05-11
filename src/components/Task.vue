<template>
  <div class="content">
  <header>Edit Event</a></header>
  <nav>
    <a href="#/" class="button prev">Calendar View</a>
    <a href="#/week" class="button next">Weekly View</a>
  </nav>
  <article>
    <form>
      <div id="label">Name of Event: <input id="textbox" type='textarea' placeholder="Name of Event"></div>
      <br>

      <div id="label">
      Description:&nbsp&nbsp <textarea id="textbox" style="resize:none"placeholder="Description Here"></textarea>
      </div><br>

      <div id="label">Start Time: <select name="startTime">
      <option value="time" v-for="n in 12">{{n}}:00</option>
      </select>&nbsp&nbsp

      <select name="dayornight">
      <option value="am">am</option>
      <option value="am">pm</option>
      </select></div>&nbsp&nbsp&nbsp

      <div id="label">End Time: <select name="endTime">
      <option value="" v-for="n in 12">{{n}}:00</option>
      </select>&nbsp&nbsp<select name="dayornight">
      <option value="am">pm</option>
      <option value="am">am</option>
      </select></div>
      <br>

      <div id="label">Color: <select name="colors">
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="yellow">Yellow</option>
      <option value="green">Green</option>
      <option value="purple">Purple</option>
      <option value="grey">Grey</option>
      </select></div>
      <br>

      <div><input type="submit" value="Submit"></div>
    </form>
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

    form {
    width: 80%;
    margin: 10% auto;
    }

    form.div {
    display: inline-block;
    }

    #label, #input{
    width: 50%;
    position:relative;
    text-align: left;
    }
}
</style>
