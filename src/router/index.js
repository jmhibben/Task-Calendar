import Vue from 'vue'
import Router from 'vue-router'
import Calendar from '@/components/Calendar'
import Weekly from '@/components/Weekly'
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
      path: '/week',
      name: 'Weekly View',
      component: Weekly
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/task/:eventID',
      name: 'TaskEvent',
      component: Task
    }
  ]
})
