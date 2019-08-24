<template>
  <nav class="navigation">
    <div class="navigation-block">
      <div class="navigation-block__logo-container">
        <div class="navigation-block__logo" v-if="!isLoaderShown" />
      </div>
      <div class="navigation-block__icons">
        <a target="_blank" href="https://www.facebook.com/KyivMusicFilm/">
          <icon
            class="icon"
            size="16px"
            viewBox="0 0 7.496 14.993"
            icon-name="facebook"
          >
            <facebook/>
          </icon>
        </a>
        <!--<icon-->
          <!--class="icon"-->
          <!--size="16px"-->
          <!--viewBox="0 0 14.992 14.993"-->
          <!--icon-name="messenger"-->
        <!--&gt;-->
          <!--<messenger/>-->
        <!--</icon>-->
        <a target="_blank" href="https://www.youtube.com/channel/UCOW9MxduCFNClCOPqbQZTjg">
          <icon
            class="icon"
            size="16px"
            viewBox="0 0 21.807 14.993"
            icon-name="youtube"
          >
            <youtube />
          </icon>
        </a>
        <a target="_blank" href="https://www.instagram.com/kyivmusicfilm/">
          <icon
            class="icon"
            size="16px"
            viewBox="0 0 15.025 15.025"
            icon-name="instagram"
          >
            <instagram />
          </icon>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  import Icon from '~/components/icon'
  import Facebook from '~/assets/icons/vueIcons/facebook'
  import Messenger from '~/assets/icons/vueIcons/messenger'
  import Youtube from '~/assets/icons/vueIcons/youtube'
  import Instagram from '~/assets/icons/vueIcons/instagram'
  import { mapState } from 'vuex'

  export default {
    components: {
      Icon,
      Facebook,
      Messenger,
      Youtube,
      Instagram
    },
    computed: {
      ...mapState({
                    isLoaderShown: state => state.ui.loading
                  })
    }
  }
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    z-index: 10000;
  }

  .navigation-block {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    flex: 1;
    padding: 0 32px;
  }

  .navigation-block__logo-container {
    padding: 12px;
  }

  .navigation-block__logo {
    background-size: contain;
    background-position: center;
    background-image: url('../../assets/icons/logo.svg');
    height: 54px;
    width: 54px;
  }

  .navigation-block__icons {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .icon {
    margin: 12px;
    cursor: pointer;
  }

  @media screen and (min-width: 960px) {
    nav {
      position: absolute;
      bottom: 0;
      height: 100%;
      width: auto;
      flex-flow: column nowrap;
      align-items: center;
    }

    .navigation-block {
      flex-flow: column nowrap;
      justify-content: flex-start;
      padding: 0;
    }

    .navigation-block__icons {
      flex-flow: column nowrap;
      flex: 1;
    }
  }
</style>
