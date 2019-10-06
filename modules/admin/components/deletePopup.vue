<template>
  <div class="popup-delete">
    <div class="text">Видалити {{ filmToDelete.description.name }}?</div>
    <div class="buttons">
      <div class="button cancel" @click="cancel">Скасувати</div>
      <div class="button delete" @click="deleteFilm">Видалити</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      deleteFilm: {
        type: Function,
        required: true,
        default: null
      },
      cancel: {
        type: Function,
        required: true,
        default: null
      },
      filmToDelete: {
        type: Object,
        required: true,
        default: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .popup-delete {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column wrap;
    padding: 24px;
  }

  .text {
    width: 100%;
    text-align: center;
    font-size: 1.3em;
    color: #fff;
    margin-bottom: 24px;
  }

  .button {
    background-color: #fff;
    border-radius: 4px;
    margin: 0 12px;
    padding: 12px 16px;
    text-align: center;
    cursor: pointer;
  }

  .delete {
    background-color: indianred;
    color: #fff;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
