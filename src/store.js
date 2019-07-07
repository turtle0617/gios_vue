import Vue from "vue";
import Vuex from "vuex";
import API from "./axios.js";
import Date from "./assets/js/date.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("api_token") || null,
    login_role: localStorage.getItem("login_role") || "guest",
    member_profile: JSON.parse(localStorage.getItem("user_profile")) || null,
    user_id: localStorage.getItem("user_id") || null,
    groups: JSON.parse(localStorage.getItem("groups")) || null,
    daily_menu: JSON.parse(localStorage.getItem("daily_menu")) || null,
    member_daily_menu:
      JSON.parse(localStorage.getItem("member_daily_menu")) || null,
    order_detail_statistic:
      JSON.parse(localStorage.getItem("order_detail_statistic")) || [],
    purchase_list: [],
    boss_history_statistic: {},
    boss_menu_statistic: {},
    member_history_list: {},
    date_range: 7,
    week_range: 4
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
    },
    purchase_list(state) {
      return state.purchase_list.sort((a, b) => a.menu_id - b.menu_id);
    },
    member_history_list(state) {
      if (!Object.keys(state.member_history_list).length) return {};
      state.member_history_list.list = state.member_history_list.list.map(
        item => {
          item.menu_date = Date.parse(item.menu_date).toString("MM/dd");
          return item;
        }
      );
      return state.member_history_list;
    },
    boss_history_statistic(state) {
      const isEmpty = !Object.keys(state.boss_history_statistic).length;
      if (isEmpty) return false;
      return state.boss_history_statistic;
    },
    boss_menu_statistic(state) {
      const isEmpty = !Object.keys(state.boss_menu_statistic).length;
      if (isEmpty) return false;
      return state.boss_menu_statistic;
    },
    member_order_menu(state) {
      if (!state.member_daily_menu) return [];
      return state.member_daily_menu.map(meal => {
        const new_meal = {};
        new_meal["id"] = meal["id"];
        new_meal["name"] = meal["name"];
        new_meal["meal_note"] = meal["note"];
        new_meal["price"] = meal["price"];
        new_meal["quantity_limit"] = meal["quantity_limit"];
        new_meal["flavors"] = meal["flavors"];
        new_meal["amount"] = meal["amount"];
        return new_meal;
      });
    },
    member_menu(state) {
      return state.member_daily_menu;
    },
    member_order_check(state) {
      return state.order_detail_statistic;
    },
    member_profile(state) {
      return state.member_profile;
    },
    date_range(state) {
      const range = new Array(state.date_range).fill(0);
      return range.map((item, index) => {
        const date = Date.today()
          .add(index + 1)
          .day();
        return date.toString("MM/dd");
      });
    },
    week_range(state) {
      const range = new Array(state.week_range).fill(0);
      return range.map((item, index) => {
        const first_day_of_week = Date.parse("today - 1 month")
          .first()
          .mon()
          .add({
            weeks: index
          });
        const last_day_of_week = Date.parse("today - 1 month")
          .first()
          .mon()
          .add({
            weeks: index,
            days: 6
          });
        return `${first_day_of_week.toString(
          "MM/dd"
        )}~${last_day_of_week.toString("MM/dd")}`;
      });
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
    retrieveMemberDailyMenu(state, menu) {
      state.member_daily_menu = menu.map(item => {
        item["amount"] = 0;
        return item;
      });
      localStorage.setItem("member_daily_menu", JSON.stringify(menu));
    },
    retrieveMemberHistoryList(state, list) {
      state.member_history_list = list;
    },
    retrieveBossHistoryStatistic(state, list) {
      state.boss_history_statistic = list;
    },
    retrieveDailyMenu(state, menu) {
      localStorage.setItem("daily_menu", JSON.stringify(menu));
      state.daily_menu = menu;
    },
    retrieveBossMenuStatistic(state, menu) {
      state.boss_menu_statistic = menu;
    },
    updateMemberOrderAmount(state, detail) {
      const index = detail.index;
      state.member_daily_menu[index].amount += detail.amount;
    },
    updateOrderDetailStatistic(state, detail) {
      const index = detail.index;
      const key_name = detail.name;
      state.order_detail_statistic[index][key_name] = detail.value;
    },
    updateMemberPaidStatus(state, index) {
      const member_payment_status =
        state.boss_history_statistic.list[index].payment_status;
      const member_paid = Number(
        state.boss_history_statistic.list[index].person_paid
      );
      state.boss_history_statistic.list[
        index
      ].payment_status = !member_payment_status;

      state.boss_history_statistic.statistic.paid = Number(
        state.boss_history_statistic.statistic.paid
      );
      state.boss_history_statistic.statistic.unpaid = Number(
        state.boss_history_statistic.statistic.unpaid
      );
      if (member_payment_status) {
        state.boss_history_statistic.statistic.paid -= member_paid;
        state.boss_history_statistic.statistic.unpaid += member_paid;
      } else {
        state.boss_history_statistic.statistic.paid += member_paid;
        state.boss_history_statistic.statistic.unpaid -= member_paid;
      }
    },
    generateOrderkDetailStatistic(state) {
      const menu = state.member_daily_menu;
      const profile = state.member_profile;
      state.order_detail_statistic = menu
        .map(item => {
          if (item.amount <= 0) {
            return [];
          } else {
            const preset_flavor_id = item.flavors[0]
              ? item.flavors[0].id
              : null;
            return new Array(item.amount).fill().map(() => {
              const detail = {
                menu_id: item.id,
                name: item.name,
                flavors: item.flavors,
                flavor_id: preset_flavor_id,
                quantity: 1,
                note: profile.note
              };
              if (item.type === 0) {
                detail["user_rice"] = profile.rice;
                detail["user_vegetable"] = profile.vegetable;
              }
              return detail;
            });
          }
        })
        .flat();
      // localStorage.setItem(
      //   "order_detail_statistic",
      //   JSON.stringify(state.order_detail_statistic)
      // );
    },
    retrievePurchaseList(state, data) {
      state.purchase_list = data;
    },
    updateDailyMenu(state, meal) {
      const index = state.daily_menu.findIndex(item => {
        return (item["id"] = meal["id"]);
      });
      if (!meal["flavors"]) meal["flavors"] = [];
      state.daily_menu[index] = meal;
    },
    updateGroups(state, data) {
      state.groups[data.index] = data.change_group;
    },
    clearToken(state) {
      state.token = null;
      state.login_role = "guest";
      localStorage.clear();
    },
    deleteDailyMeal(state, index) {
      state.daily_menu.splice(index, 1);
    },
    destroyAuthDetail(state) {
      state.token = null;
      state.login_role = "guest";
      state.user_id = null;
    }
  },
  actions: {
    updateMemberOrderAmount({ commit }, detail) {
      commit("updateMemberOrderAmount", detail);
    },
    updateOrderDetailStatistic({ commit }, detail) {
      commit("updateOrderDetailStatistic", detail);
    },
    generateOrderkDetailStatistic({ commit }) {
      commit("generateOrderkDetailStatistic");
    },
    clearToken({ commit }) {
      commit("clearToken");
    },
    async addMemberOrder({ state }, data) {
      try {
        let res = await API.POST("/order", state.token, data);
        if (typeof res.data === "string") throw res;
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async updateMemberOrder({ state, commit }, { order_id, change_meal }) {
      try {
        let { data } = await API.PATCH(
          `/order/${order_id}`,
          state.token,
          change_meal
        );
        return data;
      } catch (e) {
        throw e;
      }
    },
    async register(context, userProfile) {
      try {
        let res = await API.POST("/member", null, userProfile);
        return res.data;
      } catch (e) {
        throw e;
      }
    },
    async retrieveMemberDailyMenu({ state, commit }, date) {
      try {
        let { data } = await API.GET("/viewmenus", state.token, date);
        commit("retrieveMemberDailyMenu", data);
        return data;
      } catch (e) {
        throw e;
      }
    },
    async retrieveDailyMenu({ state, commit }, date) {
      try {
        let { data } = await API.GET("/dailymenu", state.token, date);
        commit("retrieveDailyMenu", data);
        return data;
      } catch (e) {
        throw e;
      }
    },
    async retrievePurchaseList({ state, commit }, date_range) {
      try {
        let { data } = await API.GET("/order", state.token, date_range);
        commit("retrievePurchaseList", data);
      } catch (e) {
        throw e;
      }
    },
    async retrieveMemberHistoryList({ state, commit }, date_range) {
      try {
        let { data } = await API.GET(
          "/personal/count",
          state.token,
          date_range
        );
        commit("retrieveMemberHistoryList", data);
      } catch (e) {
        throw e;
      }
    },
    async retrieveBossHistoryStatistic({ state, commit }, date_range) {
      try {
        let { data } = await API.GET("/group/count", state.token, date_range);
        commit("retrieveBossHistoryStatistic", data);
        return data;
      } catch (e) {
        throw e;
      }
    },
    async retrieveBossMenuStatistic({ state, commit }, dateAndGroup) {
      try {
        let { data } = await API.GET("/count/menu", state.token, dateAndGroup);
        commit("retrieveBossMenuStatistic", data);
        return data;
      } catch (e) {
        throw e;
      }
    },
    async deletePurchaseMeal({ state, commit }, meal_id) {
      try {
        let res = await API.DELETE("/order", meal_id, state.token);
        return res;
      } catch (e) {
        throw e;
      }
    },
    async updateMemberPaidStatus({ state }, data) {
      try {
        let res = await API.PATCH(`/paidstatus`, state.token, data);
        return res;
      } catch (e) {
        throw e;
      }
    },
    async addDailyMenu({ state }, data) {
      try {
        let res = await API.POST("/menus", state.token, data);
        if (typeof res.data === "string") throw res;
        return res.data.id;
      } catch (e) {
        throw e;
      }
    },
    async addMenuFlavor({ state }, data) {
      try {
        let res = await API.POST("/flavors", state.token, data);
        if (typeof res.data === "string") throw res;
        return res;
      } catch (e) {
        throw e;
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
        commit("updateDailyMenu", res.data);
        return res;
      } catch (e) {
        throw e;
      }
    },
    async updateMenuFlavor({ state, commit }, data) {
      try {
        let res = await API.PATCH(
          `/flavors/${data.flavor_id}`,
          state.token,
          data.change_flavor
        );
        if (typeof res.data === "string") throw res;
        commit("updateDailyMenu", res.data);
      } catch (e) {
        throw e;
      }
    },
    async deleteDailyMeal({ state, commit }, data) {
      try {
        commit("deleteDailyMeal", data.index);
        let res = await API.DELETE("/menus", data.id, state.token);
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
        throw e;
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
        let { data } = await API.PATCH(
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
        let { data } = await API.POST("/member/login", null, credentials);
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
        let { data } = await API.POST("/boss/login", null, credentials);
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
