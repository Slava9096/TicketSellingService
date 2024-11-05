<template>
  <div class="container mt-4">
    <h4 class="text-center mb-4">Список сеансов</h4>
    <div v-if="isAdmin" class="text-end mb-3">
      <router-link class="btn btn-primary" to="/addSession">Добавить сеанс</router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="hall in halls" :key="hall.id">
        <strong>Зал {{ hall.hallNumber }}</strong>
        <ul class="list-group mt-2">
          <template v-for="session in sessions" :key="session.id">
            <li class="list-group-item" v-if="session.hallId == hall.id">
              <router-link class="session-link" role="button" :to="{
                name: 'session-details',
                params: { id: session.id }
              }">
                {{ session.movie.name }} - {{ session.date }}
              </router-link>
            </li>
          </template>
        </ul>
      </li>
    </ul>
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

.list-group-item {
  transition: background-color 0.3s;
  /* Плавный переход цвета фона */
}

.list-group-item:hover {
  background-color: #f8f9fa;
  /* Цвет фона при наведении */
}

.session-link {
  display: block;
  /* Зал делает ссылку блочной */
  padding: 10px;
  /* Увеличенные отступы для удобства */
  text-decoration: none;
  /* Убираем подчеркивание */
  color: #007bff;
  /* Цвет текста */
  font-weight: 500;
  /* Полужирный шрифт */
}

.session-link:hover {
  color: #0056b3;
  /* Цвет текста при наведении */
  background-color: #e9ecef;
  /* Цвет фона при наведении */
}
</style>

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
