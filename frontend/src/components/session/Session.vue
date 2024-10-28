<template>
  <div v-if="this.session">
    <h4>Сеанс</h4>
    <div v-if="isAdmin">
      <div v-if="!submitted">
        <form @submit="updateSession">
          <div>
            <input class="form-control" type="datetime-local" name="date" id="date" placeholder="Дата сеанса" required
              v-model="session.date">
          </div>
          <div>
            <select class="form-select" required v-model="session.movieId">
              <option value="" disabled selected>Выберите фильм</option>
              <option v-for="movie in movies" v-bind:key="movie.id" v-bind:value="movie.id">
                {{ movie.name }}
              </option>
            </select>
          </div>
          <div>
            <select class="form-select" required v-model="session.hallId">
              <option value="" disabled selected>Выберите зал</option>
              <option v-for="hall in halls" v-bind:key="hall.id" v-bind:value="hall.id">
                Зал {{ hall.hallNumber }}
              </option>
            </select>
          </div>
        </form>
        <button class="btn btn-danger" v-on:click="deleteSession()">Удалить</button>
      </div>
      <div v-else>
        <h4>Вы успешно обновили запись</h4>
        <router-link to="/listSessions">Вернуться к списку сеансов</router-link>
      </div>
    </div>
    <div v-else>
      <p>
        <strong>Дата сеанса:</strong>
        {{ sessionDateString }}
      </p>
      <p>
        <strong>Фильм:</strong>
        {{ session.movie.name }}
      </p>
      <p>
        <strong>Зал:</strong>
        Зал {{ session.hall.hallNumber }}
      </p>
    </div>
    <div>
      <p>Свободные места:</p>
      <ul class="group-list">
        <li class="group-list-item" v-for="ticket in freeTickets" :key="ticket.id">
          {{ ticket.seat }}
        </li>
      </ul>
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
      if (user.role == "admin") this.isAdmin = true;
    }
    await this.getSession();
    this.getMovies();
    this.getHalls();
    this.getFreeTickets();
  }
}
</script>

<style></style>
