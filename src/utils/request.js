import axios from 'axios';
import { Loading, MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

// 创建一个 axios 实例
const service = axios.create({
  baseURL: 'https://api.yhjerp.com', // url = base url + request url
  timeout: 5000 // 请求超时时间
});

// 用于存储 loading 实例
let loadingInstance = null;

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 显示 loading
    loadingInstance = Loading.service({
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.7)' // 自定义 loading 背景色
    });

    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${getToken()}`; // 添加 token
    }
    return config;
  },
  error => {
    // 处理请求错误
    console.log(error);
    if (loadingInstance) {
      loadingInstance.close(); // 隐藏 loading
    }
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log(res.code, 11)

    if (res.code != 200) {

      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      });

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }
      if (loadingInstance) {
        loadingInstance.close(); // 隐藏 loading
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      if (loadingInstance) {

        loadingInstance.close(); // 隐藏 loading
      }
      return res;
    }
  },
  error => {
    console.log('err' + error);
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    });
    if (loadingInstance) {
      loadingInstance.close(); // 隐藏 loading
    }
    return Promise.reject(error);
  }
);

export default service;
