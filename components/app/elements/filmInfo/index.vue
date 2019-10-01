<template>
  <div class="film-information__container">
    <div class="preview-web">
      <preview-trailer />
    </div>
    <description
      :is-popup-hidden="isMapShown"
      :film-description="filmDescription"
    />
  </div>
</template>

<script>
  import PreviewTrailer from '~/components/app/elements/previewTrailer'
  import Description from '~/modules/app/components/description'
  import { mapState } from 'vuex'

  export default {
    components: {
      PreviewTrailer,
      Description
    },
    computed: {
      ...mapState({
                    isMapShown: state => state.ui.mapShown,
                    filmDescription: state => state.film.description.description_full
                  })
    }
  }
</script>

<style lang="scss" scoped>
  .film-information__container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
