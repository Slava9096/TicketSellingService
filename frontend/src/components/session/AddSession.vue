<template>
  <div>
    <h4>Добавление сеанса</h4>
    <div v-if="!submitted">
      <form @submit="addSession">
        <input class="form-control" type="text" name="title" id="title" placeholder="Наименование сеанса" required
          v-model="session.title">
        <input class="form-control" type="time" name="time" id="time" required v-model="session.time">
        <input class="btn btn-primary" type="submit" value="Добавить">
      </form>
    </div>
    <div v-else>
      <h4>Вы успешно добавили запись</h4>
      <div>
        <button class="btn btn-primary" v-on:click="newSession">Добавить новый сеанс</button>
      </div>
      <div>
        <router-link to="/listSessions">Вернуться к списку сеансов</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "AddSession",
  data() {
    return {
      session: {
        id: null,
        title: "",
        time: ""
      },
      submitted: false
    };
  },
  methods: {
    addSession(e) {
      e.preventDefault();
      var data = {
        title: this.session.title,
        time: this.session.time
      };
      http
        .post("/addSession", data)
        .then(response => {
          this.session.id = response.data.id;
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    newSession() {
      this.submitted = false;
      this.session = {
        id: null,
        title: "",
        time: ""
      };
    }
  }
}
</script>

<style></style>
