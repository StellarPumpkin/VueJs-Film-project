<template>
    <div>
       
        <button v-on:click="$emit('input', id)">{{name}}</button>
       
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

