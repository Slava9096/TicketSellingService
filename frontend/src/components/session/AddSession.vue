<template>
  <div v-if="isAdmin">
    <h4>Добавление сеанса</h4>
    <div v-if="!submitted">
      <form @submit="addSession">
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
        <input class="btn btn-primary" type="submit" value="Добавить">
      </form>
    </div>
    <div v-else>
      <h4>Вы успешно добавили запись</h4>
      <div>
        <button class="btn btn-primary" v-on:click="newSession">Добавить новый сеанс</button>
      </div>
      <div>
        <router-link to="/listSessions">Вернуться к списку сеансов</router-link>
      </div>
    </div>
  </div>
  <div v-else>
    Недостаточно прав для добавления
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "AddSession",
  data() {
    return {
      session: {
        date: "",
        movieId: null,
        hallId: null
      },
      movies: [],
      halls: [],
      isAdmin: false,
      submitted: false
    };
  },
  methods: {
    addSession(e) {
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

      http
        .post("/sessions", data)
        .then(response => {
          this.session.id = response.data.id;
        })
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
