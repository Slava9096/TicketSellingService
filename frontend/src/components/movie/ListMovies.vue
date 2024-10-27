<template>
  <div>
    <h4>Список фильмов</h4>
    <div v-if="isAdmin">
      <router-link class="item btn btn-link" to="/addMovie">Добавить фильм</router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(movie, index) in movies" :key="index">
        <router-link class="btn btn-link" role="button" :to="{
          name: 'movie-details',
          params: { id: movie.id }
        }">
          {{ movie.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';

export default {
  name: "ListMovies",
  data() {
    return {
      movies: [],
      isAdmin: false,
    };
  },
  methods: {
    getMovies() {
      http
        .get("/movies")
        .then(response => {
          this.movies = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user.role == "admin") this.isAdmin = true;
    }
    this.getMovies();
  }
}
</script>

<style></style>
