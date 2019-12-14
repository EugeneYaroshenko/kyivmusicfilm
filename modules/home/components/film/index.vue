<template>
  <nuxt-link
    :to="film.description.url"
    class="film-item"
  >
    <!--<div-->
      <!--class="sales-now"-->
    <!--&gt;-->
      <!--Квитки у продажу-->
    <!--</div>-->
    <div
      class="film-preview"
      :style="{ backgroundImage: 'url(' + film.description.image_desktop + ')' }"
    >
      <div class="film-trailer" />
    </div>
    <div class="film-info">
      <div class="film-info__name">
        {{ film.description.name }}
      </div>
      <div class="film-info__description">
        {{ film.description.genre }}
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    data () {
      return {
        onSale: false
      }
    },
    props: {
      film: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    mounted () {
      console.log(this.film)
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../styles/partials/variables';

  .film-item {
    position: relative;
    max-width: 320px;
    min-width: 320px;
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    line-height: normal;
    color: $black;
  }

  .sales-now {
    background: #235FF5;
    padding: 8px 10px;
    font-size: .9em;
    font-weight: 800;
    color: #ffffff;
    position: absolute;
    top: -12px;
    right: -12px;
    box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.02),
      0 6.7px 5.3px rgba(0, 0, 0, 0.028),
      0 12.5px 10px rgba(0, 0, 0, 0.035),
      0 22.3px 17.9px rgba(0, 0, 0, 0.042),
      0 41.8px 33.4px rgba(0, 0, 0, 0.05),
      0 100px 80px rgba(0, 0, 0, 0.07)
  ;
  }

  .film-preview {
    width: 100%;
    height: 400px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .film-info {
    padding: 12px 4px 12px 0;
  }

  .film-info__name {
    font-family: $headline-font;
    font-size: 1.1em;
    font-weight: 600;
    text-transform: uppercase;
  }

  .film-info__description {
    font-weight: 300;
    margin-top: 8px;
  }
</style>
