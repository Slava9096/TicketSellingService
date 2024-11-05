<template>
  <div>
    <h4 class="text-center mb-4">Ваш заказ</h4>
    <div class="ticket-list">
      <div class="ticket-card" v-for="ticket in tickets" :key="ticket.id">
        <h5 class="ticket-movie">{{ ticket.session.movie.name }}</h5>
        <p class="ticket-details">
          <strong>Место:</strong> {{ ticket.seat }}<br>
          <strong>Дата сеанса:</strong> {{ ticket.session.date }}
        </p>
      </div>
    </div>
    <div class="text-center mt-4">
      <router-link to="/profile" class="btn btn-secondary">Вернуться в профиль</router-link>
    </div>
  </div>
</template>
<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "BuyTicket",
  props: ['orderId'],
  data() {
    return {
      tickets: []
    };
  },
  methods: {
    getTickets() {
      http
        .get("/tickets/orderId=" + this.orderId)
        .then(response => {
          this.tickets = response.data;
          this.tickets.forEach((element) => {
            let jsDate = new Date(Date.parse(element.session.date));
            let fixedDate = (new Date(jsDate - jsDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -8);
            element.session.date = fixedDate.replace("T", " ");
          });
        })
        .catch(e => {
          console.log(e);
        });
    },
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      this.user = await UserService.getUser(this.$store.state.auth.user.id);
      if (this.user.role == "admin") this.isAdmin = true;
    }
    this.getTickets();
  }
}
</script>
<style>
.ticket-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.ticket-card {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.ticket-movie {
  margin: 0;
  font-weight: bold;
}

.ticket-details {
  margin: 5px 0 0;
  color: #555;
}

.btn {
  padding: 10px 20px;
}
</style>
