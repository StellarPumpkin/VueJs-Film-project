<template>
  <router-link to="/">
    <i class="material-icons xButton">close</i>
  </router-link>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "navBack"
});
</script>

<style scoped>
.xButton {
  background: transparent;
  text-decoration: none;
  color: #fff;
  font-size: 30px;
  width: 20px;
  height: 30px;
}
.xButton:hover {
  color: pink;
}
@media (min-width: 768px) {
  .xButton {
    font-size: 60px;
    width: 20px;
    height: 30px;
  }
}
</style>

