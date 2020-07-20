<template>
  <b-form-input
    size="md"
    class="searchBar"
    v-on:keyup.enter="$emit('input', searchInput)"
    rows="2"
    placeholder="Search..."
    v-model="searchInput"
    type="search"
  ></b-form-input>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SearchBar",
  data() {
    return {
      searchInput: ""
    };
  }
});
</script>
<style scoped>
</style>
