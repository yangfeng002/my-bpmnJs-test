import HttpRequest from '../lib/axios'
import Vue from "vue"

const axios = Vue.prototype.$axios || new HttpRequest()

export default axios
