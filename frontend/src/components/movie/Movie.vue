<template>
  <div v-if="this.movie">
    <h4>Фильм</h4>
    <div v-if="!submitted">
      <form @submit="updateMovie">
        <input class="form-control" type="text" name="title" id="title" placeholder="Наименование фильма" required
          v-model="movie.title">
        <input class="btn btn-primary" type="submit" value="Обновить">
      </form>
      <button class="btn btn-danger" v-on:click="deleteMovie()">Удалить</button>
    </div>
    <div v-else>
      <h4>Вы успешно обновили запись</h4>
      <router-link to="/listMovies">Вернуться к списку фильмов</router-link>
    </div>
  </div>
  <div v-else>
    <br>
    <p>Выберите фильм</p>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "movie-details",
  props: ['id'],
  data() {
    return {
      movie: null,
      submitted: false
    };
  },
  methods: {
    getMovie() {
      http
        .get("/movie/" + this.id)
        .then(response => {
          this.movie = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateMovie(e) {
      e.preventDefault();
      var data = {
        name: this.movie.name,
        genre: this.movie.genre,
        movieLength: this.movie.movieLength,
        description: this.movie.description,
        releaseDate: this.movie.releaseDate
      };
      http
        .put("/movie/" + this.movie.id, data)
        .then(() => {
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    deleteMovie() {
      http
        .delete("/movie/" + this.movie.id)
        .then(() => {
          this.$router.push('/listMovies');
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getMovie();
  }
}
</script>

<style></style>
