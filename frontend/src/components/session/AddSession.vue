<template>
  <div v-if="isAdmin" class="container mt-4">
    <h4 class="text-center mb-4">Добавление сеанса</h4>
    <div v-if="!submitted">
      <form @submit="addSession" class="form-card p-4 border rounded">
        <div class="mb-3">
          <label for="date" class="form-label">Дата сеанса</label>
          <input class="form-control" type="datetime-local" name="date" id="date" required v-model="session.date">
        </div>
        <div class="mb-3">
          <label for="movie" class="form-label">Выберите фильм</label>
          <select class="form-select" required v-model="session.movieId">
            <option value="" disabled selected>Выберите фильм</option>
            <option v-for="movie in movies" :key="movie.id" :value="movie.id">
              {{ movie.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="hall" class="form-label">Выберите зал</label>
          <select class="form-select" required v-model="session.hallId">
            <option value="" disabled selected>Выберите зал</option>
            <option v-for="hall in halls" :key="hall.id" :value="hall.id">
              Зал {{ hall.hallNumber }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="ticketPrice" class="form-label">Стоимость билетов</label>
          <input class="form-control" type="number" min="0" name="ticketPrice" id="ticketPrice"
            placeholder="Стоимость билетов" required v-model="ticketPrice">
        </div>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </form>
    </div>
    <div v-else>
      <h4 class="text-success">Вы успешно добавили запись</h4>
      <div class="mt-3">
        <button class="btn btn-primary" @click="newSession">Добавить новый сеанс</button>
      </div>
      <div class="mt-2">
        <router-link to="/listSessions" class="btn btn-secondary">Вернуться к списку сеансов</router-link>
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
</style>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "AddSession",
  data() {
    return {
      session: {
        id: null,
        date: "",
        movieId: null,
        hallId: null
      },
      movies: [],
      halls: [],
      ticketPrice: 0,
      isAdmin: false,
      submitted: false
    };
  },
  methods: {
    async addSession(e) {
      e.preventDefault();
      var data = {
        date: "",
        movieId: this.session.movieId,
        hallId: this.session.hallId
      };

      // Convert html datetime-local to ISO time format
      var htmlDate = this.session.date;
      var jsDate = new Date(htmlDate);
      data.date = jsDate.toISOString();

      await http
        .post("/sessions", data)
        .then(response => {
          this.session.id = response.data.id;
        })
        .catch(e => {
          console.log(e);
        });
      let hall = this.halls.find((element) => element.id == this.session.hallId);
      let ticketData = { tickets: [] };
      for (let i = 0; i < hall.seatsNumber; i++) {
        ticketData.tickets.push({
          seat: i + 1,
          status: "Свободно",
          price: this.ticketPrice,
          sessionId: this.session.id,
          orderId: null
        })
      }
      http
        .post("/tickets", ticketData)
        .then()
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    newSession() {
      this.submitted = false;
      this.session = {
        id: null,
        title: "",
        time: ""
      };
    },
    getMovies() {
      http.get("/movies")
        .then(response => {
          this.movies = response.data;
        });
    },
    getHalls() {
      http.get("/halls")
        .then(response => {
          this.halls = response.data;
        });
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user.role == "admin") this.isAdmin = true;
    }
    this.getMovies();
    this.getHalls();
  }
}
</script>

<style></style>
