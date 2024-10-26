<template>
  <div>
    <h4>Список сеансов</h4>
    <div v-if="displayContent">
      <router-link class="item btn btn-link" to="/addSession">Добавить сеанс</router-link>
    </div>
    <div v-else>
      Добавление доступно только авторизованным пользователям
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(session, index) in sessions" :key="index">
        <router-link class="btn btn-link" role="button" :to="{
          name: 'session-details',
          params: { id: session.id }
        }">
          {{ session.id }}
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
      displayContent: false
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
    }
  },
  mounted() {
    UserService.getUserBoard()
      .then(() => {
        this.displayContent = true;
      })
      .catch(e => {
        this.content =
          (e.response && e.response.data) ||
          e.message ||
          e.toString();
      });
    this.getSessions();
  }
}
</script>

<style></style>
