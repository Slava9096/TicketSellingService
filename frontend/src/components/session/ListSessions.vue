<template>
  <div>
    <h4>Список сеансов</h4>
    <div v-if="isAdmin">
      <router-link class="item btn btn-link" to="/addSession">Добавить сеанс</router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(session, index) in sessions" :key="index">
        <router-link class="btn btn-link" role="button" :to="{
          name: 'session-details',
          params: { id: session.id }
        }">
          {{ session.id }} {{ movies[index] }} {{ halls[index] }}
        </router-link>
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
        })
        .catch(e => {
          console.log(e);
        });
    },
    getMovie(id) {
      http.get("/movie/" + id)
        .then(response => {
          return response.data;
        });
    },
    getHalls(id) {
      http.get("/hall/" + id)
        .then(response => {
          return response.data;
        });
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user.role == "admin") this.isAdmin = true;
    }
    this.getSessions();
  }
}
</script>

<style></style>
