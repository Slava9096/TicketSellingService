<template>
  <div v-if="this.movie">
    <h4>Фильм</h4>
    <div v-if="isAdmin">
      <div v-if="!submitted">
        <form @submit="updateMovie">
          <input class="form-control" type="text" name="name" id="name" placeholder="Наименование фильма" required
            v-model="movie.name">
          <input class="form-control" type="text" name="genre" id="genre" placeholder="Жанр" required
            v-model="movie.genre">
          <input class="form-control" type="number" name="length" id="length" placeholder="Длительность" required
            v-model="movie.length">
          <input class="form-control" type="text" name="desc" id="desc" placeholder="Описание фильма" required
            v-model="movie.description">
          <input class="form-control" type="text" name="releaseYear" id="releaseYear" placeholder="Год выхода" required
            v-model="movie.releaseYear">
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
      <p>
        <strong>Название:</strong>
        {{ movie.name }}
      </p>
      <p>
        <strong>Жанр:</strong>
        {{ movie.genre }}
      </p>
      <p>
        <strong>Длительность:</strong>
        {{ movie.length }} мин.
      </p>
      <p>
        <strong>Год выхода:</strong>
        {{ movie.releaseYear }}
      </p>
      <p>
        <strong>Описание:</strong>
        {{ movie.description }}
      </p>
      <div v-if="user">
        <router-link :to="{
          name: 'buy-ticket-movie',
          params: { movieId: movie.id }
        }">
          <button type="button" class="btn btn-primary">Купить билет</button>
        </router-link>
      </div>
      <div v-else>
        Вы должны быть авторизированы чтобы купить билет
      </div>
    </div>
  </div>
  <div v-else>
    <br>
    <p>Выберите фильм</p>
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "movie-details",
  props: ['id'],
  data() {
    return {
      movie: null,
      user: null,
      isAdmin: false,
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
        releaseYear: this.movie.releaseYear
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
    },
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      this.user = await UserService.getUser(this.$store.state.auth.user.id);
      if (this.user.role == "admin") this.isAdmin = true;
    }
    this.getMovie();
  }
}
</script>

<style></style>
