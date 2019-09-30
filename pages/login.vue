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
        },
        locations: [
          { label: 'really very long name for the sake of all people', value: '32' }, { label: 'name', value: '40' },
          { label: 'name', value: '32' }, { label: 'name', value: '40' },
          { label: 'name', value: '32' }, { label: 'name', value: '40' }
        ]
      }
    },
    // created () {
    //   if (this.$auth.$state.loggedIn) {
    //     this.$router.replace({ name: 'index' })
    //   }
    // },
    components: {
      VueSelect,
      VueOption
    },
    methods: {
      changeLocation () {
        console.log('change Location')
      },
      async requestLogin () {
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
