<template>
  <section class="film-container">
    <Film />
  </section>
</template>

<script>
  import Film from '~/modules/admin/containers/film'

  export default {
    components: {
      Film
    }
  }
</script>

<style lang="scss" scoped>
  .film-container {
    position: relative;
  }
</style>
