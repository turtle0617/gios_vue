import axios from "axios";

const domain = "http://3.130.129.213/api";

const responseHandler = {
  "200": res => {
    const hasError = res.data.hasOwnProperty("error");
    if (hasError) return Promise.reject(res.data);
    Promise.resolve(res);
  },
  "422": res => {
    return Promise.reject(res.data.error);
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

function GET(url, token, param) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (param)
    return axios.get(domain + url, {
      params: param
    });
  return axios
    .get(domain + url)
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
