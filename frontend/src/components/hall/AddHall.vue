<template>
  <div v-if="isAdmin">
    <h4>Добавление зала</h4>
    <div v-if="!submitted">
      <form @submit="addHall">
        <input class="form-control" type="text" name="hallNumber" id="hallNumber" placeholder="Номер зала" required
          v-model="hall.hallNumber">
        <input class="form-control" type="number" name="seatsNumber" id="seatsNumber" placeholder="Количество мест"
          required v-model="hall.seatsNumber">
        <input class="form-control" type="text" name="type" id="type" placeholder="Тип" required v-model="hall.type">
        <input class="btn btn-primary" type="submit" value="Добавить">
      </form>
    </div>
    <div v-else>
      <h4>Вы успешно добавили запись</h4>
      <div>
        <button class="btn btn-primary" v-on:click="newHall">Добавить новый зал</button>
      </div>
      <div>
        <router-link to="/listHalls">Вернуться к списку залов</router-link>
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
  name: "AddHall",
  data() {
    return {
      hall: {
        hallNumber: "",
        seatsNumber: null,
        type: ""
      },
      isAdmin: false,
      submitted: false
    };
  },
  methods: {
    addHall(e) {
      e.preventDefault();
      var data = {
        hallNumber: this.hall.hallNumber,
        seatsNumber: this.hall.seatsNumber,
        type: this.hall.type
      };
      http
        .post("/halls", data)
        .then(response => {
          this.hall.id = response.data.id;
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    newHall() {
      this.submitted = false;
      this.hall = {
        hallNumber: this.hall.hallNumber,
        seatsNumber: this.hall.seatsNumber,
        type: this.hall.type
      };
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user.role == "admin") this.isAdmin = true;
    }
  }
}
</script>

<style></style>
