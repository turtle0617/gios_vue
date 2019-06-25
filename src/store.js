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
    groups: JSON.parse(localStorage.getItem("groups")) || null,
    daily_menu: JSON.parse(localStorage.getItem("daily_menu")) || null
  },
  getters: {
    loggedIn(state) {
      return state.login_role;
    },
    groups(state) {
      return state.groups;
    },
    daily_menu(state) {
      return state.daily_menu;
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
    retrieveDailyMenu(state, menu) {
      state.daily_menu = menu;
    },
    updateDailyMenu(state, meal) {
      const index = state.daily_menu.findIndex(item => {
        return (item["id"] = meal["id"]);
      });
      if (!meal["flavors"]) meal["flavors"] = [];

      console.log("commit updateDailyMenu", meal, state.daily_menu[index]);
      state.daily_menu[index] = meal;
      console.log("commit success", state.daily_menu[index]);
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
        throw e.response.data.message;
      }
    },
    async retrieveDailyMenu({ state, commit }, date) {
      try {
        let { data } = await API.GET("/dailymenu", state.token, date);
        localStorage.setItem("daily_menu", JSON.stringify(data));
        commit("retrieveDailyMenu", data);
        return data;
      } catch (e) {
        throw e.response.data.message;
      }
    },
    async addDailyMenu({ state }, data) {
      try {
        let res = await API.POST("/menus", state.token, data);
        if (typeof res.data === "string") throw res;
        return res.data.id;
      } catch (e) {
        throw e.response.data.message;
      }
    },
    async addMenuFlavor({ state }, data) {
      try {
        console.log("action add flavor");
        let res = await API.POST("/flavors", state.token, data);
        if (typeof res.data === "string") throw res;
        return res;
      } catch (e) {
        throw e.response.data.message;
      }
    },
    async updateDailyMenu({ state, commit }, data) {
      try {
        let res = await API.PATCH(
          `/menus/${data.meal_id}`,
          state.token,
          data.change_meal
        );
        if (typeof res.data === "string") throw res;
        console.log("res", res.data);
        commit("updateDailyMenu", res.data);
        return res;
      } catch (e) {
        throw e.response.data.message;
      }
    },
    async updateMenuFlavor({ state, commit }, data) {
      try {
        console.log("action updateMenuFlavor");
        let res = await API.PATCH(
          `/flavors/${data.flavor_id}`,
          state.token,
          data.change_flavor
        );
        if (typeof res.data === "string") throw res;
        commit("updateDailyMenu", res.data);
      } catch (e) {
        throw e.response.data.message;
      }
    },
    async deleteDailyMeal({ state }, meal_id) {
      try {
        let res = await API.DELETE("/menus", meal_id, state.token);
        return res;
      } catch (e) {
        throw e;
      }
    },
    async deleteFlavor({ state }, flavor_id) {
      try {
        let res = await API.DELETE("/flavors", flavor_id, state.token);
        return res;
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
        console.log("retrieveGroups");
        let { data } = await API.GET("/groups");
        console.log("retrieveGroups data");
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
