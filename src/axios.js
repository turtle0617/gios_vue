import axios from "axios";

const domain = "http://3.130.129.213/api";

function GET(url, token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.get(domain + url);
}

function PATCH(url, token, data) {
  if (!token) throw new Error("no Token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.patch(domain + url, data);
}

function POST(url, token, data) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axios.post(domain + url, data);
}

function Login(url, credentials) {
  return axios.post(domain + url, {
    account: credentials.account,
    password: credentials.password
  });
}

function Register(url, data) {
  return axios.post(domain + url, {
    name: data.name,
    account: data.account,
    password: data.password,
    group_id: data.group_id
  });
}

function DELETE(url, id, token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.delete(domain + url + "/" + id);
}

export default {
  Login,
  Register,
  DELETE,
  GET,
  POST,
  PATCH
};
