<template>
  <section
    class="home-container"
    :class="{'home-container--loading': !filmsFetched}"
  >
    <loader
      v-if="loaderShown"
      :fetched="filmsFetched"
    />
    <div class="nav-top">
      <social-icons color="dark" />
    </div>
    <div class="nav-bottom">
      <social-icons color="dark" />
    </div>
    <div class="navigation-list">
      <div
        class="navigation-item selected-item"
        v-scroll-to="'#showings'"
      >
        Сеанси
      </div>
      <div
        class="navigation-item"
        v-scroll-to="'#about'"
      >
        Про нас
      </div>
    </div>
    <div class="main">
      <div class="main-content">
        <div
          class="films"
          id="showings"
          v-if="films"
        >
          <div class="films-block">
              <ul
                class="films-list"
                v-if="actualFilms && actualFilms.length"
              >
                <li
                  class="film"
                  v-for="(film, index) in actualFilms"
                  :key="index"
                  @click="redirectTo(film.description.url)"
                >
                  <div class="film-name">
                    {{ film.description.name }}
                  </div>
                  <div class="film-showings">
                    <div class="film-link">
                      Придбати квиток
                    </div>
                  </div>
                </li>
              </ul>
              <div
                class="films-list"
                v-else
              >
                Немає фільмів у прокаті
              </div>
          </div>

        </div>
        <div
          class="description"
          id="about"
        >
          <h2 class="main-title">
            KyivMusicFilm
          </h2>
          <div class="description-text">
            <p>
              Колись нам здалося несправедливим, що наші
              улюблені музиканти оминають Україну з
              концертами. Так з’явився KyivMusicFilm. Ми
              розпочали з показів концертів, які хотіли побачити
              самі й знайшли тисячі однодумців, які розділили
              нашу музичну пристрасть.
            </p>
            <p>
              Трохи згодом ми набралися сил та ентузіазму, щоб
              крокувати нога в ногу з динамічним світом кіно й
              почали показувати фільми (а іноді й влаштовували
              цілі фестивалі) про мистецтво та сучасну культуру.
              KyivMusicFilm змінювався, запалювався новими
              ідеями та відкривав для себе все нові та нові
              напрямки.
            </p>
            <p>
              Сьогодні ми представляємо в багатьох містах
              України фільми, концерти, театральні постановки,
              аніме та ретро-фільми у кіно та відкриваємо свої та
              твої горизонти.
            </p>
          </div>
          <div class="description-subscription">
            <mailer-lite />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Loader from '~/modules/common/components/loader'
  import SocialIcons from '~/modules/app/components/socialIcons'
  import MailerLite from '~/modules/app/components/mailerLite'
  import uniq from 'lodash/uniq'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        actualShowingsDisplayed: true,
        loaderShown: false
      }
    },
    created () {
      if (!this.filmsFetched) {
        this.loaderShown = true
        this.$store.dispatch('films/getAll')
      }
    },
    computed: {
      ...mapState({
                    films: state => state.films.data,
                    filmsFetched: state => state.films.request.fetched,
                    filmsLoading: state => state.films.request.loading
                  }),
      actualFilms () {
        let films = []
        this.films.forEach(film => {
          let allFilmDates = []
          Object.values(film.showings.dates).forEach(cityDates => {
            allFilmDates = uniq([...allFilmDates, ...cityDates])
          })

          if (allFilmDates.some(date => date >= new Date().setHours(0, 0, 0, 0))) {
            films = [...films, ...[film]]
          }
        })

        return films
      }
    },
    components: {
      Loader,
      SocialIcons,
      MailerLite
    },
    methods: {
      showActualShowings () {
        this.actualShowingsDisplayed = true
      },
      showFutureShowings () {
        this.actualShowingsDisplayed = false
      },
      redirectTo (url) {
        this.$router.push('/' + url)
      }
    }
  }
</script>

<style lang="scss">
  @import '../styles/partials/variables';

  .home-container {
    width: 100%;
    min-height: 100vh;
    position: relative;
    color: $black;
  }

  .home-container--loading {
    overflow: hidden;
    height: 100vh;
  }

  .nav-top {
    position: absolute;
    top: 12px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 100px;
    z-index: 1000;
  }

  .nav-bottom {
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    margin: 0 auto;
    max-width: 100px;
    z-index: 1000;
  }

  .main {
    margin: 0px auto 0;
    padding-top: 80px;

    .title {
      text-align: center;
    }

    .main-image {
      background-size: contain;
      background-image: url('../assets/images/kyivmusicfilm.jpg');
      width: 100vw;
      height: 120vh;
      background-position: center 20%;
      background-repeat: no-repeat;
    }
  }

  .navigation-list {
    color: $black;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 80px;
    left: 0;
    right: 0;
    width: 100%;
    font-weight: 600;
    font-size: 1.4em;
    letter-spacing: .3px;
    font-family: $headline-font;

    .navigation-item {
      padding: 0 16px;
      margin: 0 8px;
      cursor: pointer;
      transition: all 350ms ease-in-out;

      &:hover {
        color: $blue;
      }
    }

    .selected-item {
      color: $blue;
    }
  }

  .main-title {
    text-align: center;
    margin-bottom: 64px;
  }

  .main-content {
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    padding-bottom: 64px;
  }

  .films {
    padding: 20px 12px;
    width: 100%;
    min-height: 400px;
    max-width: 1200px;
    margin: 32px auto 0;

    .films-navigation {
      max-width: 100%;
      display: flex;
    }

    .nav-item {
      font-weight: bold;
      flex: 1;
      padding: 0 18px 4px 0;
      margin-bottom: 24px;
      font-size: 1.4em;
      line-height: 37px;
      text-align: left;
      color: $black;
      opacity: .6;
      cursor: pointer;
      border-bottom: 4px solid transparent;

      &:hover {
        opacity: .8;
      }

      &.selected {
        opacity: 1;
        cursor: default;
        border-bottom: 4px solid $blue;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .films-list {
    list-style: none;
    margin-top: 12px;
    padding: 0;
    flex: 1;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;

    .film {
      flex: 1;
      width: 100%;
      padding: 0px 12px 24px;
      cursor: pointer;
    }

    .film-name {
      font-size: 1.2em;
      font-weight: 600;
      font-family: $headline-font;
      letter-spacing: .2px;
      line-height: 1.6;
      padding-bottom: 8px;
      position: relative;
      text-align: center;
      overflow: hidden;
    }

    .film-content {
      display: block;
      height: 100%;
      width: 100%;
      text-decoration: none;
      color: inherit;
    }

    .name-underline {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 4px;
      background-color: $black;
      border-radius: 0 24px 24px 0;
      transform: translate3d(-100%, 0, 0);
      transition: all 400ms ease-in-out;
    }

    .film-showings {
      padding-top: 8px;

      .film-link {
        text-decoration: none;
        color: $blue;
        width: 180px;
        padding: 4px 8px;
        margin: 0 auto;
        font-size: 1em;
        border: 1px solid $blue;
        letter-spacing: .2px;
        transition: all 350ms ease-in-out;
        text-align: center;

        &:hover {
          color: $white;
          background-color: $blue;
        }
      }
    }
  }

  .description {
    padding: 32px 16px;
    max-width: 1200px;
    margin: 0 auto;

    .description-text {
      max-width: 700px;
      font-size: 1.4em;
      line-height: 1.9;
      margin: 0 auto;
    }

    .description-subscription {
      margin: 100px auto 0;
      max-width: 400px;
    }

    #mlb2-1556234.ml-form-embedContainer .ml-form-embedWrapper.embedForm {
      max-width: 100%;
      padding: 16px 12px;
      border: 2px solid $blue;
    }
  }

  .fade-enter-active {
    animation: fadeInUp 300ms ease-out;
  }

  .fade-leave-active {
    animation: fadeOutDown 350ms ease-in;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  .loader-small {
    display: block;
  }

  .loader-big {
    display: none;
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      transform: translate3d(0, 20%, 0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 20%, 0);
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @media screen and (min-width: 1000px) {
    .main {
      margin: 0px auto 0;
      padding-top: 80px;

      .main-image {
        width: 100vw;
        height: 180vh;
        margin: 0 auto;
        max-width: 1500px;
        background-position: center;
      }
    }

    .description {
      padding: 40px;
    }

    .films {
      flex-flow: row nowrap;

      .films-navigation {
        flex: 1;
        max-width: 20%;
        padding-right: 32px;
        flex-flow: column nowrap;
      }

      .nav-item {
        padding: 0 18px 4px 0;
        margin-bottom: 24px;
        flex: 0;
      }
    }

    .films-list {
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
      width: 100%;

      .film {
        width: 100%;
        text-align: center;
        padding: 0px 64px 24px 12px;
      }
    }


    .films-block {
      display: flex;
    }
  }
</style>
