<template>
  <div>
    <h4>Список залов</h4>
    <div v-if="displayContent">
      <router-link class="item btn btn-link" to="/addHall">Добавить зал</router-link>
    </div>
    <div v-else>
      Добавление доступно только авторизованным пользователям
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="(hall, index) in halls" :key="index">
        <router-link class="btn btn-link" role="button" :to="{
          name: 'hall-details',
          params: { id: hall.id }
        }">
          Зал {{ hall.hallNumber }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "ListHalls",
  data() {
    return {
      halls: [],
      displayContent: false
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
      }
      );
    this.getHalls();
  }
}
</script>

<style></style>
