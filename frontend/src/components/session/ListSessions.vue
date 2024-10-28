<template>
  <div>
    <h4>Список сеансов</h4>
    <div v-if="isAdmin">
      <router-link class="item btn btn-link" to="/addSession">Добавить сеанс</router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="hall in halls" :key="hall.id">
        <strong> Зал {{ hall.hallNumber }} </strong>
        <ul class="list-group">
          <template v-for="session in sessions" :key="session.id">
            <li class="list-group-item" v-if="session.hallId == hall.id">
              <router-link class="btn btn-link" role="button" :to="{
                name: 'session-details',
                params: { id: session.id }
              }">
                {{ session.movie.name }} {{ session.date }}
              </router-link>
            </li>
          </template>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';

export default {
  name: "ListSessions",
  data() {
    return {
      sessions: [],
      movies: [],
      halls: [],
      isAdmin: false,
    };
  },
  methods: {
    getSessions() {
      http
        .get("/sessions")
        .then(response => {
          this.sessions = response.data;
          this.sessions.forEach((element) => {
            // Convert UTC time to local time
            let jsDate = new Date(Date.parse(element.date));
            let fixedDate = (new Date(jsDate - jsDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -8);
            element.date = fixedDate.replace("T", " ");
          });
          this.sessions.sort((a, b) => (a.date > b.date) ? -1 : (a.date < b.date) ? 1 : 0);
        })
        .catch(e => {
          console.log(e);
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
    this.getSessions();
    this.getHalls();
  }
}
</script>

<style></style>
