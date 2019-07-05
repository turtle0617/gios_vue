import axios from "axios";

const domain = "http://3.130.129.213/api";

function GET(url, token, param) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  if (param) return axios.get(domain + url, { params: param });
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

function DELETE(url, id, token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios.delete(domain + url + "/" + id);
}

export default {
  DELETE,
  GET,
  POST,
  PATCH
};
