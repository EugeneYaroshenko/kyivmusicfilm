<template>
  <div class="popup-edit">
    <div
      class="popup-edit__block error"
      v-if="error"
    >
      <h2>На жаль, фільм не був збережений</h2>
      <div class="go-to">
        Спробувати знову
      </div>
    </div>
    <div
      class="popup-edit__block success"
      v-else
    >
      <h2>Фільм успішно збережений</h2>
      <nuxt-link
        class="go-to"
        :to="filmUrl"
      >
        Переглянути сторінку
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      error: {
        type: String,
        required: false,
        default: null
      },
      filmUrl: {
        type: String,
        required: true,
        default: null
      },
      reset: {
        type: Function,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-container {
    position: relative;
  }

  .popup-edit {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
  }

  .success {
    background: green;
  }

  .error {
    background: darkred;
  }

</style>
