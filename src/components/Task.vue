<template>
  <div class="container">
  <h6>{{title}} {{$route.params.id}}</h6>
  <nav>
    <router-link to="/calendar" class="button">Calendar</router-link>
    <router-link to="/Week" class="button">Week</router-link>
  </nav>
  <article>
    <form id="taskForm">
      <div id="label">Name of Event: <input id="textbox" v-model="eventName" placeholder="Name of Event Here"></input></div>
      <div id="label">
      Description:&nbsp&nbsp <input id="textbox" v-model="desc" placeholder="Description of Event Here"></input>
    </div>

      <div id="label">Start Time:
      <select v-model="startN">
      <option>12:00</option>
      <option v-for="n in 11">{{n}}:00</option>
      </select>&nbsp&nbsp

      <select v-model="selectedStart">
      <option>AM</option>
      <option>PM</option>
      </select></div>

      <div id="label">End Time:
      <select v-model="endN">
      <option>12:00</option>
      <option v-for="n in 11">{{n}}:00</option>
      </select>&nbsp&nbsp

      <select v-model="selectedEnd">
      <option>PM</option>
      <option>AM</option>
      </select></div>


      <div id="label">Color:
      <select v-model="selectedColor">
      <option>Red</option>
      <option>Blue</option>
      <option>Yellow</option>
      <option>Orange</option>
      <option>Purple</option>
      <option>Green</option>
      </select></div>
      <button type='submit' class='button' v-on:click='submitForm'>Submit</button>
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
@import "../assets/skeleton/skeleton.scss";
</style>
