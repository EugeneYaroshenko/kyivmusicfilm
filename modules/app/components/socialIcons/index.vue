<template>
  <div class="social-icons">
    <div class="navigation-block__icons">
      <a
        target="_blank"
        href="https://www.facebook.com/KyivMusicFilm/"
        class="icon-container"
        @click="clickSocialEvent('facebook')"
      >
        <icon
          class="icon"
          :class="{'icon-dark': color === 'dark'}"
          size="18px"
          view-box="0 0 7.496 14.993"
          icon-name="facebook"
        >
          <facebook />
        </icon>
      </a>
      <a
        target="_blank"
        href="https://www.youtube.com/channel/UCOW9MxduCFNClCOPqbQZTjg"
        class="icon-container"
        @click="clickSocialEvent('youtube')"
      >
        <icon
          class="icon"
          :class="{'icon-dark': color === 'dark'}"
          size="18px"
          view-box="0 0 21.807 14.993"
          icon-name="youtube"
        >
          <youtube />
        </icon>
      </a>
      <a
        target="_blank"
        href="https://www.instagram.com/kyivmusicfilm/"
        class="icon-container"
        @click="clickSocialEvent('instagram')"
      >
        <icon
          class="icon"
          :class="{'icon-dark': color === 'dark'}"
          size="18px"
          view-box="0 0 15.025 15.025"
          icon-name="instagram"
        >
          <instagram />
        </icon>
      </a>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import Facebook from '~/assets/icons/vueIcons/facebook'
  import Youtube from '~/assets/icons/vueIcons/youtube'
  import Instagram from '~/assets/icons/vueIcons/instagram'

  export default {
    props: {
      color: {
        type: String,
        required: false,
        default: 'light'
      },
      clickSocialEvent: {
        type: Function,
        required: false,
        default: () => []
      }
    },
    components: {
      Icon,
      Facebook,
      Youtube,
      Instagram
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../styles/partials/variables';

  .social-icons {
    width: 100%;
  }
  .navigation-block__icons {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .icon-container:hover {
    .icon {
      fill: $blue;
    }
  }

  .icon {
    margin: 12px;
    cursor: pointer;
    transition: all 350ms ease-in-out;
    fill: $white;
  }

  .icon-dark {
    fill: $black;
  }
</style>
