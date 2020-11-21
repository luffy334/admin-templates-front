import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, setToken } from '@/utils/auth'
import * as router from "vue-router";

const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API,
  baseURL: 'http://127.0.0.1:8888/',
  timeout: 5000
})

service.interceptors.request.use(
    config => {
      if (getToken()) {
        config.headers['Authorization'] = getToken()
      }
      if (config.method === 'post' || config.method === 'put') {
        console.log(11111)
        config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      }
      return config
    },
    error => {
      console.log(error)
      return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
      const res = response.data
      console.log(111111, res)
      if (res.resultCode === 10106) {
        console.log(1111)
        setToken("");
        router.replace({
          path: 'login'
        })
      } else if (res.resultCode !== 10000) {
        Message({
          message: res.resultMsg || 'Error',
          type: 'error',
          duration: 3000
        })
      } else {
        return res.data
      }
    },
    error => {
      console.log('err' + error) // for debug
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
)

export default service