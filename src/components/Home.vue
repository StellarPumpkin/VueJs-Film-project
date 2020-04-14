<template>
  <div class="container-fluid text-secondary">
    <header class="headers">
      <SearchBar v-model="searchedFilm" v-on:input="searchByName"/>
    </header>

    <!-- <input type="text" placeholder="search" v-model="searchedFilm">
    <button v-on:click="searchByName">Search</button>-->
    <select v-model="sortBy" @change="callAPI(1)">
      <option value="popularity.desc">Popularity</option>
      <option value="release_date.desc">Date</option>
      <option value="revenue.desc">Revenue</option>
      <option value="vote_count.desc">Vote</option>
    </select>
    <div>
      <genre
        v-for="genre in genreList"
        v-bind:key="genre.id"
        v-bind:id="genre.id"
        v-bind:name="genre.name"
        v-on:input="callAPI"
        v-model="genreId"
      ></genre>
    </div>

    <div class="container">
      
      <div class="row">
      
        <film
          v-for="film in items"
          v-bind:key="film.id"
          v-bind:film="film"
          :per-page="perPage"
          :current-page="currentPage"
        ></film>
       
      </div>
       <b-pagination
        v-model="currentPage"
        :total-rows="total"
        :per-page="perPage"
        first-number
        last-number
        aria-controls="film"
        align="center"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import film from "./Film.vue";
import axios from "axios";
import genre from "./Genre.vue";
import SearchBar from "./SearchBar.vue";
export default {
  name: "Home",
  components: {
    film: film,
    genre: genre,
    SearchBar: SearchBar
  },
  data() {
    return {
      genreList: [],
      items: [],
      searchedFilm: "",
      sortBy: "popularity.desc",
      genreId: "",
      perPage: 20,
      currentPage: 1,
      total: 0
    };
  },
  watch: {
    currentPage: {
      handler: function() {
        this.callAPI()
      }
    }
  },

  created() {
    this.callAPI();
    this.showGenres();
  },
  methods: {
    callAPI() {
      axios
        .get("https://api.themoviedb.org/3/discover/movie", {
          params: {
            api_key: "f8f289dd8d080038f73df4b74df792a6",
            sort_by: this.sortBy,
            with_genres: this.genreId,
            page: this.currentPage
          }
        })
        .then(response => {
          this.items = response.data.results;
          this.total = response.data.total_results;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    searchByName() {
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=f8f289dd8d080038f73df4b74df792a6&query=" +
            this.searchedFilm
        )
        .then(response => {
          this.items = response.data.results;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    showGenres() {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=f8f289dd8d080038f73df4b74df792a6"
        )
        .then(response => {
          this.genreList = response.data.genres;
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style scoped>
.headers {
  background-color: aqua;
}
</style>


