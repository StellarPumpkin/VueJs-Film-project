<template>
<div class="col-md-3">
<router-link :to="{name:'ThisFilm', params:{id: film.id}}">
  <b-button  class="popoverButton btn bg-transparent"   v-b-popover.hover.rightop ="popoverConfig"  >
 <img :src="imageUrl + film.poster_path" class="img-fluid" >
</b-button>
</router-link>



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
  },
  computed: {
    popoverConfig(){
      return{
        html: true,
        title: () => {
          return '<b>' + this.film.original_title + '</b>'  + '<em>' + "(" + this.film.release_date.slice(0, 4) + ")" + '</em>';
        },
        content: () => {
          return   '<em>' + this.film.overview + '</em>' + '<br>' + '<b>' + "IMDB: " + '</b>' + this.film.vote_average 
        }
      }
    }
  }
});
</script>

<style scoped>
.img-fluid{
  max-width: 100%;
  height: auto;
};



</style>


