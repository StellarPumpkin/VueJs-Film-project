<template>
  <div class="col-md-3 p-2">
    <router-link class="routerButton" :to="{name:'ThisFilm', params:{id: film.id}}">
      <b-button
        class="popoverButton btn bg-transparent p-0"
        v-b-popover.hover.rightop="popoverConfig"
      >
        <b-img
          v-if="film.poster_path !== null"
          :src="this.imageUrl + film.poster_path"
          class="img-fluid"
        ></b-img>
        <div v-else>
          <b-img :src="this.anotehrImage" class="img-fluid"></b-img>
        </div>
      </b-button>
    </router-link>
    <div class="mobileDisplay">
      <p class="filmInfo pr-2">{{this.film.original_title}}</p>
      <p class="filmInfo">({{film.release_date.slice(0,4)}})</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "film",
  data() {
    return {
      imageUrl: "https://image.tmdb.org/t/p/w342",
      anotehrImage: require("../assets/wilhelm-gunkel-Zhdyy82QsN8-unsplash.jpg")
    };
  },
  props: {
    film: Object
  },
  computed: {
    popoverConfig() {
      return {
        html: true,
        title: () => {
          return (
            "<b>" +
            this.film.original_title +
            "</b>" +
            "<em>" +
            "(" +
            this.film.release_date.slice(0, 4) +
            ")" +
            "</em>"
          );
        },
        content: () => {
          return (
            "<em>" +
            this.film.overview +
            "</em>" +
            "<br>" +
            "<br>" +
            "<b>" +
            "IMDB: " +
            "</b>" +
            this.film.vote_average
          );
        }
      };
    }
  },
  methods: {
    filmImage() {
      if (this.film.poster_path !== null) {
        return this.imageUrl + this.film.poster_path;
      } else {
        return this.standartPosterReplacement;
      }
    }
  }
});
</script>

<style scoped>
.img-fluid {
  height: auto;
  width: 100%;
}
.mobileDisplay {
  color: white;
}
.filmInfo {
  display: inline;
  color: rgb(191, 191, 191);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  font-family: "Raleway", sans-serif;
  font-size: 18px;
}
@media (min-width: 768px) {
  .mobileDisplay {
    display: none;
  }
}
</style>


