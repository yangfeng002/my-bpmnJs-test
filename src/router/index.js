import Vue from "vue"
import VueRouter from "vue-router"
import WorkFlow from '../WorkFlow'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: WorkFlow
  }
]

const router = new VueRouter({
  routes
})

export default router
