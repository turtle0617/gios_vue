import axios from "axios";
import router from "./router";

const domain = "https://turtleeat.club/api/api";

const responseHandler = {
  "200": res => {
    const hasError = res.data.hasOwnProperty("error");
    if (hasError) return Promise.reject(res.data);
    Promise.resolve(res);
  },
  "201": res => Promise.resolve(res),
  "401": res => {
    if (res.data.error.includes("not exist")) {
      alert("登入過期，請重新登入");
      router.push({
        name: "home",
        params: {
          tokenExist: true
        }
      });
    }
    return Promise.reject(res.data.error);
  },
  "422": res => {
    if (res.data.error) return Promise.reject(res.data.error);
    if (res.data.message) return Promise.reject(res.data.message);
    return Promise.reject(res.data);
  },
  "500": res => {
    alert("伺服器錯誤，請聯絡管理員");
    return Promise.reject(res.data.error);
  }
};

function exceptionResponseHandler(res) {
  if (res.status === 200) {
    return Promise.resolve(res);
  } else {
    return Promise.reject(res);
  }
}
axios.defaults.headers.common["Content-Security-Policy"] =
  "upgrade-insecure-requests";

function GET(url, token, param) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  var userRequest;
  if (param) {
    userRequest = axios.get(domain + url, {
      params: param
    });
  } else {
    userRequest = axios.get(domain + url);
  }
  return userRequest
    .catch(res => res.response)
    .then(
      res => responseHandler[res.status](res) || exceptionResponseHandler(res)
    );
}

function PATCH(url, token, data) {
  if (!token) throw new Error("no Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios
    .patch(domain + url, data)
    .catch(res => res.response)
    .then(
      res => responseHandler[res.status](res) || exceptionResponseHandler(res)
    );
}

function POST(url, token, data) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios
    .post(domain + url, data)
    .catch(res => res.response)
    .then(
      res => responseHandler[res.status](res) || exceptionResponseHandler(res)
    );
}

function DELETE(url, id, token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios
    .delete(domain + url + "/" + id)
    .catch(res => res.response)
    .then(
      res => responseHandler[res.status](res) || exceptionResponseHandler(res)
    );
}

export default {
  DELETE,
  GET,
  POST,
  PATCH
};
