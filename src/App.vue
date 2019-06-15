<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
.update-success {
  background-color: rgba(96, 255, 22, 0.08);
  padding: 10px 0;
  border-left: 5px solid lightgreen;
  color: rgba(0, 128, 0, 0.65);
  margin-bottom: 1rem;
}
.update-error {
  background-color: #ed516038;
  padding: 10px 0;
  border-left: 5px solid #eb818b;
  color: #ff253a;
  margin-bottom: 1rem;
}
</style>
