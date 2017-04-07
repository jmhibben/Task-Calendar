<template>
  <div id="app">
    <router-view></router-view>
    <button class="fab">+</button>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
