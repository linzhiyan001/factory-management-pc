import { Notification } from 'element-ui';

// 创建一个通知插件
const NotificationPlugin = {
  install(Vue) {
    Vue.prototype.$notifySuccess = (message) => {
      Notification({
        title: '成功',
        message: message,
        type: 'success',
        duration: 3000 // 提示显示时间，单位是毫秒
      });
    };

    Vue.prototype.$notifyError = (message) => {
      Notification({
        title: '错误',
        message: message,
        type: 'error',
        duration: 3000 // 提示显示时间，单位是毫秒
      });
    };
  }
};

export default NotificationPlugin;
