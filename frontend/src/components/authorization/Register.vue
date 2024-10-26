<template>
  <div class="col-md-5">
    <h4 class="mx-auto mt-4">Регистрация пользователя</h4>
    <form name="form" @submit="handleRegister">
      <div v-if="!successful">
        <div class="form-group">
          <input type="text" class="form-control" name="username" placeholder="Логин" v-model="user.username"
            required />
          <input type="text" class="form-control" name="name" placeholder="Имя" v-model="user.name" required />
          <input type="email" class="form-control" name="email" placeholder="Почта" v-model="user.email" required />
        </div>
        <div class="form-group">
          <input type="password" class="form-control" name="password" placeholder="Пароль" v-model="user.password"
            required />
        </div>
        <div class="form-group">
          <button class="btn btn-primary">Зарегистрировать</button>
        </div>
      </div>
      <div class="form-group">
        <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}</div>
      </div>
      <div class="form-group">
        <div v-if="errorMessage" class="alert alert-danger" role="alert">{{ errorMessage }}</div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      user: {
        username: "",
        password: "",
        name: "",
        email: ""
      },
      successful: false,
      successMessage: '',
      errorMessage: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      window.location.href = '/';
    }
  },
  methods: {
    handleRegister(e) {
      e.preventDefault();
      this.successMessage = '';
      this.errorMessage = '';
      this.$store.dispatch("auth/register", this.user)
        .then(data => {
          this.successMessage = data.message;
          this.successful = true;
        })
        .catch(e => {
          this.errorMessage = e.response.data.message;
        });
    }
  }
};
</script>
