<template>
  <section class="groups_detail row">
    <div class="card add-group">
      <div v-if="error" class="update-error">
        <span>此名稱已被使用</span>
      </div>
      <div class="input-box">
        <input
          type="text"
          @focus="error = false"
          v-model="new_groupName"
          @keypress.enter="addGroup"
          placeholder=" "
        />
        <label for="register__name">團體名稱</label>
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
        <button class="primary" @click="modifyGroup(index)">修改</button>
        <button class="secondary" @click="deleteGroup(group.id)">刪除</button>
      </div>
      <div class="group-modify" v-else>
        <div class="input-box">
          <input
            type="text"
            v-bind:value="group.name"
            @input="getGroupName"
            @keypress.enter="updateGroup(group.name, group.id, index)"
            id="change-groupName"
            placeholder=" "
          />
          <label for="change-groupName">更改團體名稱</label>
        </div>
        <button
          class="primary"
          @click="updateGroup(group.name, group.id, index)"
        >
          送出
        </button>
        <button @click="modifyGroup">取消</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Groups_detail",
  data() {
    return {
      new_groupName: "",
      original_groups: null,
      change_name: "",
      error: false,
      modify: null
    };
  },
  created() {
    console.log(this.moment());
    this.$store.dispatch("retrieveGroups");
  },
  computed: {
    groups() {
      this.original_groups = JSON.parse(
        JSON.stringify(this.$store.getters.groups)
      );
      return this.$store.getters.groups;
    }
  },
  methods: {
    addGroup() {
      if (!this.new_groupName) return;
      this.new_groupName = this.new_groupName.replace(/\s/g, "");
      const isSame = this.isSameGroupName(this.new_groupName);
      if (isSame) {
        this.error = true;
        return;
      }
      this.$store
        .dispatch("addGroup", {
          name: this.new_groupName,
          time_limit: 0
        })
        .catch(err => {
          console.error(err);
        });
    },
    modifyGroup(index) {
      this.modify = index;
    },
    getGroupName(e) {
      this.change_name = e.target.value;
    },
    updateGroup(name, id, index) {
      let change_name = this.change_name.replace(/\s/g, "");
      const isSame = change_name === name;
      if (isSame) {
        this.modify = null;
        return;
      }
      this.modify = null;
      this.$store.commit("updateGroups", {
        index: index,
        name: change_name
      });
      this.$store
        .dispatch("updateGroups", {
          name: change_name,
          id: id
        })
        .catch(err => {
          console.error(err);
        });
    },
    deleteGroup(group_id) {
      this.$store.dispatch("deleteGroup", group_id).catch(err => {
        console.error(err);
      });
    },
    isSameGroupName(name, groups = this.original_groups) {
      console.log(name);
      return groups.find(group => group.name === name);
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/form.scss";
.groups_detail {
  justify-content: space-between;
}
.group-info {
  text-align: center;
}
.card {
  padding: 20px;
}
</style>
