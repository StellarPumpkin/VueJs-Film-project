<template>
  <button @click="$router.go(-1) 
    "></button>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "navBack"
});
</script>
<style>
</style>

