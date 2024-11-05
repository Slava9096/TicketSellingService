<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div class="card shadow">
                    <div class="card-body">
                        <h4 class="text-center mb-4">Вход в систему</h4>
                        <form name="form" @submit="handleLogin">
                            <div class="form-group mb-3">
                                <input type="text" class="form-control" name="username" placeholder="Логин"
                                    v-model="user.username" required />
                            </div>
                            <div class="form-group mb-3">
                                <input type="password" class="form-control" name="password" placeholder="Пароль"
                                    v-model="user.password" required />
                            </div>
                            <div class="form-group mb-4">
                                <button class="btn btn-primary w-100" :disabled="loading">
                                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                                    <span>Войти</span>
                                </button>
                            </div>
                            <div class="text-center mb-3">
                                <router-link to="/register">Зарегистрироваться</router-link>
                            </div>
                            <div class="form-group">
                                <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    /* Ограничение ширины контейнера */
}

.card {
    border-radius: 10px;
    /* Закругленные углы карточки */
}

.card-body {
    padding: 2rem;
    /* Увеличенные отступы внутри карточки */
}

h4 {
    font-weight: bold;
    /* Жирный шрифт для заголовка */
}

.form-control {
    border-radius: 5px;
    /* Закругленные углы для полей ввода */
}

.btn {
    font-weight: bold;
    /* Жирный шрифт для кнопки */
}

.alert {
    margin-top: 10px;
    /* Отступ сверху для сообщения об ошибке */
}
</style>
<script>
export default {
    name: 'LoginUser',
    data() {
        return {
            user: {
                username: "",
                password: ""
            },
            loading: false,
            message: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created() {
        if (this.loggedIn) {


            window.location.href = '/';
        }
    },
    methods: {
        handleLogin(e) {
            e.preventDefault();
            this.loading = true;
            this.$store.dispatch("auth/login", this.user)
                .then(() => {
                    window.location.href = '/';
                })
                .catch(e => {
                    this.loading = false;
                    this.message = e.response.data.message;
                }
                );
        }
    }
};
</script>
