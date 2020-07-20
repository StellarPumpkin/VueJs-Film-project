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
    name: String,
    selected: Array
  }
});
</script>
<style scoped>
.checkBox{
  appearance: none;
  background-color: transparent;
	border: 1px solid #cac8c8;
	box-shadow: 0 1px 2px rgba(211, 193, 193, 0.05);
	padding: 9px;
	border-radius: 3px;
	display: inline-block;
	position: relative;
}

.checkBox:active, .checkBox:checked:active {
	box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.checkBox:checked {
	background-color:transparent;
	border: 1px solid #adb8c0;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05), inset 15px 10px -12px rgba(255,255,255,0.1);
	color: #99a1a7;
}

.checkBox:checked:after {
	content: '\2714';
	font-size: 15px;
	position: absolute;
	top: 0px;
	left: 3px;
	color: #99a1a7;
}

label{
  letter-spacing: .10em;
}
</style>
