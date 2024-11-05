<template>
  <div class="container">
    <header class="text-center mb-4">
      <h1>Кинотеатр</h1>
      <p>Смотрите последние фильмы в 2D, 3D и IMAX</p>
    </header>
    <section class="upcoming-sessions mb-5">
      <h2>Предстоящие сеансы</h2>
      <div class="session-list">
        <div class="session-card" v-for="session in sessions" :key="session.id">
          <h4>{{ session.movie.name }}</h4>
          <p>Дата: {{ session.date.slice(0, -5) }}</p>
          <p>Время: {{ session.date.slice(-5) }}</p>
          <router-link :to="{ name: 'session-details', params: { id: session.id } }" class="btn btn-primary">Купить
            билет</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  /* Ограничение ширины контейнера */
  margin: auto;
  /* Центрирование контейнера */
  padding: 20px;
  /* Отступы внутри контейнера */
}

header {
  background-color: #f8f9fa;
  /* Светлый фон для заголовка */
  padding: 20px;
  /* Отступы внутри заголовка */
  border-radius: 8px;
  /* Закругленные углы */
}

.movie-list,
.session-list {
  display: flex;
  flex-wrap: wrap;
  /* Позволяет элементам переноситься на новую строку */
  gap: 20px;
  /* Отступы между карточками */
}

.movie-card,
.session-card {
  background-color: #ffffff;
  /* Белый фон для карточек */
  border: 1px solid #dee2e6;
  /* Светлая граница */
  border-radius: 8px;
  /* Закругленные углы */
  padding: 15px;
  /* Отступы внутри карточки */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Легкая тень для глубины */
  flex: 1 1 calc(30% - 20px);
  /* Ширина карточек */
}

.movie-poster {
  width: 100%;
  /* Ширина изображения */
  border-radius: 8px;
  /* Закругленные углы для изображения */
}

.btn {
  margin-top: 10px;
  /* Отступ сверху для кнопок */
}
</style>
<script>
import http from "../../http-common";

export default {
  name: "ListSessions",
  data() {
    return {
      sessions: [],
    };
  },
  methods: {
    getSessions() {
      var jsDate = new Date();
      let date = jsDate.toISOString();
      http
        .get("/sessions/date=" + date)
        .then(response => {
          this.sessions = response.data;
          this.sessions.forEach((element) => {
            let jsDate = new Date(Date.parse(element.date));
            let fixedDate = (new Date(jsDate - jsDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -8);
            element.date = fixedDate.replace("T", " ");
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getSessions();
  }
}
</script>
