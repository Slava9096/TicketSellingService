<template>
  <div class="container mt-4">
    <h4 class="text-center mb-4">Покупка билета</h4>
    <div v-if="!success" class="ticket-info p-4 border rounded">
      <p><strong>Сеанс:</strong> {{ ticket.session.date }}</p>
      <p><strong>Место:</strong> {{ ticket.seat }}</p>
      <button type="button" @click="buyTicket()" class="btn btn-primary mt-3">Купить билет</button>
    </div>
    <div v-else>
      <h4 class="text-success">Вы успешно купили билет!</h4>
      <div class="mt-3">
        <router-link to="/listSessions" class="btn btn-secondary">Вернуться к списку сеансов</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  /* Ограничение ширины контейнера */
  margin: auto;
  /* Центрирование контейнера */
}

h4 {
  font-weight: bold;
  /* Жирный шрифт для заголовка */
}

.ticket-info {
  background-color: #f8f9fa;
  /* Светлый фон для информации о билете */
  border: 1px solid #dee2e6;
  /* Светлая граница */
  border-radius: 8px;
  /* Закругленные углы */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Легкая тень для глубины */
}

.btn {
  font-weight: bold;
  /* Жирный шрифт для кнопок */
}

.text-success {
  color: #28a745;
  /* Зеленый цвет для успешного сообщения */
}
</style>

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
