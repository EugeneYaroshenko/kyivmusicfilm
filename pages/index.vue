<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
  export default {
    async asyncData ({ route, redirect }) {
      const url = route.path.replace('/', '')

      if (!url.length) {
        redirect('/home')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
