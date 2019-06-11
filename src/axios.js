import axios from "axios";

const domain = "http://private-66bd2d-turtle0617.apiary-mock.com";
// const domain = "http://3.130.129.213/api";

function Login(url, credentials) {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Expose-Headers": "Location"
    }
  };
  return axios
    .post(
      domain + url,
      {
        account: credentials.account,
        password: credentials.password
      },
      config
    )
    .then(res => {
      return res.data;
    })
    .catch(err => {
      return err;
    });
}

function Register(url, data) {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
  return axios
    .post(
      domain + url,
      {
        name: data.name,
        account: data.account,
        password: data.password
      },
      config
    )
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      return err;
    });
}

function Logout(url, id, token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios
    .delete(domain + url + "/" + id)
    .then(({ state }) => {
      return state;
    })
    .catch(err => {
      return err;
    });
}

export default {
  Login,
  Register,
  Logout
};
