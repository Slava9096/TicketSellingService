<template>
  <div>
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
</template>

<script>
import http from "../../http-common";
export default {
  name: "AddHall",
  data() {
    return {
      hall: {
        hallNumber: "",
        seatsNumber: null,
        type: ""
      },
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
  }
}
</script>

<style></style>
