<template>
  <div v-if="hall" class="container mt-4">
    <h4 class="text-center mb-4">Зал</h4>
    <div v-if="isAdmin">
      <div v-if="!submitted">
        <form @submit="updateHall" class="form-card p-4 border rounded">
          <div class="mb-3">
            <label for="hallNumber" class="form-label">Номер зала</label>
            <input class="form-control" type="text" name="hallNumber" id="hallNumber" placeholder="Номер зала" required
              v-model="hall.hallNumber">
          </div>
          <div class="mb-3">
            <label for="seatsNumber" class="form-label">Количество мест</label>
            <input class="form-control" type="number" name="seatsNumber" id="seatsNumber" placeholder="Количество мест"
              required v-model="hall.seatsNumber">
          </div>
          <div class="mb-3">
            <label for="type" class="form-label">Тип</label>
            <input class="form-control" type="text" name="type" id="type" placeholder="Тип" required
              v-model="hall.type">
          </div>
          <button type="submit" class="btn btn-primary">Обновить</button>
        </form>
        <button class="btn btn-danger mt-3" @click="deleteHall">Удалить</button>
      </div>
      <div v-else>
        <h4 class="text-success">Вы успешно обновили запись</h4>
        <router-link to="/listHalls" class="btn btn-secondary mt-3">Вернуться к списку залов</router-link>
      </div>
    </div>
    <div v-else>
      <div class="hall-info p-4 border rounded">
        <p><strong>Номер зала:</strong> {{ hall.hallNumber }}</p>
        <p><strong>Количество мест:</strong> {{ hall.seatsNumber }}</p>
        <p><strong>Тип зала:</strong> {{ hall.type }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <br>
    <p class="text-warning">Выберите зал</p>
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

.form-card {
  background-color: #f8f9fa;
  /* Светлый фон для формы */
  border: 1px solid #dee2e6;
  /* Светлая граница */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Легкая тень для глубины */
  border-radius: 8px;
  /* Закругленные углы */
}

.mb-3 {
  margin-bottom: 1rem;
  /* Отступ снизу для полей ввода */
}

.btn {
  font-weight: bold;
  /* Жирный шрифт для кнопок */
}

.text-success {
  color: #28a745;
  /* Зеленый цвет для успешного сообщения */
}

.text-warning {
  color: #ffc107;
  /* Желтый цвет для предупреждений */
}

.hall-info {
  background-color: #f8f9fa;
  /* Светлый фон для информации о зале */
  border: 1px solid #dee2e6;
  /* Светлая граница */
  border-radius: 8px;
  /* Закругленные углы */
  padding: 20px;
  /* Отступы внутри карточки */
}
</style>

<script>
import http from "../../http-common";
import UserService from '../../services/user.service';
export default {
  name: "hall-details",
  props: ['id'],
  data() {
    return {
      hall: null,
      isAdmin: false,
      submitted: false
    };
  },
  methods: {
    getHall() {
      http
        .get("/hall/" + this.id)
        .then(response => {
          this.hall = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateHall(e) {
      e.preventDefault();
      var data = {
        hallNumber: this.hall.hallNumber,
        seatsNumber: this.hall.seatsNumber,
        type: this.hall.type
      };
      http
        .put("/hall/" + this.hall.id, data)
        .then(() => {
        })
        .catch(e => {
          console.log(e);
        });
      this.submitted = true;
    },
    deleteHall() {
      http
        .delete("/hall/" + this.hall.id)
        .then(() => {
          this.$router.push('/listHalls');
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  async mounted() {
    if (this.$store.state.auth.user) {
      let user = await UserService.getUser(this.$store.state.auth.user.id);
      if (user.role == "admin") this.isAdmin = true;
    }
    this.getHall();
  }
}
</script>

<style></style>
