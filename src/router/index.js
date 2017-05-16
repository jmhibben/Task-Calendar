import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Weekly from '@/components/Weekly'
import Task from '@/components/Task'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/week',
      name: 'Weekly View',
      component: Weekly
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    }
  ]
})
