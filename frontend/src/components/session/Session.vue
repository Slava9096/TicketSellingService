<template>
  <div v-if="this.session">
    <h4>Сеанс</h4>
    <div v-if="!submitted">
      <form @submit="updateSession">
        <input class="form-control" type="text" name="title" id="title" placeholder="Наименование сеанса" required
          v-model="session.title">
        <input class="form-control" type="time" name="time" id="time" required v-model="session.time">
        <input class="btn btn-primary" type="submit" value="Обновить">
      </form>
      <button class="btn btn-danger" v-on:click="deleteSession()">Удалить</button>
    </div>
    <div v-else>
      <h4>Вы успешно обновили запись</h4>
      <router-link to="/listSessions">Вернуться к списку сеансов</router-link>
    </div>
  </div>
  <div v-else>
    <br>
    <p>Выберите сеанс</p>
  </div>
</template>

<script>
import http from "../../http-common";
export default {
  name: "session-details",
  props: ['id'],
  data() {
    return {
      session: null,
      submitted: false
    };
  },
  methods: {
    getSession() {
      http
        .get("/session/" + this.id)
        .then(response => {
          this.session = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateSession(e) {
      e.preventDefault();
      var data = {
        title: this.session.title,
        time: this.session.time
      };
      http
        .post("/updateSession/" + this.session.id, data)
        .then(() => {
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    deleteSession() {
      http
        .post("/deleteSession/" + this.session.id)
        .then(() => {
          this.$router.push('/listSessions');
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getSession();
  }
}
</script>

<style></style>
