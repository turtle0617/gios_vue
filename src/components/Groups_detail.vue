<template>
<section class="groups_detail row">
  <div class="card add-group row">
    <div class="col-sm-12 col-md-12 input-box">
      <input type="text" v-model="new_groupName" placeholder=" " />
      <label for="register__name">團體名稱</label>
    </div>
    <button class="primary" v-on:click="addGroup">新增</button>
  </div>
  <div v-for="group in groups" :key="group.id" class="card group-info">
    <h3>{{group.name}}</h3>
    <button class="primary ">修改</button>
    <button class="secondary" v-on:click="deleteGroup(group.id)">刪除</button>
  </div>
</section>
</template>

<script>
export default {
  name: "Groups_detail",
  data() {
    return {
      new_groupName: ""
    }
  },
  computed: {
    groups() {
      return this.$store.state.groups;
    }
  },
  methods: {
    addGroup() {
      if (!this.new_groupName) return;
      this.$store.dispatch('addGroup', {
          name: this.new_groupName
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.message);
        })
    },
    deleteGroup(group_id){
      this.$store.dispatch('deleteGroup',group_id )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err.message);
        })
    }
  }
};
</script>
<style  scoped lang="scss">
@import "@/assets/form.scss";
.group-info {
    text-align: center;
}
.card {
    padding: 20px;
}
</style>
