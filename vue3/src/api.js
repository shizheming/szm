import axios from "axios";
import VueCookies from "vue-cookies";
axios.defaults.headers.common["Authorization"] = VueCookies.get("token");
let a = { ...axios };
a.get = function (...data) {
  return axios.get(...data).then(({ data }) => {
    if (data.code === 401) {
      VueCookies.remove("token");
      location.reload();
    } else {
      return data;
    }
  });
};
a.post = function (...data) {
  return axios.post(...data).then(({ data }) => {
    if (data.code === 401) {
      VueCookies.remove("token");
      location.reload();
    } else {
      return data;
    }
  });
};
a.delete = function (...data) {
  return axios.delete(...data).then(({ data }) => {
    if (data.code === 401) {
      VueCookies.remove("token");
      location.reload();
    } else {
      return data;
    }
  });
};
export default a;
