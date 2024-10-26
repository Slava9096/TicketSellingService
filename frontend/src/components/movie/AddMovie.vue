<template>
  <div>
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
        <input class="form-control" type="date" name="releaseDate" id="releaseDate" placeholder="Дата выхода" required
          v-model="movie.releaseDate">
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
</template>

<script>
import http from "../../http-common";
export default {
  name: "AddMovie",
  data() {
    return {
      movie: {
        name: "",
        genre: "",
        movieLength: null,
        description: "",
        releaseDate: null
      },
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
        releaseDate: this.movie.releaseDate
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
        releaseDate: null
      };
    }
  }
}
</script>

<style></style>
