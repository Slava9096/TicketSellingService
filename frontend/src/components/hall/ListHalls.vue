<template>
  <div>
    <h4>Список залов</h4>
    <div v-if="isAdmin">
      <router-link class="item btn btn-link" to="/addHall">Добавить зал</router-link>
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
