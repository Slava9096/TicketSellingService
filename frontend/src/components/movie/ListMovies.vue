<template>
  <div class="container mt-4">
    <h4 class="text-center mb-4">Список фильмов</h4>
    <div v-if="isAdmin" class="text-end mb-3">
      <router-link class="btn btn-primary" to="/addMovie">Добавить фильм</router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(movie, index) in movies" :key="index">
        <router-link class="movie-link" role="button" :to="{
          name: 'movie-details',
          params: { id: movie.id }
        }">
          {{ movie.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  /* Ограничение ширины контейнера */
  margin: auto;
  /* Центрирование контейнера */
}

h4 {
  font-weight: bold;
  /* Жирный шрифт для заголовка */
}

.list-group-item {
  transition: background-color 0.3s;
  /* Плавный переход цвета фона */
}

.list-group-item:hover {
  background-color: #f8f9fa;
  /* Цвет фона при наведении */
}

.movie-link {
  display: block;
  /* Зал делает ссылку блочной */
  padding: 15px;
  /* Увеличенные отступы для удобства */
  text-decoration: none;
  /* Убираем подчеркивание */
  color: #007bff;
  /* Цвет текста */
  font-weight: 500;
  /* Полужирный шрифт */
}

.movie-link:hover {
  color: #0056b3;
  /* Цвет текста при наведении */
}
</style>
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
