<template>
  <div class="film-information__container">
    <div class="preview-web">
      <preview-trailer />
    </div>
    <div :class="{'information': true, 'information--collapsed': isMapShown }">
      <h4 class="information-heading--mobile">
        Про Фільм
      </h4>
      <div class="information-description">
        <p class="information-description__text">
          {{ filmDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import PreviewTrailer from '~/components/app/elements/previewTrailer'
  import { mapState } from 'vuex'

  export default {
    components: {
      PreviewTrailer
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

  .information {
    width: 70%;
    margin: 0 auto;
  }

  .information-heading--mobile {
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: .5px;
    text-align: center;
    margin-bottom: 24px;
  }

  .preview-web {
    display: none;
  }

  @media screen and (min-width: 960px) {
    .information-heading--mobile {
      display: none;
    }

    .preview-web {
      display: block;
    }

    .information {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      flex-flow: row nowrap;
      width: 33.3%;
      height: auto;
      min-height: 150px;
      max-height: 300px;
      overflow: hidden;
      margin: auto;
    }

    .information-description {
      flex: 1;
      margin-top: 24px;
      background: #57575e;
      padding: 24px 18px 8px;
      color: #fff;
    }

    .information-description__items {
      list-style: none;
      margin: 0 0 12px;
      font-size: 12px;
      padding: 0;
    }

    .information-description__item {
      display: flex;

      .label {
        font-weight: 600;
        margin-right: 4px;
      }
    }

    .information-description__text {
      font-size: 12px;
      margin: 12px 0;
    }

    .information--collapsed {
      .information-trailer {
        max-height: 0;
        overflow: hidden;
        padding: 0;
      }

      .information-description {
        max-height: 0;
        overflow: hidden;
        padding: 0;
      }
    }
  }
</style>
