import Vue from "vue";
import Vuex from "vuex";
import API from "./axios.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("api_token") || null,
    login_role: localStorage.getItem("login_role") || "guest",
    member_profile: JSON.parse(localStorage.getItem("user_profile")) || null,
    user_id: localStorage.getItem("user_id") || null,
    groups: JSON.parse(localStorage.getItem("groups")) || null
  },
  getters: {
    loggedIn(state) {
      return state.login_role;
    },
    groups(state) {
      return state.groups;
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
    updateGroups(state, data) {
      state.groups[data.index] = data.change_group;
    },
    destroyAuthDetail(state) {
      state.token = null;
      state.login_role = "guest";
      state.user_id = null;
    }
  },
  actions: {
    async register(context, data) {
      try {
        let res = await API.Register("/member", data);
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async addGroup({ state, dispatch }, data) {
      try {
        let res = await API.POST("/groups", state.token, data);
        if (typeof res.data === "string") throw res;
        dispatch("retrieveGroups");
      } catch (e) {
        throw e.response.data.message;
      }
    },
    async updateGroups({ state, dispatch }, data) {
      try {
        let res = await API.PATCH(
          `/groups/${data.id}`,
          state.token,
          data.change_group
        );
        if (typeof res.data === "string") throw res;
        dispatch("retrieveGroups");
      } catch (e) {
        throw e;
      }
    },
    async deleteGroup({ state, dispatch }, group_id) {
      try {
        let res = await API.DELETE("/groups", group_id, state.token);
        dispatch("retrieveGroups");
        return res;
      } catch (e) {
        dispatch("retrieveGroups");
        throw e;
      }
    },
    async retrieveGroups(context) {
      try {
        let { data } = await API.GET("/groups");
        localStorage.setItem("groups", JSON.stringify(data));
        context.commit("retrieveGroups", data);
        return data;
      } catch (e) {
        throw e;
      }
    },
    async updateMemberProfile({ commit, state }, profile) {
      try {
        let { data } = API.PATCH(
          `/member/${state.user_id}`,
          state.token,
          profile
        );
        if (typeof data === "string") throw data;
        commit("initialMemberProfile", data);
      } catch (e) {
        throw e;
      }
    },
    async retrieveMemberToken(context, credentials) {
      try {
        let { data } = await API.Login("/member/login", credentials);
        if (typeof data === "string") throw data;
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
      } catch (e) {
        throw e;
      }
    },
    async retrieveBossToken(context, credentials) {
      try {
        let { data } = await API.Login("/boss/login", credentials);
        if (typeof data === "string") throw data;
        const auth_detail = {
          id: data.id,
          api_token: data.api_token,
          role: "boss"
        };
        localStorage.setItem("user_id", auth_detail.id);
        localStorage.setItem("api_token", auth_detail.api_token);
        localStorage.setItem("login_role", auth_detail.role);
        context.commit("initialAuthDetail", auth_detail);
        return data;
      } catch (e) {
        throw e;
      }
    },
    async destroyAuthDetail({ commit, state }, role) {
      const url = `/${role}/logout`;
      try {
        let res = API.DELETE(url, state.user_id, state.token);
        localStorage.clear();
        commit("destroyAuthDetail");
        return res;
      } catch (e) {
        commit("destroyAuthDetail");
        throw e;
      }
    }
  }
});
