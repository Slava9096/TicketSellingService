<template>
  <div v-if="movie" class="container mt-4">
    <h4 class="text-center mb-4">Фильм</h4>
    <div v-if="isAdmin">
      <div v-if="!submitted">
        <form @submit="updateMovie" class="form-card p-4 border rounded">
          <div class="mb-3">
            <input class="form-control" type="text" name="name" id="name" placeholder="Наименование фильма" required
              v-model="movie.name">
          </div>
          <div class="mb-3">
            <input class="form-control" type="text" name="genre" id="genre" placeholder="Жанр" required
              v-model="movie.genre">
          </div>
          <div class="mb-3">
            <input class="form-control" type="number" name="length" id="length" placeholder="Длительность (мин)"
              required v-model="movie.movieLength">
          </div>
          <div class="mb-3">
            <input class="form-control" type="text" name="desc" id="desc" placeholder="Описание фильма" required
              v-model="movie.description">
          </div>
          <div class="mb-3">
            <input class="form-control" type="text" name="releaseYear" id="releaseYear" placeholder="Год выхода"
              required v-model="movie.releaseYear">
          </div>
          <button class="btn btn-primary" type="submit">Обновить</button>
        </form>
        <button class="btn btn-danger mt-3" v-on:click="deleteMovie()">Удалить</button>
      </div>
      <div v-else>
        <h4 class="text-success">Вы успешно обновили запись</h4>
        <router-link class="btn btn-link" to="/listMovies">Вернуться к списку фильмов</router-link>
      </div>
    </div>
    <div v-else>
      <div class="movie-info p-4 border rounded">
        <p><strong>Название:</strong> {{ movie.name }}</p>
        <p><strong>Жанр:</strong> {{ movie.genre }}</p>
        <p><strong>Длительность:</strong> {{ movie.movieLength }} мин.</p>
        <p><strong>Год выхода:</strong> {{ movie.releaseYear }}</p>
        <p><strong>Описание:</strong> {{ movie.description }}</p>
        <div v-if="user">
          <router-link :to="{ name: 'buy-ticket-movie', params: { movieId: movie.id } }">
            <button type="button" class="btn btn-primary">Купить билет</button>
          </router-link>
        </div>
        <div v-else class="text-danger">
          Вы должны быть авторизированы, чтобы купить билет
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <br>
    <p class="text-warning">Выберите фильм</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
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

.text-warning {
  color: #ffc107;
  /* Желтый цвет для предупреждений */
}

.movie-info {
  background-color: #f8f9fa;
  /* Светлый фон для информации о фильме */
  border: 1px solid #dee2e6;
  /* Светлая граница */
  border-radius: 8px;
  /* Закругленные углы */
  padding: 20px;
  /* Отступы внутри карточки */
}
</style>
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
          this.movie.movieLength = this.movie.length;
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
