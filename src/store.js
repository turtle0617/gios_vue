import Vue from "vue";
import Vuex from "vuex";
import API from "./axios.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("api_token") || null,
    login_role: localStorage.getItem("login_role") || null,
    member_profile: JSON.parse(localStorage.getItem("user_profile")) || null,
    user_id: localStorage.getItem("user_id") || null,
    groups: JSON.parse(localStorage.getItem("groups")) || null
  },
  getters: {
    loggedIn(state) {
      return state.login_role;
    }
  },
  mutations: {
    initialAuthDetail(state, auth_detail) {
      state.token = auth_detail.api_token;
      state.login_role = auth_detail.role;
      state.user_id = auth_detail.id;
    },
    initialMemberProfile(state, data) {
      const profile = {
        name: data.name,
        account: data.account,
        rice: data.rice,
        vegetable: data.vegetable,
        group_id: data.group_id,
        note: data.note
      };
      localStorage.setItem("user_profile", JSON.stringify(profile));
      state.member_profile = profile;
    },
    retrieveGroups(state, groups) {
      state.groups = groups;
    },
    destroyAuthDetail(state) {
      state.token = null;
      state.login_role = null;
      state.user_id = null;
    }
  },
  actions: {
    register(context, data) {
      return new Promise(function(resolve, reject) {
        API.Register("/member", data)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addGroup({ state, dispatch }, data) {
      return new Promise(function(resolve, reject) {
        API.POST("/groups", state.token, data)
          .then(res => {
            if (typeof res.data === "string") throw res.data;
            dispatch("retrieveGroups");
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteGroup({ state, dispatch }, group_id) {
      return new Promise(function(resolve, reject) {
        API.DELETE("/groups", group_id, state.token)
          .then(res => {
            dispatch("retrieveGroups");
            resolve(res);
          })
          .catch(err => {
            dispatch("retrieveGroups");
            reject(err);
          });
      });
    },
    retrieveGroups(context) {
      API.GET("/groups")
        .then(({ data }) => {
          localStorage.setItem("groups", JSON.stringify(data));
          context.commit("retrieveGroups", data);
        })
        .catch(err => {
          throw new Error(err);
        });
    },
    updateMemberProfile({ commit, state }, profile) {
      return new Promise(function(resolve, reject) {
        API.PATCH(`/member/${state.user_id}`, state.token, profile)
          .then(res => {
            if (typeof res.data === "string") throw res.data;
            commit("initialMemberProfile", res.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    retrieveMemberToken(context, credentials) {
      return new Promise(function(resolve, reject) {
        API.Login("/member/login", credentials)
          .then(data => {
            const auth_detail = {
              id: data.id,
              api_token: data.api_token,
              role: "member"
            };
            localStorage.setItem("user_id", auth_detail.id);
            localStorage.setItem("api_token", auth_detail.api_token);
            localStorage.setItem("login_role", auth_detail.role);
            context.commit("initialAuthDetail", auth_detail);
            context.commit("initialMemberProfile", data);
            context.dispatch("retrieveGroups");
            resolve("success");
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    retrieveBossToken(context, credentials) {
      return new Promise(function(resolve, reject) {
        API.Login("/boss/login", credentials)
          .then(data => {
            const auth_detail = {
              id: data.id,
              api_token: data.api_token,
              role: "boss"
            };
            localStorage.setItem("user_id", auth_detail.id);
            localStorage.setItem("api_token", auth_detail.api_token);
            localStorage.setItem("login_role", auth_detail.role);
            context.commit("initialAuthDetail", auth_detail);
            context.dispatch("retrieveGroups");
            resolve("success");
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    destroyAuthDetail({ commit, state }, role) {
      const url = `/${role}/logout`;
      return new Promise(function(resolve, reject) {
        API.DELETE(url, state.user_id, state.token)
          .then(res => {
            localStorage.clear();
            commit("destroyAuthDetail");
            resolve("logout success", res);
          })
          .catch(err => {
            commit("destroyAuthDetail");
            reject(err);
          });
      });
    }
  }
});
