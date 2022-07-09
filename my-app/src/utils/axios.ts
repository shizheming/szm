import axios from "axios";
import { message } from "ant-design-vue";
import vueCookie from "vue-cookies";

export function setAxiosHeader(data: { token: string }) {
  axios.defaults.headers.token = data.token;
  axios.defaults.headers.authorization = data.token;
}

let baseURL = "";
// 添加环境
if (import.meta.env.PROD === true) {
  axios.env = "prod";
  baseURL = "//mobile-api.towngasvcc.com";
} else {
  if (import.meta.env.VITE_ENV === "dev") {
    axios.env = "dev";
  } else if (import.meta.env.VITE_ENV === "st1") {
    baseURL = "//st1-api.mingqijia.com";
    axios.env = "st1";
  } else if (import.meta.env.VITE_ENV === "st2") {
    baseURL = "//st2-api.mingqijia.com";
    axios.env = "st2";
  } else if (import.meta.env.VITE_ENV === "st3") {
    baseURL = "//st3-api.mingqijia.com";
    axios.env = "st3";
  } else if (import.meta.env.VITE_ENV === "st4") {
    baseURL = "//st4-api.mingqijia.com";
    axios.env = "st4";
  }
}

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 4000;
axios.defaults.headers["Content-Type"] = "application/json";

// 开发环境联调需要带上的开发分支
// axios.defaults.headers.branchname = "feature_data_board_20220510";

/* // 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
}); */

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code !== 0) {
      message.error(response.data.msg);
      // 登陆过期
      if (response.data.code == 10000) {
        vueCookie.remove("token");
        setTimeout(() => {
          location.href = `${location.origin}/login?path=${location.pathname}`;
        });
      }
      return Promise.reject();
    }
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    switch (error.response?.status) {
      case 400:
        error.message = "请求错误:400";
        break;
      case 401:
        error.message = "未授权，请登录:401";
        break;
      case 403:
        error.message = "拒绝访问:403";
        break;
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}:404`;
        break;
      case 405:
        error.message = "请求方式不正确:405";
        break;
      case 408:
        error.message = "请求超时:408";
        break;
      case 500:
        error.message = "服务器内部错误:500";
        break;
      case 501:
        error.message = "服务未实现:501";
        break;
      case 502:
        error.message = "网关错误:502";
        break;
      case 503:
        error.message = "服务不可用:503";
        break;
      case 504:
        error.message = "网关超时:504";
        break;
      case 505:
        error.message = "HTTP版本不受支持:505";
        break;
      default:
        break;
    }
    message.error(error.message);
    return Promise.reject(error);
  }
);

export default axios;
