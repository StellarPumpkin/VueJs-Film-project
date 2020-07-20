<template>
  <div>
    <input class=" checkBox ml-1" type="checkbox" :checked="this.selected.includes(id)" v-on:click="$emit('input', id)"/>
    <label class="pl-2">{{name}} </label>
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

