<template>
  <div class="container">
      <div class="row"> 
      <b-col sm="3">
    <b-form-textarea size="sm" rows = "2" placeholder="search" v-model="searchInput" />
     </b-col>
    <b-button  v-on:click="$emit('input', searchInput)">Search</b-button>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "SearchBar",
  data(){
      return {
          searchInput: ""
      }
  }
});
</script>
<style scoped>
</style>
