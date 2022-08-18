import Axios from 'axios'
class HttpRequest {
  constructor () {
    this.instance = Axios.create({
      timeout: 35000,
      withCredentials: true
    })
    this.instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    // 请求发起时拦截器
    this.interceptors()
    // 挂载原 axios get post 方法 (请留意这里的写法 为何未出this异常)
    // this.get = this.instance.get
    this.post = this.instance.post
  }
  /**
   * 当前实例的所有请求将被统一拦截处理
   * autor: caoguangyao
   * */
  interceptors() {
    this.instance.interceptors.response.use(res => {
      const { data } = res

      return data
    }, err => {
      if (err.response && err.response.status) {
        const { status } = err.response
        if (status === 401) {
          return Promise.reject(err)
        }
      }
      return Promise.reject(err)
    })
  }

  request(options) {
    const contentType = 'application/json;charset=UTF-8'
    if (options.url) { // 以真实url 访问
      options.method = options.method || 'POST'
    } else {
      options.method = (options.url.indexOf('json') !== -1) ? 'get' : (options.method || 'post')
    }
    if (options.contentType) {
      options.headers = {
        ...(options.headers || {}),
        'Content-Type': options.contentType
      }
    } else {
      options.headers = {
        ...(options.headers || {}),
        'Content-Type': contentType
      }
    }

    // 不需要拦截
    return this.instance(options)
  }
}

export default HttpRequest
