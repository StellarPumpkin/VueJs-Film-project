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
      backdropPath: "https://image.tmdb.org/t/p/original",
      trailerVideo: [],
      videoUrl: "https://www.youtube.com/embed/",
      filmCast: [],
      filmCrew: [],
      filmReviews: [],
      similarFilms: [],
      imdbID: "",
      imdbVote: [],
      limit: 10,
      limitForSimlar: 5,
      englishLanguage: [],
      apiKey: process.env.VUE_APP_API_KEY
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
    getTitleInEnglish: function() {
      return this.englishLanguage.filter(function(d) {
        return d.name === "English";
      });
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
          "https://api.themoviedb.org/3/movie/" + this.$route.params.id + "?",
          {
            params: {
              api_key: this.apiKey,
              append_to_response: "videos"
            }
          }
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
            "/videos?",
          {
            params: {
              api_key: this.apiKey
            }
          }
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
            "/credits?",
          {
            params: {
              api_key: this.apiKey
            }
          }
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
            "/reviews?",
          {
            params: {
              api_key: this.apiKey,
              language: "en-US"
            }
          }
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
            "/similar?",
          {
            params: {
              api_key: this.apiKey,
              language: "en-US"
            }
          }
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
            "external_ids?",
          {
            params: {
              api_key: this.apiKey
            }
          }
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
        .get("https://api.themoviedb.org/3/find/" + this.imdbID + "?", {
          params: {
            api_key: this.apiKey,
            external_source: "imdb_id"
          }
        })
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
    getEnglishTitle() {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.$route.params.id +
            "/translations?",
          {
            params: {
              api_key: this.apiKey
            }
          }
        )
        .then(response => {
          this.englishLanguage = response.data.translations;
        })
        .catch(e => {
          this.error.push(e);
        });
    }
  }
});
</script>

<style scoped>
.wholePage {
  background-color: #181b21;
  padding-bottom: 50px;
}

.backdrop {
  width: 100%;
  height: 320px;
  background-position: center 0;
  background-size: cover;
  opacity: 0.8;
  border-bottom: solid;
  border-width: 1px;
  box-shadow: 0 0 5px black;
}
.backButton {
  position: relative;
  left: 320px;
  z-index: 3;
  top: 20px;
}
.trailerButton {
  position: relative;
  margin-top: 100px;
}

.titleAndTagline {
  margin-top: 15px;
  line-height: 1.3;
}
.originalTitleTop {
  color: white;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  font-size: 25px;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
}
.tagline {
  color: rgb(241, 239, 239);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  font-size: 10px;
  letter-spacing: 2px;
  font-family: "Julius Sans One", sans-serif;
  text-transform: uppercase;
  margin-bottom: 0;
  margin-top: 0;
  font-weight: bold;
}
.genresYearTop {
  display: inline;
  font-size: 15px;
  color: white;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  font-family: "Raleway", sans-serif;
  font-weight: bold;
}
.playButton {
  background-color: transparent;
  border-color: transparent;
}
.playButton:hover {
  background-color: transparent;
  border-color: transparent;
  text-shadow: 0 0 7px grey;
}
.playButton:focus {
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}
input[type="checkbox"] {
  opacity: 0;
}
.contentPanel {
  background-color: #21262e;
  border-radius: 5px;
  box-shadow: 0 0 35px rgba(0, 0, 0, 0.3);
  line-height: 1.4;
}
.filmPoster {
  margin-top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.overviewDiv {
  box-sizing: border-box;
  margin-top: 30px;
}
.directorDiv {
  margin-top: 20px;
  margin-bottom: 7px;
}
.filmOverview,
.director,
.cast {
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  color: rgb(191, 191, 191);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  display: inline;
  font-weight: bold;
}

.directorName,
.castName {
  color: rgb(140, 140, 140);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  display: inline;
  font-size: 15px;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
}
.mainInfoDiv {
  overflow: hidden;
}
.imdbDiv {
  position: relative;
  top: 10px;
}
.imdbLogo {
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  height: 60px;
}

.imdbVote {
  display: inline;
  font-size: 13px;
  color: rgb(191, 191, 191);

  font-weight: bold;
}

.infoTitle {
  display: inline;
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  color: rgb(191, 191, 191);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  font-weight: bold;
  margin-right: 2px;
}
.infoContent {
  display: inline;
  color: rgb(140, 140, 140);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  font-size: 13px;
  font-family: "Raleway", sans-serif;
  font-weight: bold;
}
.mobileBackdropImg {
  margin-top: 30px;
  margin-bottom: -10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.reviewsHeading {
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  color: rgb(191, 191, 191);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  text-transform: uppercase;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}
.reviewName {
  display: block;
  border-radius: 4px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  padding: 14px;
  background-color: rgb(51, 51, 56);
  font-family: "Raleway", sans-serif;
  font-size: 13px;
  color: rgb(191, 191, 191);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  text-transform: uppercase;
  font-weight: bold;
}
.reviewName:hover {
  color: rgb(230, 230, 230);
}
.reviewName::before {
  content: " ";
  display: inline-block;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid currentColor;
  vertical-align: middle;
  margin-right: 5px;
  transform: translateY(-2px);
}
.reviewContent {
  color: rgb(140, 140, 140);
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  overflow: hidden;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
}
.similarFilmsHeader {
  font-family: "Raleway", sans-serif;
  font-size: 14px;
  color: rgb(191, 191, 191);
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
  text-transform: uppercase;
  font-weight: bold;
  margin-top: -60px;
  text-align: center;
  margin-bottom: 30px;
}
.similarFilmsRow {
  border-bottom: solid;
  border-color: rgb(51, 51, 51);
  border-width: 1px;
  overflow: hidden;
}
.similarFilmPoster {
  border-radius: 4px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
}
.similarFilmLink:hover {
  text-decoration: none;
  color: transparent;
}
.similarFilmTitleDate {
  margin-top: 20px;
}
.similarFilmTitle {
  display: inline;
  font-family: "Raleway", sans-serif;
  color: rgb(191, 191, 191);
  font-size: 17px;
  font-weight: bold;
  margin-right: 5px;
}
.similarFilmTitle:hover {
  color: rgb(230, 230, 230);
}
.similarFilmDate {
  display: inline;
  color: rgb(140, 140, 140);
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  font-weight: bold;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
}
.similarFilmOverview {
  color: rgb(140, 140, 140);
  font-family: "Raleway", sans-serif;
  font-size: 17px;
  font-weight: bold;
  text-shadow: 1px 2px 2px rgba(0, 0, 0, 0.9);
}

@media (min-width: 768px) {
  .wholePage {
    padding-bottom: 800px;
  }
  .backButton {
    position: relative;
    z-index: 3;
    left: 1200px;
  }
  .topSide {
    position: relative;
    z-index: 2;
  }
  .backdrop {
    position: absolute;
    top: -50px;
    height: 650px;
  }
  .trailerButton {
    position: relative;
    margin-top: 250px;
  }

  .titleAndTagline {
    margin-top: 76px;
    line-height: 2;
  }
  .originalTitleTop {
    font-size: 45px;
  }
  .tagline {
    font-size: 25px;
    letter-spacing: 3px;
  }

  .genresYearTop {
    font-size: 20px;
  }
  .contentPanel {
    position: relative;
    z-index: 3;
    top: 530px;
    line-height: 1.7;
  }
  .filmPoster {
    margin-top: 0;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
  .overviewDiv {
    margin-top: 15px;
  }
  .directorDiv {
    margin-top: 40px;
    margin-bottom: 10px;
  }
  .filmOverview,
  .director,
  .cast {
    font-size: 18px;
  }

  .directorName,
  .castName {
    font-size: 17px;
  }
  .mainInfoDiv {
    padding-bottom: 100px;
    border-left: solid;
    border-width: 1px;
    border-color: rgb(51, 51, 51);
  }
  .imdbDiv {
    position: relative;
    top: -20px;
  }
  .imdbLogo {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    height: 100%;
  }

  .imdbVote {
    display: inline;
    font-size: 27px;
    color: rgb(191, 191, 191);

    font-weight: bold;
  }

  .infoDiv {
    margin-bottom: 6px;
    margin-left: 10px;
  }
  .infoTitle {
    display: inline;
    font-size: 17px;
    margin-right: 5px;
  }
  .infoContent {
    display: inline;
    font-size: 16px;
  }
  .mobileBackdropImg {
    display: none;
  }
  .reviewMainDiv {
    border-left: solid;
    border-width: 1px;
    border-color: rgb(51, 51, 51);
    margin-top: -96px;
    margin-left: -1px;
  }
  .reviewsHeading {
    font-size: 25px;
    margin-bottom: 50px;
  }
  .reviewName {
    display: block;
    padding: 16px;
    font-size: 15px;
    cursor: pointer;
  }
  .similarFilmsHeader {
    font-size: 25px;
    margin-top: -90px;
    margin-bottom: 60px;
    border-bottom: solid;
    border-color: rgb(51, 51, 51);
    border-width: 1px;
    text-align: left;
  }

  .similarFilmPoster {
    margin-left: -20px;
  }
  .similarFilmTitle {
    font-size: 20px;
    margin-right: 7px;
    padding-left: 0px;
  }
  .similarFilmDate {
    font-size: 18px;
  }
  .similarFilmOverview {
    font-size: 18px;
  }
  .similarFilmTitleDate {
    margin-top: 0px;
  }
}
</style>

