<template>
  <b-container fluid class="wholePage">
    <b-row class="navSearch justify-content-md-center pb-3">
      <SearchBar class="searchBar col-md-3 mt-2" v-model="searchedFilm" v-on:input="searchByName"/>
    </b-row>

    <b-container fluid="contentContainer mt-5">
      <b-row class="justify-content-center">
        <!--DESKTOP-->
        <nav class="sidebarDesktop col-md-2">
          <aside class="sidebar-sticky-desktop">
            <p>Select by:</p>
            <select class="mb-3" v-model="sortBy" v-on:change="selectSorting()">
              <option value="popularity.desc">Popularity</option>
              <option value="release_date.desc">Date</option>
              <option value="revenue.desc">Revenue</option>
              <option value="vote_count.desc">Vote</option>
            </select>

            <p>Select by genre:</p>
            <genre
              v-for="genre in genreList"
              v-bind:key="genre.id"
              v-bind:id="genre.id"
              v-bind:selected="selectedGenre"
              v-bind:name="genre.name"
              v-on:input="syncGenre"
            ></genre>
          </aside>
        </nav>
        <!--MOBILE-->

        <b-button class="sidebarMobile sidebarMobileButton" v-b-toggle.sidebar-1>Filters</b-button>
        <b-sidebar
          id="sidebar-1"
          title="Filters"
          class="sidebarMobile col-md-2"
          :no-close-on-route-change="true"
          :noCloseOnBackdrop="true"
        >
          <div>
            <aside class="sidebar-sticky-mobile">
              <p>Select by:</p>
              <select class="mb-3" v-model="sortBy" v-on:change="selectSorting()">
                <option value="popularity.desc">Popularity</option>
                <option value="release_date.desc">Date</option>
                <option value="revenue.desc">Revenue</option>
                <option value="vote_count.desc">Vote</option>
              </select>

              <p>Select by genre:</p>
              <genre
                v-for="genre in genreList"
                v-bind:key="genre.id"
                v-bind:id="genre.id"
                v-bind:selected="selectedGenre"
                v-bind:name="genre.name"
                v-on:input="syncGenre"
              ></genre>
            </aside>
          </div>
        </b-sidebar>

        <main class="filmContainer col-md-9 ml-sm-auto col-lg-10 pt-3 px-5">
          <b-row class="filmRow justify-content-center">
            <film v-for="film in items" v-bind:key="film.id" v-bind:film="film"></film>

            <b-row>
              <b-pagination-nav
                class="paginationBar mt-5"
                v-model="currentPage"
                :link-gen="linkGen"
                :number-of-pages="total"
                use-router
              ></b-pagination-nav>
            </b-row>
          </b-row>
        </main>
      </b-row>
    </b-container>
  </b-container>
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
      sortingQuery: this.$route.query.sort_by,
      sortBy: this.$route.query.sort_by || "popularity.desc",
      currentPage: this.$route.query.page || 1,
      total: 1,
      apiKey: process.env.VUE_APP_API_KEY
    };
  },
  computed: {
    selectedGenre() {
      if (
        typeof this.$route.query.with_genres === "undefined" ||
        this.$route.query.with_genres === ""
      ) {
        return [];
      } else {
        return this.$route.query.with_genres.split(",").map(Number);
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
            api_key: this.apiKey,
            sort_by: this.sortBy,
            page: this.currentPage,
            with_genres: this.selectedGenre.toString()
          }
        })
        .then(response => {
          this.items = response.data.results;
          this.total = response.data.total_results / 20;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    searchByName() {
      axios
        .get("https://api.themoviedb.org/3/search/movie?", {
          params: {
            api_key: this.apiKey,
            query: this.searchedFilm
          }
        })
        .then(response => {
          this.items = response.data.results;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    showGenres() {
      axios
        .get("https://api.themoviedb.org/3/genre/movie/list?", {
          params: {
            api_key: this.apiKey
          }
        })
        .then(response => {
          this.genreList = response.data.genres;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },

    linkGen(pageNum) {
      return `?page=${pageNum}&sort_by=${
        this.sortBy
      }&with_genres=${this.selectedGenre.toString()}`;
    },

    syncGenre(id) {
      if (this.selectedGenre.indexOf(id) === -1) {
        this.selectedGenre.push(id);
      } else {
        for (let i = 0; i < this.selectedGenre.length; i++) {
          if (this.selectedGenre[i] === id) {
            this.selectedGenre.splice(i, 1);
            i--;
          }
        }
      }

      this.$router.replace({
        path: "/",
        query: {
          page: 1,
          sort_by: this.sortBy,
          with_genres: this.selectedGenre.join()
        }
      });
    },
    selectSorting() {
      this.$router.replace({
        path: "/",
        query: {
          page: 1,
          sort_by: this.sortBy,
          with_genres: this.selectedGenre.join()
        }
      });
    }
  }
};
</script>

<style scoped>
.wholePage {
  background-color: #181b21;
  font-family: "Raleway", sans-serif;
  padding-bottom: 50px;
}
/*navbar search styling*/
.navSearch {
  background-color: #21262e;
  border-radius: 5px;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.3);
}

.searchBar {
  background: transparent;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid #414955;
}
.searchBar:hover {
  border: 2px solid white;
}
input[type="search" i] {
  background: transparent;
  color: white;
  text-decoration: none;
}

/*sidebar filters styling*/
.sidebarMobileButton {
  background-color: transparent;
  color: rgb(191, 191, 191);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  border-radius: 4px;

  border: 2px solid #566273;
}

.sidebarDesktop {
  display: none;
}

.sidebar-sticky {
  position: sticky;
  height: calc(100vh - 63px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

select {
  margin-bottom: 1em;
  padding: 0.25em;
  border: 0;
  border-bottom: 2px solid currentcolor;
  letter-spacing: 0.15em;
  border-radius: 0;
  background-color: transparent;
  color: white;
}

@media (min-width: 768px) {
  /*sidebar filters styling*/
  .wholePage {
    padding-bottom: 150px;
  }

  .sidebarDesktop {
    padding-top: 60px;
    display: flex;
    position: fixed;
    text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
    color: rgb(191, 191, 191);
    left: 0;
    bottom: 0;
    z-index: 12; /* Behind the navbar */
    padding-right: 0px;
    background-color: #21262e;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  }
  .sidebar-sticky-desktop {
    position: sticky;
    height: calc(100vh - 63px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
  }

  select {
    margin-bottom: 1em;
    padding: 0.25em;
    border: 0;
    border-bottom: 2px solid currentcolor;
    font-weight: bold;
    letter-spacing: 0.15em;
    border-radius: 0;
  }
  .sidebarMobile {
    display: none;
  }
}
</style>


