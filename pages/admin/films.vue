<template>
  <section class="admin-container">
    <div>All</div>
  </section>
</template>

<script>
  export default {
    fetch ({ store }) {
      return store.dispatch('films/getAll')
    }
  }
</script>

<style lang="scss" scoped>
</style>
