<template>
<div class="col-md-3">
<router-link :to="{name:'ThisFilm', params:{id: film.id}}">
  <b-button v-b-popover.hover.rightop="film.overview" :title="film.original_title" >
 <img :src="imageUrl + film.poster_path" class="img-fluid" >
</b-button></router-link>



 </div>
 
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: "film",
    data() {
      return{
        imageUrl: 'https://image.tmdb.org/t/p/w342'
        }
    },
  props: {
    film: Object
  }
});
</script>

<style scoped>
.img-fluid{
  max-width: 100%;
  height: auto;
}
</style>


