<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Кинотеатр</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/listHalls">Залы</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ListMovies">Фильмы</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ListSessions">Сеансы</router-link>
            </li>
          </ul>
          <div class="d-flex">
            <div v-if="currentUser">
              <router-link class="nav-link" to="/profile">{{ currentUser.username }}</router-link>
              <a class="nav-link" href @click.prevent="logOut">Выйти</a>
            </div>
            <div v-else>
              <router-link class="nav-link" to="/login">Войти</router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      window.location.href = '/login';
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #e3f2fd;
}

.nav-link {
  margin-right: 15px;
  color: #007bff;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #0056b3;
}

.navbar-brand {
  font-weight: bold;
}

.shadow-sm {
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
</style>
