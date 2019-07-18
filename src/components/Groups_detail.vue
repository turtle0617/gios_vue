<template>
  <section class="groups_detail row">
    <div class="card add-group">
      <div class="card-header">
        <h1 class="card-header-title">
          新增團體
        </h1>
      </div>
      <div class="card-content">
        <div class="input-box " :class="{ error: error }">
          <input
            type="text"
            @focus="error = false"
            v-model.trim="new_groupName"
            @keypress.enter="addGroup"
            placeholder=" "
            class="input"
          />
          <span v-if="error">名稱重複或為空</span>
          <label for="register__name">團體名稱</label>
        </div>
        <div class="timelimit input-box select">
          <select v-model.number="new_groupTimelimit" id="timelimit">
            <option value="0">否</option>
            <option value="1">是</option>
          </select>
          <label for="timelimit">收單時間限制</label>
        </div>
        <div class="time" v-if="new_groupTimelimit == '1'">
          <label for="timelimit">收單時間</label>
          <date-picker
            v-model="new_groupTime"
            type="time"
            value-type="format"
            @focus="error_time = false"
            :time-picker-options="time_range"
            format="HH:mm"
            placeholder="Select Time"
          ></date-picker>
          <span v-if="error_time">請填寫時間</span>
        </div>
        <button
          :class="{ 'is-loading': loading_status.addGroup }"
          :disabled="loading_status.addGroup"
          class="button is-info"
          @click="addGroup"
        >
          新增
        </button>
      </div>
    </div>
    <div
      v-for="(group, index) in groups"
      :key="group.id"
      class="card group-info"
    >
      <div class="group-show" v-if="modify !== index">
        <div class="content is-medium group-show__name">
          <h3>{{ group.name }}</h3>
        </div>
        <div class="group-show__timeLimite">
          <h4>
            收單時間限制 ：
            {{ translateTimeLimit(group.time_limit) }}
          </h4>
        </div>

        <h4 v-if="group.time_limit">
          收單時間 : {{ parseTime(group.preset_time) }}
        </h4>
        <button
          class="button is-info"
          @click="
            modifyGroup(group.name, group.time_limit, group.preset_time, index)
          "
        >
          修改
        </button>
        <button
          :class="{ 'is-loading': loading_status.deleteGroup === index }"
          :disabled="loading_status.deleteGroup === index"
          class="button is-danger"
          @click="deleteGroup(group.id, index)"
        >
          刪除
        </button>
      </div>
      <div class="group-modify" v-else>
        <div class="groupName input-box" :class="{ error: changeName_error }">
          <input
            type="text"
            @focus="changeName_error = false"
            v-model="change_group.name"
            class="input-box__name input"
            id="change-groupName"
            placeholder=" "
          />
          <span v-if="changeName_error">名稱重複或為空</span>
          <label for="change-groupName">更改團體名稱</label>
        </div>
        <div class="timelimit select input-box">
          <select v-model="change_group.time_limit" id="change-timelimit">
            <option value="0">否</option>
            <option value="1">是</option>
          </select>
          <label for="change-timelimit">收單時間限制</label>
        </div>
        <div v-if="change_group.time_limit == '1'" class="time input-box">
          <date-picker
            v-model="change_group.preset_time"
            type="time"
            value-type="format"
            @focus="changeTime_error = false"
            :time-picker-options="time_range"
            format="HH:mm"
            placeholder="Select Time"
          ></date-picker>
          <span v-if="changeTime_error">請填寫時間</span>
        </div>
        <button
          :class="{ 'is-loading': loading_status.updateGroup === index }"
          :disabled="loading_status.updateGroup === index"
          class="button is-info"
          @click="updateGroup(group.id, index)"
        >
          送出
        </button>
        <button
          class="button"
          @click="modifyGroup(group.name, group.time_limit, group.preset_time)"
        >
          取消
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Groups_detail",
  data() {
    return {
      loading_status: {
        addGroup: false,
        updateGroup: null,
        deleteGroup: null
      },
      new_groupName: "",
      new_groupTime: null,
      new_groupTimelimit: 0,
      change_group: {
        name: "",
        time_limit: null,
        preset_time: null
      },
      error: false,
      error_time: false,
      changeTime_error: false,
      changeName_error: false,
      modify: null,
      time_range: {
        start: "00:00",
        step: "00:30",
        end: "23:30"
      }
    };
  },
  created() {
    this.$store.dispatch("retrieveGroups");
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    }
  },
  methods: {
    async addGroup() {
      try {
        if (!this.new_groupName) return (this.error = true);
        const isSame = this.isSameGroupName(this.new_groupName);
        if (isSame) {
          this.error = true;
          return;
        }
        const new_group = {
          name: this.new_groupName,
          time_limit: this.new_groupTimelimit
        };
        if (new_group.time_limit) {
          if (!this.new_groupTime) {
            this.error_time = !this.error_time;
            return;
          }
          new_group["preset_time"] = this.new_groupTime;
        }
        this.loading_status.addGroup = true;
        await this.$store.dispatch("addGroup", new_group).catch(err => {
          console.error(err);
        });
        await this.$store.dispatch("retrieveGroups");
        this.new_groupName = "";
        this.loading_status.addGroup = false;
      } catch (e) {
        console.error(e);
        this.loading_status.addGroup = false;
      }
    },
    modifyGroup(name, timelimit, preset_time, index = null) {
      this.modify = index;
      this.changeTime_error = false;
      this.changeName_error = false;
      this.change_group.name = name;
      this.change_group.time_limit = timelimit;
      this.change_group.preset_time = preset_time;
    },
    async updateGroup(id, index) {
      try {
        const change_name = this.change_group.name.replace(/\s/g, "");
        const same_name = this.isSameGroupName(change_name);
        const filtered_change_group = this.filterSameKey(
          index,
          Object.assign({}, this.change_group)
        );
        const all_same = Object.keys(filtered_change_group).length === 0;
        if (all_same) {
          this.modify = null;
          return;
        }
        if ((same_name && same_name.id !== id) || change_name === "") {
          this.changeName_error = !this.changeName_error;
          return;
        }
        if (parseInt(this.change_group.time_limit)) {
          if (!this.change_group.preset_time) {
            this.changeTime_error = !this.changeTime_error;
            return;
          }
          filtered_change_group["preset_time"] = this.parseTime(
            this.change_group.preset_time
          );
        }
        this.loading_status.updateGroup = index;
        await this.$store
          .dispatch("updateGroups", {
            id: id,
            change_group: filtered_change_group
          })
          .catch(err => {
            console.error(err.response.data.message);
          });
        await this.$store.dispatch("retrieveGroups");
        this.modify = null;
        this.loading_status.updateGroup = null;
      } catch (e) {
        console.error(e);
        this.loading_status.updateGroup = null;
      }
    },
    async deleteGroup(group_id, index) {
      try {
        this.loading_status.deleteGroup = index;
        await this.$store.dispatch("deleteGroup", group_id).catch(err => {
          console.error(err);
        });
        await this.$store.dispatch("retrieveGroups");
        this.loading_status.deleteGroup = null;
      } catch (e) {
        console.error(e);
        await this.$store.dispatch("retrieveGroups");
        this.loading_status.deleteGroup = null;
      }
    },
    isSameGroupName(name, groups = this.groups) {
      return groups.find(group => group.name === name);
    },
    filterSameKey(index, data, groups = this.groups) {
      const change_group = Object.entries(data);
      const original_group = Object.assign({}, groups[index]);
      return Object.fromEntries(
        change_group.filter(item => {
          let key = item[0];
          let value = item[1];
          if (key === "preset_time") {
            original_group[key] = this.Date.parse(original_group[key]);
            value = this.Date.parse(value);
            if (original_group[key] === null || value === null)
              return (
                this.Date.parse(original_group[key]) !== this.Date.parse(value)
              );
            return !this.Date.equals(original_group[key], value);
          }
          return original_group[key] !== value;
        })
      );
    },
    translateTimeLimit(timelimit) {
      if (timelimit) return "是";
      return "否";
    },
    parseTime(time) {
      return this.Date.parse(time).toString("HH:mm");
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/form.scss";

.groups_detail {
  justify-content: space-between;
  padding: 3rem 5rem;
  width: 80%;
  margin: 0 auto;
}
.group-info {
  text-align: center;
}
.group-show__timeLimite {
  margin-bottom: 1rem;
}
.card {
  padding: 20px;
  overflow: visible;
  button {
    margin-right: 1rem;
  }
}
.time {
  label {
    display: block;
  }
}
.timelimit {
  width: 100%;
}
</style>
