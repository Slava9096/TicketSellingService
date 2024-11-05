<template>
  <div v-if="session" class="container mt-4">
    <h4 class="text-center mb-4">Сеанс</h4>
    <div v-if="isAdmin">
      <div v-if="!submitted">
        <form @submit="updateSession" class="form-card p-4 border rounded">
          <div class="mb-3">
            <label for="date" class="form-label">Дата сеанса</label>
            <input class="form-control" type="datetime-local" id="date" required v-model="session.date">
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
          <button type="submit" class="btn btn-primary">Обновить сеанс</button>
        </form>
        <button class="btn btn-danger mt-3" @click="deleteSession()">Удалить</button>
      </div>
      <div v-else>
        <h4 class="text-success">Вы успешно обновили запись</h4>
        <router-link to="/listSessions" class="btn btn-secondary">Вернуться к списку сеансов</router-link>
      </div>
    </div>
    <div v-else>
      <div class="session-info p-4 border rounded">
        <p><strong>Дата сеанса:</strong> {{ sessionDateString }}</p>
        <p><strong>Фильм:</strong> {{ session.movie.name }}</p>
        <p><strong>Зал:</strong> Зал {{ session.hall.hallNumber }}</p>
      </div>
    </div>
    <div class="mt-4">
      <h5>Свободные места:</h5>
      <div v-if="loggedIn" class="seats-container">
        <div class="seat" v-for="ticket in freeTickets" :key="ticket.id">
          <div v-if="!isAdmin">
            <router-link :to="{ name: 'buy-ticket', params: { ticketId: ticket.id } }">
              Место {{ ticket.seat }}
            </router-link>
          </div>
          <div v-else>
            Место {{ ticket.seat }}
          </div>
        </div>
      </div>
      <div v-else class="seats-container">
        <div class="seat" v-for="ticket in freeTickets" :key="ticket.id">
          Место {{ ticket.seat }}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <br>
    <p class="text-warning">Выберите сеанс</p>
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

.text-warning {
  color: #ffc107;
  /* Желтый цвет для предупреждений */
}

.session-info {
  background-color: #f8f9fa;
  /* Светлый фон для информации о сеансе */
  border: 1px solid #dee2e6;
  /* Светлая граница */
  border-radius: 8px;
  /* Закругленные углы */
  padding: 20px;
  /* Отступы внутри карточки */
}

.seats-container {
  display: grid;
  /* Используем grid для размещения мест */
  grid-template-columns: repeat(5, 1fr);
  /* 5 мест в строке */
  gap: 10px;
  /* Отступы между местами */
  margin-top: 10px;
  /* Отступ сверху */
}

.seat {
  background-color: #e9ecef;
  /* Светлый фон для мест */
  border: 1px solid #ced4da;
  /* Граница для мест */
  border-radius: 4px;
  /* Закругленные углы */
  padding: 10px;
  /* Отступы внутри мест */
  text-align: center;
  /* Центрирование текста */
  cursor: pointer;
  /* Указатель при наведении */
  transition: background-color 0.3s;
  /* Плавный переход цвета фона */
}

.seat:hover {
  background-color: #007bff;
  /* Цвет при наведении */
  color: white;
  /* Белый текст при наведении */
}
</style>
<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "session-details",
  props: ['id'],
  data() {
    return {
      session: null,
      movies: [],
      halls: [],
      freeTickets: [],
      isAdmin: false,
      loggedIn: false,
      sessionDateString: "",
      submitted: false
    };
  },
  methods: {
    async getSession() {
      await http
        .get("/session/" + this.id)
        .then(response => {
          this.session = response.data;
          // Convert UTC time to local time
          let jsDate = new Date(Date.parse(response.data.date));
          let fixedDate = (new Date(jsDate - jsDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -1);
          this.session.date = fixedDate;
          this.sessionDateString = fixedDate.replace("T", " ").slice(0, -7);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateSession(e) {
      e.preventDefault();
      var data = {
        date: this.session.date
      };
      http
        .put("/session/" + this.session.id, data)
        .then(() => {
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    deleteSession() {
      http
        .delete("/session/" + this.session.id)
        .then(() => {
          this.$router.push('/listSessions');
        })
        .catch(e => {
          console.log(e);
        });
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
    },
    getFreeTickets() {
      http.get("/ticketsFree/" + this.session.id)
        .then(response => {
          this.freeTickets = response.data;
        });
    },
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user) this.loggedIn = true;
      if (user.role == "admin") this.isAdmin = true;
    }
    await this.getSession();
    this.getMovies();
    this.getHalls();
    this.getFreeTickets();
  }
}
</script>
