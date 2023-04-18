import axios from 'axios';
import { message } from 'ant-design-vue';
import vueCookie from 'vue-cookies';

export function setAxiosHeader(data: { token: string }) {
  axios.defaults.headers.Token = data.token;
  axios.defaults.headers.Authorization = data.token;
  axios.defaults.headers['X-ACCOUNT-TYPE'] = 'M';
}

let baseURL = '';
// 添加环境
if (import.meta.env.PROD === true) {
  axios.env = 'prod';
  baseURL = '//mobile-api.towngasvcc.com';
} else {
  if (import.meta.env.VITE_ENV === 'dev') {
    axios.env = 'dev';
  } else if (import.meta.env.VITE_ENV === 'st1') {
    baseURL = '//st1-api.mingqijia.com';
    axios.env = 'st1';
  } else if (import.meta.env.VITE_ENV === 'st2') {
    baseURL = '//st2-api.mingqijia.com';
    axios.env = 'st2';
  } else if (import.meta.env.VITE_ENV === 'st3') {
    baseURL = '//st3-api.mingqijia.com';
    axios.env = 'st3';
  } else if (import.meta.env.VITE_ENV === 'st4') {
    baseURL = '//st4-api.mingqijia.com';
    axios.env = 'st4';
  }
}

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 4000;
axios.defaults.headers['Content-Type'] = 'application/json';

// 开发环境联调需要带上的开发分支
// axios.defaults.headers.branchname = "feature_data_board_20220510";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log(config, 193);

    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code !== 0) {
      message.error(response.data.msg);
      // 登陆过期
      if (
        response.data.code == 401 ||
        response.data.code == 403 ||
        response.data.code === 10000000
      ) {
        vueCookie.remove('token');
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
        error.message = '请求错误:400';
        break;
      case 401:
        error.message = '未授权，请登录:401';
        break;
      case 403:
        error.message = '拒绝访问:403';
        break;
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}:404`;
        break;
      case 405:
        error.message = '请求方式不正确:405';
        break;
      case 408:
        error.message = '请求超时:408';
        break;
      case 500:
        error.message = '服务器内部错误:500';
        break;
      case 501:
        error.message = '服务未实现:501';
        break;
      case 502:
        error.message = '网关错误:502';
        break;
      case 503:
        error.message = '服务不可用:503';
        break;
      case 504:
        error.message = '网关超时:504';
        break;
      case 505:
        error.message = 'HTTP版本不受支持:505';
        break;
      default:
        break;
    }

    message.error(error.message);
    return Promise.reject(error);
  }
);

export default axios;

/* 
解决重复请求的问题
首先定义重复请求，相同的请求就是重复请求，定义重复请求必须做处理
何为相同的请求
1.相同的地址，相同的参数
这种情况就是重复请求
何为不同请求
2.接口地址不一样
3.接口地址一样，但入参不一样
这2种情况就是不同请求

1，3的情况，并发的请求放在队列里面，等第一个请求回来以后把结果塞到其他的接口里面
（
之前考虑的不同的地方的相同请求也区分，不太合理，
因为即使在页面里面打点写名字，也有遇到多个按钮复用一个api方法调用，
在不传参告诉请求函数的时候是不知道哪个是哪个的，
当然可以告诉，但是这个就耦合在业务逻辑里面，而且对逻辑代码没有任何意义，
超出了请求函数的范畴了，
所以结论是重复请求不能砍，不知道是哪里来的，所以就队列等第一个回来，塞到后面去
）
 */

/* 
权限：
现在就ok的解决方式就是页面标签写名字，保证唯一性得方法就是用个方法生成一串唯一得id，最简单得就是时间戳，然后写上去，就能保证唯一性了，
之前想的，不加名字在底层组件自动创建，不太可能，不是不能创建唯一的，只是创建出来还是不知道哪个是哪个，
我想了好几种方式，比如在路由，组件名的基础上打索引，但还是很难知道哪个是哪个，
又想到了最终文件里面的代码行数，觉得很好，但是有发现如果这段代码是自动生成的，就不靠谱了，
*/
