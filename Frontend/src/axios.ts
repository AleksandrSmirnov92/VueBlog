import axios from "axios";
const user = JSON.parse(window.localStorage.getItem("user")!);

// axios.defaults.baseURL = "http://localhost:9999";
axios.defaults.baseURL = "https://vueblog-332d.onrender.com";
if (user) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}
