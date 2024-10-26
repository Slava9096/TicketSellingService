<template>
  <div v-if="this.hall">
    <h4>Зал</h4>
    <div v-if="!submitted">
      <form @submit="updateHall">
        <input class="form-control" type="text" name="hallNumber" id="hallNumber" placeholder="Номер зала" required
          v-model="hall.hallNumber">
        <input class="form-control" type="number" name="seatsNumber" id="seatsNumber" placeholder="Количество мест"
          required v-model="hall.seatsNumber">
        <input class="form-control" type="text" name="type" id="type" placeholder="Тип" required v-model="hall.type">
        <input class="btn btn-primary" type="submit" value="Обновить">
      </form>
      <button class="btn btn-danger" v-on:click="deleteHall()">Удалить</button>
    </div>
    <div v-else>
      <h4>Вы успешно обновили запись</h4>
      <router-link to="/listHalls">Вернуться к списку залов</router-link>
    </div>
  </div>
  <div v-else>
    <br>
    <p>Выберите зал</p>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "hall-details",
  props: ['id'],
  data() {
    return {
      hall: null,
      submitted: false
    };
  },
  methods: {
    getHall() {
      http
        .get("/hall/" + this.id)
        .then(response => {
          this.hall = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateHall(e) {
      e.preventDefault();
      var data = {
        hallNumber: this.hall.hallNumber,
        seatsNumber: this.hall.seatsNumber,
        type: this.hall.type
      };
      http
        .put("/hall/" + this.hall.id, data)
        .then(() => {
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    deleteHall() {
      http
        .delete("/hall/" + this.hall.id)
        .then(() => {
          this.$router.push('/listHalls');
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getHall();
  }
}
</script>

<style></style>
