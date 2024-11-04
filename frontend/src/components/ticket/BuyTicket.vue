<template>
  <div>
    <h4>Покупка билета</h4>
    <div v-if="!success">
      <p>Сеанс {{ ticket.session.date }}</p>
      <p>Место {{ ticket.seat }}</p>
      <button type="button" @click="buyTicket()" class="btn btn-primary">Купить билет</button>
    </div>
    <div v-else>
      <h4>Вы успешно купили билет</h4>
      <div>
        <router-link to="/listSessions">Вернуться к списку сеансов</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "BuyTicket",
  props: ['ticketId'],
  data() {
    return {
      ticket: {
        id: null,
        seat: null,
        status: "",
        price: null,
        sessionId: null,
        orderId: null,
        session: {
          date: ""
        }
      },
      order: {
        id: null,
        userId: null,
        date: ""
      },
      user: null,
      success: false
    };
  },
  methods: {
    async buyTicket() {
      await this.createOrder();
      var data = {
        seat: this.ticket.seat,
        status: "Продан",
        price: this.ticket.price,
        sessionId: this.ticket.sessionId,
        orderId: this.order.id,
      };
      http
        .put("/ticket/" + this.ticketId, data)
        .then(() => {
          this.success = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getTicket() {
      http
        .get("/ticket/" + this.ticketId)
        .then(response => {
          this.ticket = response.data;
          // Convert UTC time to local time
          let jsDate = new Date(Date.parse(this.ticket.session.date));
          let fixedDate = (new Date(jsDate - jsDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -8);
          this.ticket.session.date = fixedDate.replace("T", " ");
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
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      this.user = await UserService.getUser(this.$store.state.auth.user.id);
      if (this.user.role == "admin") this.isAdmin = true;
    }
    await this.getTicket();
  }
}
</script>

<style></style>
