import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Task from '@/components/Task'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/calendar',
      name: 'Calendar',
      component: Calendar
    },
    {
      path: '/task',
      name: 'Task',
      component: Task

    }
  ]
})
