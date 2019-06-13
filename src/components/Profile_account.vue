<template>
<section class="account-detail col-sm-12 col-md-6 col-lg-4 ">
  <form @submit.prevent="changeProfile">
    <fieldset id="account__form">
      <legend>我的帳戶</legend>
      <div v-if="success" class="row update-success">
        <div class="col-sm-12 col-md-12">
          <label>
            成功儲存變更
          </label>
        </div>
      </div>
      <div class="row name">
        <div class="col-sm-12 col-md-12">
          <label for="account__name">使用者名稱</label>
        </div>
        <div class="col-sm-12 col-md-12">
          <input v-model="member_profile.name" type="text" id="account__name" @focus="hideSuccessMessage" placeholder="請輸入使用者名稱" />
        </div>
      </div>
      <div class="row account">
        <div class="col-sm-12 col-md-12">
          <label for="account__account">使用者帳戶</label>
        </div>
        <div class="col-sm-12 col-md-12">
          <input v-model="member_profile.account" type="text" id="account__account" @focus="hideSuccessMessage" placeholder="請輸入使用者帳戶" />
        </div>
      </div>
      <div class="row group">
        <div class="col-sm-12 col-md-12">
          <label for="account__group">團體</label>
        </div>
        <div class="col-sm-12 col-md-12">
          <select v-model="member_profile.group_id" class="group--select" @focus="hideSuccessMessage" name="account__group">
            <option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</option>
          </select>
        </div>
      </div>
      <div class="row rice">
        <div class="col-sm-12 col-md-12">
          <label for="account__name">飯量</label>
        </div>
        <div class="col-sm-12 col-md-12">
          <select v-model="member_profile.rice" class="group--select" @focus="hideSuccessMessage" name="account__group">
            <option value="7">多飯</option>
            <option value="1">正常</option>
            <option value="2">1/2飯</option>
            <option value="3">1/3飯</option>
            <option value="4">2/3飯</option>
            <option value="5">1/4飯</option>
            <option value="6">不飯</option>
          </select>
        </div>
      </div>
      <div class="row vegetable">
        <div class="col-sm-12 col-md-12">
          <label for="account__vegetable">菜量</label>
        </div>
        <div class="col-sm-12 col-md-12">
          <select v-model="member_profile.vegetable" class="group--select" @focus="hideSuccessMessage" name="account__group">
            <option value="2">多菜</option>
            <option value="1">正常</option>
            <option value="3">少菜</option>
            <option value="4">不菜</option>
          </select>
        </div>
      </div>
      <div class="row remark">
        <div class="col-sm-12 col-md-12">
          <label for="account__Remark">備註</label>
        </div>
        <div class="col-sm-12 col-md-12">
          <input v-model="member_profile.note" type="text" id="account__Remark" @focus="hideSuccessMessage" placeholder="請輸入備註" />
        </div>
      </div>
      <div class="row code">
        <div class="col-sm-12 col-md-12">
          <label for="account__code">
            密碼
            <span>*</span>
            <span v-if="isEmpty">密碼為必填</span>
          </label>
        </div>
        <div class="col-sm-12 col-md-12">
          <input v-bind:class="{ empty: isEmpty }" type="password" placeholder="請輸入密碼" v-model="member_password" @blur="checkPassword" @focus="hideSuccessMessage"/>
        </div>
      </div>
      <button class="primary large" type="submit">儲存變更</button>
    </fieldset>
  </form>
</section>
</template>

<script>
export default {
  name: "Profile_account",
  data() {
    return {
      member_profile: null,
      original_profile: null,
      member_password: "",
      isEmpty: false,
      success: false
    };
  },
  created() {
    this.member_profile = Object.assign({}, this.$store.state.member_profile);
    this.original_profile = Object.assign({}, this.$store.state.member_profile);
  },
  computed: {
    groups() {
      return this.$store.state.groups;
    }
  },
  methods: {
    changeProfile() {
      if (!this.member_password) {
        this.isEmpty = true;
        return;
      }
      const profile = this.filterDifferentData(this.original_profile,this.member_profile);
      profile['yourpassword'] = this.member_password;
      this.$store.dispatch('updateMemberProfile',Object.assign({}, profile))
        .then((res)=>{
          this.success = !this.success;
        })
        .catch((err)=>{
          throw new Error(err);
        })
    },
    hideSuccessMessage(){
      this.success = false;
    },
    checkPassword() {
      if (!this.member_password) {
        this.isEmpty = true;
        return;
      }
      this.isEmpty = false;
    },
    filterDifferentData(original,comparison){
      return Object.keys(original).reduce((acc,curr) =>{
        if(original[curr]!== comparison[curr]){
          acc[curr] = comparison[curr]
          return acc
        }
        return acc
      },{} )
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/form.scss";
span {
    color: red;
}


</style>
