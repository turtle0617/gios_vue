import axios from "axios";

// const domain = "http://private-66bd2d-turtle0617.apiary-mock.com";
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
  return axios
    .post(domain + url, {
      account: credentials.account,
      password: credentials.password
    })
    .then(res => {
      if (typeof res.data === "string") throw res.data;
      return res.data;
    })
    .catch(err => {
      throw new Error(err);
    });
}

function Register(url, data) {
  return axios
    .post(domain + url, {
      name: data.name,
      account: data.account,
      password: data.password,
      group_id: data.group_id
    })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw new Error(err);
    });
}

function DELETE(url, id, token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios
    .delete(domain + url + "/" + id)
    .then(({ state }) => {
      return state;
    })
    .catch(err => {
      throw new Error(err);
    });
}

export default {
  Login,
  Register,
  DELETE,
  GET,
  POST,
  PATCH
};
