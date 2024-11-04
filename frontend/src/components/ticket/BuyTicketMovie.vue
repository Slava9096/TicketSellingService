<template>
  <div>
    <h4>Покупка билета</h4>
    <div v-if="!success">
      <form @submit="buyTicket">
        <div class="mb-3">
          <label for="session" class="form-label">Выберите сеанс</label>
          <select @change="getFreeTickets" class="form-select" required v-model="session.id">
            <option value="" disabled selected>Выберите сеанс</option>
            <option v-for="session in sessions" :key="session.id" :value="session.id">
              {{ session.date }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="seat" class="form-label">Выберите место</label>
          <select @change="getTicket" class="form-select" required v-model="ticket.id">
            <option value="" disabled selected>Выберите место</option>
            <option v-for="ticket in freeTickets" :key="ticket.id" :value="ticket.id">
              Место {{ ticket.seat }}
            </option>
          </select>
        </div>
      </form>
      <button type="button" @click="buyTicket" class="btn btn-primary">Купить билет</button>
    </div>
    <div v-else>
      <h4>Вы успешно купили билет</h4>
      <div>
        <router-link to="/listMovies">Вернуться к списку фильмов</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "BuyTicket",
  props: ['movieId'],
  data() {
    return {
      session: {
        id: null,
      },
      order: {
        id: null,
        userId: null,
        date: ""
      },
      ticket: {
        id: null,
        seat: null,
        status: "",
        price: null,
        sessionId: null,
        orderId: null
      },
      sessions: [],
      freeTickets: [],
      user: null,
      success: false
    };
  },
  methods: {
    async buyTicket(e) {
      e.preventDefault();
      await this.createOrder();
      var data = {
        seat: this.ticket.seat,
        status: "Продан",
        price: this.ticket.price,
        sessionId: this.session.id,
        orderId: this.order.id,
      };
      http
        .put("/ticket/" + this.ticket.id, data)
        .then(() => {
          this.success = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    async createOrder() {
      var data = {
        userId: this.user.id,
        date: "",
      };

      // Convert js date to ISO time format
      var jsDate = new Date();
      data.date = jsDate.toISOString();
      await http
        .post("/orders", data)
        .then(response => {
          this.order = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getSessions() {
      var jsDate = new Date();
      let date = jsDate.toISOString();
      http
        .get("/sessions/date=" + date + "&movie=" + this.movieId)
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
    getFreeTickets(e) {
      http.get("/ticketsFree/" + e.target.value)
        .then(response => {
          this.freeTickets = response.data;
        });
    },
    getTicket(e) {
      http.get("/ticket/" + e.target.value)
        .then(response => {
          this.ticket = response.data;
        });
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      this.user = await UserService.getUser(this.$store.state.auth.user.id);
      if (this.user.role == "admin") this.isAdmin = true;
    }
    this.getSessions();
  }
}
</script>

<style></style>
