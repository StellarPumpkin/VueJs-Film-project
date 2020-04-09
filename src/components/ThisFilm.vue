<template>
  <div class="container-fluid text-secondary">
    <navBack/>
    <div class="container text-center">
      <h1  v-for="englishTitle in getTitleInEnglish"
      v-bind:key="englishTitle.id">{{englishTitle.data.title || oneFilm.original_title}}({{oneFilm.release_date.slice(0,4)}})</h1>
      <em>"{{oneFilm.tagline}}"</em>
    </div>
    <div class="row">
      <div class="w-100">
        <b-embed allowfullscreen type="iframe" aspect="16by9" :src="videoUrl + trailerVideo.key "></b-embed> 

        <br>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-3">
          <img class="img-fluid" :src="imageUrl + oneFilm.poster_path">
        </div>

        <div class="col-md-6">
          <p>{{oneFilm.overview}}</p>

          <div class="crewMember">
            <b class="text-info">Director:</b>
            <em
              class="directorName"
              v-for="crewMember in getDirector"
              v-bind:key="crewMember.id"
            >{{ crewMember.name}}</em>
          </div>

          <div class="filmCast">
            <b class="text-info">Cast:</b>
            <em v-for="(actor,index) in getTenActors" v-bind:key="index.id">
              {{actor.name}}
              <span v-if="index != getTenActors.length - 1">,</span>
            </em>
          </div>

          <br>

          <h3>You might also like:</h3>

          <div
            class="row mt-2 mb-2 pt-2 pb-2 justify-content-center border-top border-white"
            v-for="similarFilm in limitSimilarFilms"
            v-bind:key="similarFilm.id"
          >
            <div class="col-md-4">
              <img class="img-fluid" :src="imageUrl + similarFilm.poster_path">
            </div>
            <div class="col-md-8">
              <router-link :to="{name:'ThisFilm', params:{id: similarFilm.id}}">
                <b class="text-info" >{{ similarFilm.original_title}}    </b>
                
              </router-link>
                  <em>  ({{similarFilm.release_date.slice(0,4)}})</em>
              <p>{{similarFilm.overview}}</p>
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div>
            <div class="text-center">
              <h3>IMDb</h3>
              <p>{{imdbVote.vote_average}}/10</p>
            </div>
            <b class="text-info">Original Title: </b>
            <em>{{oneFilm.original_title}}</em>
            <br>
            <b class="text-info">Release date:</b>
            <em>{{oneFilm.release_date}}</em>
            <br>
            <b class="text-info">Runtime:</b>
            <em>{{oneFilm.runtime}} minutes</em>
            <br>
            <b class="text-info">Budget:</b>
            <em>${{oneFilm.budget.toLocaleString()}}</em>
            <br>
            <b class="text-info">Revenue:</b>
            <em>${{oneFilm.revenue.toLocaleString()}}</em>
            <br>
            <b class="text-info">Genres:</b>
            <em v-for="(thisGenre, index) in oneFilm.genres" v-bind:key="index.id">
              {{thisGenre.name}}
              <span v-if="index !=oneFilm.genres.length - 1">,</span>
            </em>
            <br>
            <b class="text-info">Languages:</b>
            <em v-for="(language, index) in oneFilm.spoken_languages" v-bind:key="index.id">
              {{language.name}}
              <span v-if="index !=oneFilm.spoken_languages.length - 1">,</span>
            </em>
          </div>
          <div class="filmReviews border-left">
            <h4>TheMovieDB users' reviews:</h4>
            <div v-for="(filmReview, index) in filmReviews" v-bind:key="index.id">
              <b class="text-info" @click="toggleExpansion(index)">{{filmReview.author}}</b>

              <em v-show="isExpanded(index)"><b class="text-info">:</b> "{{filmReview.content}}"</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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

