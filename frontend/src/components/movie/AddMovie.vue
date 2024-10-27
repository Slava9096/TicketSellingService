<template>
  <div v-if="isAdmin">
    <h4>Добавление фильма</h4>
    <div v-if="!submitted">
      <form @submit="addMovie">
        <input class="form-control" type="text" name="name" id="name" placeholder="Наименование фильма" required
          v-model="movie.name">
        <input class="form-control" type="text" name="genre" id="genre" placeholder="Жанр" required
          v-model="movie.genre">
        <input class="form-control" type="number" name="length" id="length" placeholder="Длительность" required
          v-model="movie.movieLength">
        <input class="form-control" type="text" name="desc" id="desc" placeholder="Описание фильма" required
          v-model="movie.description">
        <input class="form-control" type="number" min="1900" max="2099" name="releaseYear" id="releaseYear"
          placeholder="Год выхода" required v-model="movie.releaseYear">
        <input class="btn btn-primary" type="submit" value="Добавить">
      </form>
    </div>
    <div v-else>
      <h4>Вы успешно добавили запись</h4>
      <div>
        <button class="btn btn-primary" v-on:click="newMovie">Добавить новый фильм</button>
      </div>
      <div>
        <router-link to="/listMovies">Вернуться к списку фильмов</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    Недостаточно прав для добавления
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "AddMovie",
  data() {
    return {
      movie: {
        name: "",
        genre: "",
        movieLength: null,
        description: "",
        releaseYear: null
      },
      isAdmin: false,
      submitted: false
    };
  },
  methods: {
    addMovie(e) {
      e.preventDefault();
      var data = {
        name: this.movie.name,
        genre: this.movie.genre,
        movieLength: this.movie.movieLength,
        description: this.movie.description,
        releaseYear: this.movie.releaseYear
      };
      http
        .post("/movies", data)
        .then(response => {
          this.movie.id = response.data.id;
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    newMovie() {
      this.submitted = false;
      this.movie = {
        name: "",
        genre: "",
        movieLength: null,
        description: "",
        releaseYear: null
      };
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user.role == "admin") this.isAdmin = true;
    }
  }
}
</script>

<style></style>
