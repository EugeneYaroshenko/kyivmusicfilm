<template>
  <div class="form-container">
    <form @submit.prevent="requestLogin" class="form">
      <h2 class="title">Ти адмін?</h2>
      <div class="notification" v-if="error">
        <div class="notification-text">
          Помилка входу
        </div>
      </div>
      <input class="admin-input" type="text" v-model="form.username" placeholder="Ім'я">
      <input class="admin-input" type="password" v-model="form.password" placeholder="Пароль">
      <button class="admin-submit"  type="submit" :class="{'admin-submit--disabled': !buttonEnabled }">
        Адмін!
      </button>
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        form: {
          username: null,
          password: null
        },
        notificationShown: false
      }
    },
    computed: {
      ...mapState({
                    error: state => state.auth.request.error,
                    loggedIn: state => state.auth.loggedIn
                  }),
      buttonEnabled () {
        return this.form.username && this.form.password
      }
    },
    watch: {
      loggedIn: function (newValue) {
        if (newValue) {
          this.$router.push('/admin/films')
        }
      }
    },
    methods: {
      requestLogin () {
        this.$store.dispatch('auth/loginUser', { username: this.form.username, password: this.form.password })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .title {
    text-align: center;
  }

  input, button {
    outline: 0;
    background: 0;
    border: 0;
  }

  .admin-input {
    padding: 24px 16px;
    box-shadow: 0 0 8px rgba(32, 32, 32, .1);
    border-radius: 16px;
    margin-bottom: 8px;
  }

  .admin-submit {
    background-color: #25DD64;
    padding: 16px 18px;
    border-radius: 24px;
    color: #fff;
    font-size: 1.3em;
    font-weight: bold;
    cursor: pointer;
  }

  .admin-submit--disabled {
    cursor: none;
    opacity: .47;
  }

  .notification {
    background: #DD25A4;
    padding: 8px 12px;
    color: #fff;
    border-radius: 4px;
    margin-bottom: 12px;
  }
</style>
