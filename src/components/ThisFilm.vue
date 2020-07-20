<template>
  <b-container fluid class="wholePage px-0">
    <navBack class="backButton"/>
    <b-container fluid class="text-center topSide">
      <b-row class="backdropContainer">
        <div
          class="backdrop"
          :style="{ backgroundImage: `url(${backdropPath+ oneFilm.backdrop_path})` }"
        >
          <div class="trailerButton">
            <b-button class="playButton" v-b-modal.modal-xl>
              <i class="far fa-play-circle fa-4x"></i>
            </b-button>

            <b-modal id="modal-xl" size="xl" centered header-close hide-footer>
              <b-container fluid class>
                <b-row class>
                  <b-embed
                    allowfullscreen
                    type="iframe"
                    aspect="16by9"
                    :src="videoUrl + trailerVideo.key + '?autoplay=1'"
                  ></b-embed>
                </b-row>
              </b-container>
            </b-modal>
          </div>
          <div class="titleAndTagline">
            <h1
              class="originalTitleTop"
              v-for="englishTitle in getTitleInEnglish"
              v-bind:key="englishTitle.id"
            >{{englishTitle.data.title || oneFilm.original_title}}</h1>
            <p class="tagline">{{oneFilm.tagline}}</p>
            <p
              class="genresYearTop"
              v-for="(thisGenre, index) in oneFilm.genres"
              v-bind:key="index.id"
            >
              {{thisGenre.name}}
              <span v-if="index !=oneFilm.genres.length - 1">,</span>
            </p>
            <span class="genresYearTop">- {{oneFilm.release_date.slice(0,4)}}</span>
          </div>
        </div>
      </b-row>
    </b-container>

    <b-container class="contentPanel">
      <b-row class="justify-content-around pt-md-5">
        <b-col cols="5" md="3">
          <img class="img-fluid filmPoster" :src="imageUrl + oneFilm.poster_path">
        </b-col>

        <b-col cols="12" order="3" md="5" order-md="2" class="align-self-start">
          <div class="overviewDiv">
            <p class="filmOverview">{{oneFilm.overview}}</p>
          </div>
          <div class="directorDiv">
            <p class="director">Director:</p>
            <p
              class="directorName"
              v-for="(crewMember, index) in getDirector"
              v-bind:key="index.id"
            >
              {{crewMember.name}}
              <span v-if="index != getDirector.length - 1">,</span>
            </p>
          </div>

          <div class="castDiv">
            <p class="cast">Cast:</p>
            <p class="castName" v-for="(actor,index) in getTenActors" v-bind:key="index.id">
              {{actor.name}}
              <span v-if="index != getTenActors.length - 1">,</span>
            </p>
          </div>
        </b-col>

        <b-col cols="7" order="2" md="3" order-md="3" class="align-self-start">
          <div class="mainInfoDiv">
            <div class="imdbDiv">
              <img class="imdbLogo" src="https://img.icons8.com/color/96/000000/imdb.png">
              <p class="imdbVote ml-2">{{imdbVote.vote_average}}/10</p>
            </div>
            <div class="mt-0">
              <div class="infoDiv">
                <p class="infoTitle">Original Title:</p>
                <p class="infoContent">{{oneFilm.original_title}}</p>
              </div>
              <div class="infoDiv">
                <p class="infoTitle">Release date:</p>
                <p class="infoContent">{{oneFilm.release_date}}</p>
              </div>
              <div class="infoDiv">
                <p class="infoTitle">Runtime:</p>
                <p class="infoContent">{{oneFilm.runtime}} minutes</p>
              </div>
              <div class="infoDiv">
                <p class="infoTitle">Budget:</p>
                <p class="infoContent">${{oneFilm.budget.toLocaleString()}}</p>
              </div>
              <div class="infoDiv">
                <p class="infoTitle">Revenue:</p>
                <p class="infoContent">${{oneFilm.revenue.toLocaleString()}}</p>
              </div>
              <div class="infoDiv">
                <p class="infoTitle">Genres:</p>
                <p
                  class="infoContent"
                  v-for="(thisGenre, index) in oneFilm.genres"
                  v-bind:key="index.id"
                >
                  {{thisGenre.name}}
                  <span v-if="index !=oneFilm.genres.length - 1">,</span>
                </p>
              </div>
              <div class="infoDiv">
                <p class="infoTitle">Languages:</p>
                <p
                  class="infoContent"
                  v-for="(language, index) in oneFilm.spoken_languages"
                  v-bind:key="index.id"
                >
                  {{language.name}}
                  <span v-if="index !=oneFilm.spoken_languages.length - 1">,</span>
                </p>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="mobileBackdropImg">
        <b-col cols="12">
          <img class="img-fluid" :src="backdropPath+ oneFilm.backdrop_path">
        </b-col>
      </b-row>

      <b-row class="mt-md-5 pt-md-5" align-h="end">
        <b-col cols="12" order="2" md="8" order-md="1" class="ml-md-2 pt-5 mt-5 pt-md-0 mt-md-0">
          <h3 class="similarFilmsHeader">You might also like:</h3>
          <b-row
            v-for="similarFilm in limitSimilarFilms"
            v-bind:key="similarFilm.id"
            class="p-2 similarFilmsRow"
          >
            <b-col cols="12" md="3">
              <img
                class="img-fluid d-inline similarFilmPoster"
                :src="imageUrl + similarFilm.poster_path"
              >
            </b-col>
            <b-col cols="12" md="9" class="similarFilmTitleDate">
              <router-link
                class="similarFilmLink"
                :to="{name:'ThisFilm', params:{id: similarFilm.id}}"
              >
                <p class="similarFilmTitle">{{ similarFilm.original_title}}</p>
              </router-link>
              <p class="similarFilmDate">({{similarFilm.release_date.slice(0,4)}})</p>
              <p class="mt-4 similarFilmOverview">{{similarFilm.overview}}</p>
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="12" order="1" md="3" order-md="2" class="align-self-start">
          <b-row class="justify-content-center">
            <b-col cols md="12 " class="px-md-0 mr-md-0">
              <div class="reviewMainDiv px-md-0 mr-md-0 mt-0 pt-0">
                <h4 class="reviewsHeading mt-5">TheMovieDB users reviews:</h4>

                <div
                  class="reviewsDiv p-1"
                  v-for="(filmReview, index) in filmReviews"
                  v-bind:key="index.id"
                >
                  <label class="reviewName">
                    <input type="checkbox" class="toggle" @click="toggleExpansion(index)">
                    {{filmReview.author}}
                  </label>

                  <div class="reviewContentDiv">
                    <p class="reviewContent" v-show="isExpanded(index)">{{filmReview.content}}</p>
                  </div>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>





<script lang="ts">
import Vue from "vue";
import axios from "axios";
import navBack from "./navBack.vue";
export default Vue.extend({
  name: "ThisFilm",
  components: {
    navBack: navBack
  },

  data() {
    return {
      oneFilm: [],
      imageUrl: "https://image.tmdb.org/t/p/w342",
      trailerVideo: [],
      videoUrl: "https://www.youtube.com/embed/",
      filmCast: [],
      filmCrew: [],
      filmReviews: [],
      similarFilms: [],
      imdbID: "",
      imdbVote: [],
      limit: 10,
      limitForSimlar: 7,
      englishLanguage: []
    };
  },
  watch: {
    imdbID: function() {
      this.getImdbVote();
    }
  },
  computed: {
    getDirector: function() {
      return this.filmCrew.filter(function(d) {
        return d.job === "Director";
      });
    },
    getTenActors: function() {
      return this.filmCast.slice(0, this.limit);
    },
    limitSimilarFilms: function() {
      return this.similarFilms.slice(0, this.limitForSimlar);
    },
    getTitleInEnglish: function(){
      return this.englishLanguage.filter(function(d){
        return d.name === "English";
      })
    }
  },

  mounted() {
    this.getImdbId();
    this.filmInfo();
    this.getTrailer();
    this.getCredits();
    this.getReviews();
    this.getSimilarFilms();
    this.getImdbId();
    this.getEnglishTitle();
  },
  methods: {
    filmInfo() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "?api_key=f8f289dd8d080038f73df4b74df792a6&append_to_response=videos"
        )
        .then(response => {
          this.oneFilm = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    getTrailer() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "/videos?api_key=f8f289dd8d080038f73df4b74df792a6"
        )
        .then(response => {
          this.trailerVideo = response.data.results[0];
        })
        .catch(e => {
          this.error.push(e);
        });
    },
    getCredits() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "/credits?api_key=f8f289dd8d080038f73df4b74df792a6"
        )
        .then(response => {
          this.filmCast = response.data.cast;
          this.filmCrew = response.data.crew;
        })
        .catch(e => {
          this.error.push(e);
        });
    },
    getReviews() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "/reviews?api_key=f8f289dd8d080038f73df4b74df792a6&language=en-US"
        )
        .then(response => {
          this.filmReviews = response.data.results;
        })
        .catch(e => {
          this.error.push(e);
        });
    },
    getSimilarFilms() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "/similar?api_key=f8f289dd8d080038f73df4b74df792a6&language=en-US"
        )
        .then(response => {
          this.similarFilms = response.data.results;
        })
        .catch(e => {
          this.error.push(e);
        });
    },
    getImdbId() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "external_ids?api_key=f8f289dd8d080038f73df4b74df792a6"
        )
        .then(response => {
          this.imdbID = response.data.imdb_id;
        })
        .catch(e => {
          this.error.push(e);
        });
    },
    getImdbVote() {
      
      axios
        .get(
          "https://api.themoviedb.org/3/find/" +
            this.imdbID +
            "?api_key=f8f289dd8d080038f73df4b74df792a6&external_source=imdb_id"
        )
        .then(response => {
          this.imdbVote = response.data.movie_results[0];
        })
        .catch(e => {
          this.error.push(e);
        });
    },
    isExpanded(index) {
      return this.filmReviews.indexOf(index) !== -1;
    },
    toggleExpansion(index) {
      if (this.isExpanded(index))
        this.filmReviews.splice(this.filmReviews.indexOf(index), 1);
      else this.filmReviews.push(index);
    },
    getEnglishTitle(){
      axios
      .get("https://api.themoviedb.org/3/movie/"+
      this.$route.params.id +"/translations?api_key=f8f289dd8d080038f73df4b74df792a6"
      )
      .then(response => {
        this.englishLanguage = response.data.translations
      })
      .catch(e => {
        this.error.push(e);
      })
    }
  }
});
</script>




<style scoped>
.container-fluid {
  background-color: #002633;
}
</style>

