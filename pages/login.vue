<template>
  <div>
    <form @submit.prevent="requestLogin">
      <input type="text" v-model="form.username" placeholder="Admin Name">
      <input type="password" v-model="form.password" placeholder="Admin Password">
      <input type="submit">
    </form>
  </div>
</template>

<script>
  export default {
    auth: false,
    data () {
      return {
        form: {
          username: null,
          password: null
        }
      }
    },
    // created () {
    //   if (this.$auth.$state.loggedIn) {
    //     this.$router.replace({ name: 'index' })
    //   }
    // },
    methods: {
      async requestLogin () {
        console.log('here')
        try {
          await this.$auth.loginWith('local', {
            data: {
              username: this.form.username,
              password: this.form.password
            }
          })

          this.$router.push('/admin/film')
        } catch (e) {
          console.log('heeere')
        }
      }
    }
  }
</script>
