<template>
  <div class="content">
  <header>{{title}} {{$route.params.id}}</a></header>
  <nav>
    <router-link to="/" class="button prev">Calendar View</router-link>
    <router-link to="/Week" class="button next">Weekly View</router-link>
  </nav>
  <article>
    <form id="taskForm">
      <p id="label">Name of Event: <textarea id="textbox" v-model="eventName" placeholder="Name of Event Here">{{eventName}}</textarea></p>
      <br><br>

      <p id="label">
      Description:&nbsp&nbsp <textarea id="textbox" v-model="desc" placeholder="Description of Event Here">{{desc}}</textarea>
    </p><br><br>

      <div id="label">Start Time:
      <select v-model="startN">
      <option>12:00</option>
      <option v-for="n in 11">{{n}}:00</option>
      </select>&nbsp&nbsp

      <select v-model="selectedStart">
      <option>AM</option>
      <option>PM</option>
      </select></div><br>

      <div id="label">End Time:
      <select v-model="endN">
      <option>12:00</option>
      <option v-for="n in 11">{{n}}:00</option>
      </select>&nbsp&nbsp

      <select v-model="selectedEnd">
      <option>PM</option>
      <option>AM</option>
      </select></div><br>


      <div id="label">Color:
      <select v-model="selectedColor">
      <option>Red</option>
      <option>Blue</option>
      <option>Yellow</option>
      <option>Orange</option>
      <option>Purple</option>
      <option>Green</option>
      </select></div><br>
      <button type='submit' class='btn btn-default' v-on:click='submitForm'>Submit</button>
    </form>
  </article>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Add Event',
        eventName: '',
        desc: '',
        startN: '12:00',
        selectedStart: 'AM',
        selectedEnd: 'PM',
        endN: '12:00',
        selectedColor: 'Red'
      }
    },
    methods: {
      submitForm: function () {
        document.getElementById('taskForm').submit()
        setTimeout(1000)
        console.log(
          'Name: ' + this.eventName,
          'Start Time: ' + this.startN + ' ' + this.selectedStart,
          'End Time: ' + this.endN + ' ' + this.selectedEnd,
          'Color: ' + this.selectedColor
        )
      }
    }
  }
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

    textarea {
    resize: none;
    float: right;
    width: 50%;
    }

}
</style>
