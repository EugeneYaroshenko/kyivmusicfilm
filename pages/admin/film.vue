<template>
  <section class="film-container">
    <film />
  </section>
</template>

<script>
  import film from '~/modules/admin/containers/film'

  export default {
    components: {
      film
    }
  }
</script>

<style lang="scss" scoped>
  .film-container {
    position: relative;
  }
</style>
