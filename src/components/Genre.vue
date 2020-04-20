<template>
  <div>
    <input type="checkbox"   v-on:click="$emit('input', id)" />
    <label>{{name}} </label>
   
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "genre",
  props: {
    id: Number,
    name: String
  }
  
  
  
});
</script>

