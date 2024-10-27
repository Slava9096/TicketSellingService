<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <div class="d-flex flex-row justify-content-between w-100">
        <!-- Needed to align flex right way -->
        <div></div>
        <div class="d-flex flex-row">
          <router-link class="item nav-item nav-link active btn btn-link" to="/listHalls">Залы</router-link>
          <router-link class="item nav-item nav-link active btn btn-link" to="/ListMovies">Фильмы</router-link>
          <router-link class="item nav-item nav-link active btn btn-link" to="/ListSessions">Сеансы</router-link>
        </div>
        <div class="d-flex" v-if="currentUser">
          <router-link class="item nav-item nav-link active btn btn-link" to="/profile">
            {{ currentUser.username }}
          </router-link>
          <a class="item nav-item nav-link active btn btn-link" href @click.prevent="logOut">
            Выйти
          </a>
        </div>
        <div v-else>
          <router-link class="item nav-item nav-link active btn btn-link" to="/login">
            Войти
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {};

  },
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
<style>
.item {
  margin-right: 5px;
}
</style>
