import Vue from "vue"
import HttpRequest from '@/lib/axios'

const axios = Vue.prototype.$axios || new HttpRequest()

export default axios
