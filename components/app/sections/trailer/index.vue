<template>
  <div class="trailer-popup__container">
    <div class="trailer-container">
      <iframe
        class="trailer"
        :src="trailerLink"
        allowFullScreen
        frameBorder="0"
      />
      <div
        class="icon-container"
        @click="hideTrailer"
      >
        <icon
          view-box="0 0 11.899 11.899"
          icon-name="close"
          class="close-icon"
          fill="#333"
          size="18"
        >
          <close />
        </icon>
      </div>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import Close from '~/assets/icons/vueIcons/close'
  import { mapState } from 'vuex'

  export default {
    components: {
      Icon,
      Close
    },
    methods: {
      hideTrailer () {
        return this.$store.dispatch('ui/hideTrailer')
      }
    },
    computed: {
      ...mapState({
                    trailer: state => state.film.general.trailer
      }),
      trailerLink () {
        return `${this.trailer}?autoplay=1`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .trailer-popup__container {
    position: absolute;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    border: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .trailer-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .trailer {
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
    border-radius: 24px;
    background: #000;
    max-width: 1500px;
  }

  .icon-container {
    padding: 16px 0 16px 8px;
    cursor: pointer;
    position: absolute;
    top: 0;
    height: 100%;
    right: -32px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  @media screen and (min-width: 960px) {
    .trailer-popup__container {
      position: fixed;
      height: 100vh;
      width: 100vw;
      border: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(0, 0, 0, .5);
    }

    .trailer-container {
      position: relative;
      width: 62.5%;
      height: 80%;
    }

    .trailer {
      width: 100%;
      height: 100%;
      box-shadow: 3px 0 12px 0 rgba(0, 0, 0, .3);
      border-radius: 0;
    }
  }
</style>
