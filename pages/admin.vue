<template>
  <section class="admin-container">
    <nuxt-child />
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    created () {
      if (!this.loggedIn) {
        this.$router.push('/login')
      } else {
        this.$store.dispatch('data/getData')
      }

    },
    computed: {
      ...mapState({
                    loggedIn: state => state.auth.loggedIn
                  })
    }
  }
</script>

<style lang="scss" scoped>
  .loader {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 5px solid #000;
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation: loading 1s linear infinite;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(359deg)
    }
  }

  .admin-container {
    min-height: 100vh;
  }
</style>
