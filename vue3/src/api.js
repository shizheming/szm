import axios from "axios";
import VueCookies from "vue-cookies";
axios.defaults.headers.common["Authorization"] = VueCookies.get("token");
export default axios;
