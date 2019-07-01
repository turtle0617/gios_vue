<template>
  <section class="check section">
    {{ member_order_check }}
  </section>
</template>

<script>
export default {
  name: "order_check",
  computed: {
    member_order_menu() {
      return this.$store.getters.member_order_menu;
    },
    member_order_check() {
      return this.$store.getters.member_order_check;
    }
  }
};
</script>

<style scoped lang="scss"></style>
