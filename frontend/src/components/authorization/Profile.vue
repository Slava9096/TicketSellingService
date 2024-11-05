<template>
  <div class="container mt-4">
    <header class="text-center mb-4">
      <h3>
        Профиль <strong>{{ user.name }}</strong>
      </h3>
    </header>

    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Информация о пользователе</h5>
        <p class="card-text">
          <strong>Id:</strong> {{ user.id }}<br>
          <strong>Логин:</strong> {{ user.username }}<br>
          <strong>Почта:</strong> {{ user.email }}<br>
          <strong>Роль:</strong> {{ user.role }}
        </p>
      </div>
    </div>

    <div>
      <h4>Список заказов</h4>
      <ul class="list-group">
        <li class="list-group-item" v-for="order in orders" :key="order.id">
          <router-link :to="{ name: 'order-details', params: { orderId: order.id } }">
            {{ order.date }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.container {
  max-width: 600px;
  /* Ограничение ширины контейнера */
  margin: auto;
  /* Центрирование контейнера */
}

.card {
  border: 1px solid #ced4da;
  /* Граница карточки */
  border-radius: 8px;
  /* Закругленные углы */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* Тень для карточки */
}

.card-title {
  font-weight: bold;
  /* Жирный шрифт для заголовка карточки */
}

.list-group-item {
  transition: background-color 0.3s;
  /* Плавный переход цвета фона */
}

.list-group-item:hover {
  background-color: #f1f1f1;
  /* Цвет фона при наведении */
}
</style>
<script>
import http from "../../http-common";
export default {
  name: 'ProfileUser',
  props: ['id'],
  data() {
    return {
      user: {
        id: null,
        username: "",
        name: "",
        email: "",
        role: ""
      },
      orders: []
    };
  },
  methods: {
    async getUser() {
      let userId = this.$store.state.auth.user.id;
      await http
        .get('/user/' + userId)
        .then(response => {
          this.user = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    getOrders() {
      http
        .get('/orders/user=' + this.user.id)
        .then(response => {
          this.orders = response.data;
          this.orders.forEach((element) => {
            let jsDate = new Date(Date.parse(element.date));
            let fixedDate = (new Date(jsDate - jsDate.getTimezoneOffset() * 60000).toISOString()).slice(0, -8);
            element.date = fixedDate.replace("T", " ");
          })
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  async mounted() {
    if (!this.$store.state.auth.user) {
      this.$router.push('/login');
    }
    await this.getUser();
    this.getOrders();
  }
};
</script>
