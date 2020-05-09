<template>
  <div class="container">
    <div class="row">
      <b-col sm="3">
        <input
          size="sm"
          class="bg-transparent text-white"
          v-on:keyup.enter="$emit('input', searchInput)"
          rows="2"
          placeholder="Search films"
          v-model="searchInput"
        >
      </b-col>
    </div>
  </div>
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
