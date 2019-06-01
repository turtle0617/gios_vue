import axios from "axios";

const domain = "http://private-66bd2d-turtle0617.apiary-mock.com";
function Login(url, credentials) {
  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
  return axios
    .post(
      domain + url,
      {
        account: credentials.useraccount,
        password: credentials.password
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
        name: data.username,
        account: data.useraccount,
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

function Logout(url, token) {
  axios.defaults.headers.common["Authorization"] = token;
  return axios
    .delete(domain + url)
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
