<template>
  <nav
    class="main-menu"
    :class="{'main-menu--shown': isMenuShown}"
  >
    <div
      class="main-menu__navigation"
      :class="{'main-menu__navigation--collapsed': !isMenuShown, 'main-menu__navigation--left': mapShown}"
      @click="toggleMainMenu"
    >
      <icon
        view-box="0 0 290 290"
        size="24"
        icon-name="menu"
      >
        <menu-icon />
      </icon>
    </div>
    <div class="main-menu__content">
      <div class="logo" />
      <div class="navigation-links">
        <h3><a target="_blank" href="https://www.facebook.com/KyivMusicFilm/">Facebook</a></h3>
        <h3><a target="_blank" href="https://www.instagram.com/kyivmusicfilm/">Instagram</a></h3>
        <h3><a target="_blank" href="https://www.youtube.com/channel/UCOW9MxduCFNClCOPqbQZTjg">Youtube</a></h3>
      </div>
    </div>
  </nav>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import MenuIcon from '~/assets/icons/vueIcons/menuIcon'

  export default {
    props: {
      mapShown: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    components: {
      Icon,
      MenuIcon
    },
    data () {
      return {
        isMenuShown: false
      }
    },
    methods: {
      toggleMainMenu () {
        this.isMenuShown = !this.isMenuShown
      }
    }
  }
</script>

<style lang="scss" scoped>
  .main-menu {
    position: fixed;
    left: 0;
    top: 0;
    background-color: #fff;
    height: 100%;
    width: 100%;
    z-index: 1000;
    transform: translateY(-100%);
    transition: all 250ms ease-in-out;
  }

  .main-menu--shown {
    transform: translateY(0);
  }

  .main-menu__content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 32px 40px;
    height: 100%;
  }

  .navigation-links {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;

    a {
      text-decoration: none;
      color: #000;
    }
  }

  .main-menu__navigation {
    opacity: .8;
    cursor: pointer;
    padding: 8px;
    position: absolute;
    right: 2px;
    top: 10px;

    &:hover {
      opacity: 1;
    }
  }

  .main-menu__navigation--left {
    right: auto;
    left: 2px;
  }

  .logo {
    background-size: contain;
    background-position: center;
    background-image: url('../../../../assets/icons/logo.svg');
    height: 100px;
    width: 100px;
    margin-bottom: 40px;
  }

  .main-menu__navigation--collapsed {
    top: auto;
    bottom: -54px;
  }

  @media screen and (min-width: 1500px) {
    .main-menu__navigation {
      fill: #fff;
    }
  }
</style>
