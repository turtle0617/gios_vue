<template>
  <div class="home">
    <GIOS_Header />
    <Auth_register />
  </div>
</template>

<script>
// @ is an alias to /src
import Auth_login from "@/components/Auth_login.vue";
import Auth_register from "@/components/Auth_register.vue";
import GIOS_Header from "@/components/GIOS_Header.vue";

export default {
  name: "home",
  components: {
    Auth_login,
    Auth_register,
    GIOS_Header
  }
};
</script>
