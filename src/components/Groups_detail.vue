<template>
  <section class="groups_detail row">
    <div class="card add-group">
      <div v-if="error" class="update-error">
        <span>此名稱已被使用</span>
      </div>
      <div v-if="error_time" class="update-error">
        <span>請填寫時間</span>
      </div>
      <div class="input-box">
        <input
          type="text"
          @focus="error = false"
          v-model.trim="new_groupName"
          @keypress.enter="addGroup"
          placeholder=" "
        />
        <label for="register__name">團體名稱</label>
      </div>
      <div class="timelimit input-box">
        <select v-model.number="new_groupTimelimit" id="timelimit">
          <option value="0">否</option>
          <option value="1">是</option>
        </select>
        <label for="timelimit">收單時間限制</label>
      </div>
      <div class="time">
        <label for="timelimit">收單時間</label>
        <date-picker
          v-model="new_groupTime"
          :input-class = "date_class"
          type="time"
          value-type="format"
          @focus="error_time = false"
          :time-picker-options="time_range"
          format="HH:mm"
          placeholder="Select Time"
        ></date-picker>
      </div>
      <button class="primary" @click="addGroup">新增</button>
    </div>
    <div
      v-for="(group, index) in groups"
      :key="group.id"
      class="card group-info"
    >
      <div class="group-show" v-if="modify !== index">
        <h3>{{ group.name }}</h3>
        <h4>
          收單時間限制 ：
          {{ translateTimeLimit(group.time_limit) }}
        </h4>
        <h4 v-if="group.preset_time">
          收單時間 : {{ parseTime(group.preset_time) }}
        </h4>
        <button
          class="primary"
          @click="
            modifyGroup( group.name, group.time_limit, group.preset_time,index)
          "
        >
          修改
        </button>
        <button class="secondary" @click="deleteGroup(group.id)">刪除</button>
      </div>
      <div class="group-modify" v-else>
        <div v-if="changeName_error" class="update-error">
          <span>此名稱已被使用</span>
        </div>
        <div v-if="changeTime_error" class="update-error">
          <span>請填寫時間</span>
        </div>
        <div :class="{error:changeName_error}" class="groupName input-box">
          <input
            type="text"
            @focus="changeName_error = false"
            v-model="change_group.name"
            id="change-groupName"
            placeholder=" "
          />
          <label v-if="changeName_error" >此名稱已被使用</label>
          <label for="change-groupName">更改團體名稱</label>
        </div>
        <div class="timelimit input-box">
          <select v-model="change_group.time_limit" id="change-timelimit">
            <option value="0">否</option>
            <option value="1">是</option>
          </select>
          <label for="change-timelimit">收單時間限制</label>
        </div>
        <div class="time input-box">
          <date-picker
            v-model="change_group.preset_time"
            type="time"
            value-type="format"
            @focus="changeTime_error = false"
            :time-picker-options="time_range"
            format="HH:mm"
            placeholder="Select Time"
          ></date-picker>
        </div>
        <button class="primary" @click="updateGroup(group.id, index)">
          送出
        </button>
        <button
          @click="
            modifyGroup( group.name, group.time_limit, group.preset_time)
          "
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
      date_class:"mx-input input-date",
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
    addGroup() {
      if (!this.new_groupName) return;
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
      this.$store.dispatch("addGroup", new_group).catch(err => {
        console.error(err);
      });
    },
    modifyGroup(name, timelimit, preset_time,index = null ) {
      this.modify = index;
      this.changeTime_error = false;
      this.changeName_error = false;
      this.change_group.name = name;
      this.change_group.time_limit = timelimit;
      this.change_group.preset_time = preset_time;
    },
    updateGroup(id, index) {
      const change_name = this.change_group.name.replace(/\s/g, "");
      const same_name = this.isSameGroupName(change_name);
      const filtered_change_group = this.filterSameKey(index, Object.assign(this.change_group,{}));
      const all_same = JSON.stringify(filtered_change_group) === JSON.stringify(this.change_group);
      console.log(filtered_change_group);
      // if (all_same) {
      //   this.modify = null;
      //   return;
      // }
      if (same_name && same_name.id !== id) {
        this.changeName_error = !this.changeName_error;
        return;
      }
      if (filtered_change_group.time_limit && !filtered_change_group.preset_time) {
          this.changeTime_error = !this.changeTime_error;
          return;
      }
      this.modify = null;
      this.$store.commit("updateGroups", {
        index: index,
        change_group: Object.assign(this.change_group,{})
      });
      // this.$store
      //   .dispatch("updateGroups",{
      //     id: id,
      //     change_group: this.change_group
      //   })
      //   .catch(err => {
      //     console.error(err.response.data.message);
      //   });
    },
    deleteGroup(group_id) {
      this.$store.dispatch("deleteGroup", group_id).catch(err => {
        console.error(err);
      });
    },
    isSameGroupName(name, groups = this.groups) {
      return groups.find(group => group.name === name);
    },
    filterSameKey(index, data, groups = this.groups) {
      const change_group = Object.entries(data);
      const original_group = groups[index]
      return Object.fromEntries(change_group.filter(item => {
        const key = item[0];
        const value = item[1];
        if (key === "preset_time") {
          return original_group[key] === this.date.parse(value);
        }
        return original_group[key] !== value;
      }))
    },
    translateTimeLimit(timelimit) {
      if (timelimit) return "是";
      return "否";
    },
    parseTime(time) {
      return this.date.parse(time).toString("HH:mm");
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/scss/form.scss";
.groups_detail {
  justify-content: space-between;
}
.group-info {
  text-align: center;
}
.card {
  padding: 20px;
  overflow: visible;
}
.time {
  label {
    display: block;
  }
}
</style>
