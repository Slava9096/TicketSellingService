<template>
  <div class="container mt-4">
    <h4 class="text-center mb-4">Список залов</h4>
    <div v-if="isAdmin" class="text-end mb-3">
      <router-link class="btn btn-primary" to="/addHall">Добавить зал</router-link>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(hall, index) in halls" :key="index">
        <router-link class="hall-link" role="button" :to="{
          name: 'hall-details',
          params: { id: hall.id }
        }">
          Зал {{ hall.hallNumber }}
        </router-link>
      </li>
    </ul>
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

.list-group-item {
  transition: background-color 0.3s;
  /* Плавный переход цвета фона */
}

.list-group-item:hover {
  background-color: #f8f9fa;
  /* Цвет фона при наведении */
}

.hall-link {
  display: block;
  /* Зал делает ссылку блочной */
  padding: 15px;
  /* Увеличенные отступы для удобства */
  text-decoration: none;
  /* Убираем подчеркивание */
  color: #007bff;
  /* Цвет текста */
  font-weight: 500;
  /* Полужирный шрифт */
}

.hall-link:hover {
  color: #0056b3;
  /* Цвет текста при наведении */
}
</style>
<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "ListHalls",
  data() {
    return {
      halls: [],
      isAdmin: false
    };
  },
  methods: {
    getHalls() {
      http
        .get("/halls")
        .then(response => {
          this.halls = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user.role == "admin") this.isAdmin = true;
    }
    this.getHalls();
  }
}
</script>

<style></style>
