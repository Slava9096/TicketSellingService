<template>
  <div v-if="session">
    <h4>Сеанс</h4>
    <div v-if="isAdmin">
      <div v-if="!submitted">
        <form @submit="updateSession">
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
        <button class="btn btn-danger" @click="deleteSession()">Удалить</button>
      </div>
      <div v-else>
        <h4>Вы успешно обновили запись</h4>
        <router-link to="/listSessions" class="btn btn-secondary">Вернуться к списку сеансов</router-link>
      </div>
    </div>
    <div v-else>
      <p><strong>Дата сеанса:</strong> {{ sessionDateString }}</p>
      <p><strong>Фильм:</strong> {{ session.movie.name }}</p>
      <p><strong>Зал:</strong> Зал {{ session.hall.hallNumber }}</p>
    </div>
    <div>
      <h5>Свободные места:</h5>
      <div v-if="loggedIn" class="seats-container">
        <div class="seat" v-for="ticket in freeTickets" :key="ticket.id">
          <router-link :to="{
            name: 'buy-ticket',
            params: { ticketId: ticket.id }
          }">
            Место {{ ticket.seat }}
          </router-link>
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
    <p>Выберите сеанс</p>
  </div>
</template>

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

<style>
.seats-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
}
</style>
