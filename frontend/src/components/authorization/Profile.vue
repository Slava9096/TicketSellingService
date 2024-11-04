<template>
  <div class="container">
    <header>
      <h3>
        Профиль <strong>{{ user.name }}</strong>
      </h3>
    </header>
    <p>
      <strong>Id:</strong>
      {{ user.id }}
    </p>
    <p>
      <strong>Логин:</strong>
      {{ user.username }}
    </p>
    <p>
      <strong>Почта:</strong>
      {{ user.email }}
    </p>
    <p>
      <strong>Роль:</strong>
      {{ user.role }}
    </p>
  </div>
  <div class="container">
    <h4>Список заказов</h4>
    <ul class="list-group">
      <li class="list-group-item" v-for="order in orders" :key="order.id">
        {{ order.date }} {{ order.id }}
      </li>
    </ul>
  </div>
</template>
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
