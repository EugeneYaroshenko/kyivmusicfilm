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
      <span class="navigation-text">Меню</span>
    </div>
    <div class="main-menu__content">
      <nuxt-link to="/home" class="main-link">Головна</nuxt-link>
      <div class="logo" />
      <h2 class="content__headline">KyivMusicFilm</h2>
      <div class="content-columns">
        <div class="column">
          <p>Колись нам здалося несправедливим, що наші
          улюблені музиканти оминають Україну з
          концертами. Так з’явився KyivMusicFilm. Ми
          розпочали з показів концертів, які хотіли побачити
          самі й знайшли тисячі однодумців, які розділили
          нашу музичну пристрасть.</p>
          <p>Трохи згодом ми набралися сил та ентузіазму, щоб
          крокувати нога в ногу з динамічним світом кіно й
          почали показувати фільми (а іноді й влаштовували
          цілі фестивалі) про мистецтво та сучасну культуру.
          KyivMusicFilm змінювався, запалювався новими
          ідеями та відкривав для себе все нові та нові
          напрямки.</p>
          <p>Сьогодні ми представляємо в багатьох містах
          України фільми, концерти, театральні постановки,
          аніме та ретро-фільми у кіно та відкриваємо свої та
          твої горизонти.</p>
        </div>
        <div class="column">
          <div class="ml-form-embed"
               data-account="752884:e1j5i5f8m2"
               data-form="1556234:d0l4b6">
          </div>
        </div>
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
        required: false,
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
  @import '../../../../styles/partials/variables';

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

    .main-menu__content {
      opacity: 1;
      visibility: visible;
    }
  }

  .main-menu__content {
    margin-top: 100px;
    padding: 0px 40px;
    height: 100%;
    opacity: 0;
    visibility: hidden;
    position: relative;
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

  .content-columns {
    display: flex;
    margin-top: 54px;
    justify-content: center;
  }

  .column {
    max-width: 35%;
    padding: 0 12px;
    overflow-y: scroll;
  }

  .content__headline {
    text-align: center;
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
    margin: 0 auto 40px;
  }

  .main-menu__navigation--collapsed {
    top: auto;
    bottom: -54px;
  }

  .navigation-text {
    font-size: .8em;
    font-weight: 600;
  }

  .main-link {
    position: absolute;
    left: 32px;
    top: 18px;
    text-decoration: none;
    color: $blue;
  }

  @media screen and (min-width: 1500px) {
    .main-menu__navigation {
      fill: #fff;
    }
  }
</style>
