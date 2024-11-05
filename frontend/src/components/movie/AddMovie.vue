<template>
  <div v-if="isAdmin" class="container mt-4">
    <h4 class="text-center mb-4">Добавление фильма</h4>
    <div v-if="!submitted">
      <form @submit="addMovie" class="form-card p-4 border rounded">
        <div class="mb-3">
          <input class="form-control" type="text" name="name" id="name" placeholder="Наименование фильма" required
            v-model="movie.name">
        </div>
        <div class="mb-3">
          <input class="form-control" type="text" name="genre" id="genre" placeholder="Жанр" required
            v-model="movie.genre">
        </div>
        <div class="mb-3">
          <input class="form-control" type="number" min="0" name="length" id="length" placeholder="Длительность (мин)"
            required v-model="movie.movieLength">
        </div>
        <div class="mb-3">
          <input class="form-control" type="text" name="desc" id="desc" placeholder="Описание фильма" required
            v-model="movie.description">
        </div>
        <div class="mb-3">
          <input class="form-control" type="number" min="1900" max="2099" name="releaseYear" id="releaseYear"
            placeholder="Год выхода" required v-model="movie.releaseYear">
        </div>
        <button class="btn btn-primary" type="submit">Добавить</button>
      </form>
    </div>
    <div v-else>
      <h4 class="text-success">Вы успешно добавили запись</h4>
      <div class="mt-3">
        <button class="btn btn-primary" v-on:click="newMovie">Добавить новый фильм</button>
      </div>
      <div class="mt-2">
        <router-link class="btn btn-link" to="/listMovies">Вернуться к списку фильмов</router-link>
      </div>
    </div>
  </div>
  <div v-else class="text-danger mt-4">
    Недостаточно прав для добавления
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

.form-card {
  background-color: #f8f9fa;
  /* Светлый фон для формы */
  border: 1px solid #dee2e6;
  /* Светлая граница */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Легкая тень для глубины */
  border-radius: 8px;
  /* Закругленные углы */
}

.mb-3 {
  margin-bottom: 1rem;
  /* Отступ снизу для полей ввода */
}

.btn {
  font-weight: bold;
  /* Жирный шрифт для кнопок */
}

.text-success {
  color: #28a745;
  /* Зеленый цвет для успешного сообщения */
}

.text-danger {
  color: #dc3545;
  /* Красный цвет для сообщений об ошибках */
}

.btn-link {
  color: #007bff;
  /* Цвет ссылки */
}

.btn-link:hover {
  text-decoration: underline;
  /* Подчеркивание при наведении */
}
</style>

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
