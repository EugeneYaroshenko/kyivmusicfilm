<template>
  <section class="films-container">
    <delete-popup
      v-if="popupShown"
      :cancel="hideDeletePopup"
      :delete-film="deleteFilm"
      :film-to-delete="filmToDelete"
    />
    <div class="navigation">
      <div
        class="plus-icon"
        @click="createFilm"
      />
    </div>
    <div
      class="films-block"
      v-if="films"
    >
      <div
        v-for="(film, index) in films"
        :key="index"
        class="film"
      >
        <div>
          <div class="film-info">
            <h2 class="film-heading">
              {{ film.description.name }}
            </h2>

            <div class="controls">
              <div class="button link-button">
                <nuxt-link
                  :to="generateFilmLink(film.description.url)"
                  class="link"
                >
                  Переглянути на сайті
                </nuxt-link>
              </div>

              <div
                class="button edit-button"
                @click="editFilm(film)"
              >
                Редагувати
              </div>
              <div
                class="button delete-button"
                @click="showDeletePopup(film)"
              >
                Видалити
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
  import DeletePopup from '~/modules/admin/components/deletePopup'

  export default {
    data () {
      return {
        popupShown: false,
        filmToDelete: null
      }
    },
    computed: {
      ...mapState({
                    films: state => state.films.data
                  })
    },
    components: {
      DeletePopup
    },
    methods: {
      generateFilmLink (url) {
        return `/showings/${url}`
      },
      editFilm (film) {
        this.$store.dispatch('editFilm/edit', film)
        this.$router.push('/admin/film')
      },
      createFilm () {
        this.$store.dispatch('editFilm/create')
        this.$router.push('/admin/film')
      },
      deleteFilm () {
        this.$store.dispatch('films/deleteFilm', this.filmToDelete)
        this.hideDeletePopup()
      },
      showDeletePopup (film) {
        this.filmToDelete = film
        this.popupShown = true
      },
      hideDeletePopup () {
        this.popupShown = false
        this.filmToDelete = null
      },
    }
  }
</script>

<style lang="scss" scoped>
  .films-container {
    padding: 32px 16px;
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .films-container__heading {
    padding: 64px 40px 40px 64px;
    display: flex;
    max-width: 1200px;
  }

  .add-film {
    margin-left: 8px;
    cursor: pointer;
  }

  .films-block {
    padding: 0 20px;
  }

  .film {
    flex: 1;
    margin: 12px 24px;
  }

  .film-info {
    padding: 12px 16px 16px;
  }

  .controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .button {
    text-align: center;
    margin-right: 16px;
    cursor: pointer;
    font-size: 1.1em;
    display: block;
    font-weight: 300;
    opacity: .7;

    a {
      text-decoration: none;
      color: #000;
    }

    &:hover {
      opacity: 1;
    }
  }

  .film-heading {
    margin-bottom: 12px;
  }

  .delete-button {
    color: #F70039;
  }

  .plus-icon {
    width: 50px;
    height: 50px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: .7;
    background-image: url('../../../assets/icons/plus-icon.svg');
  }
  .plus-icon:hover {
    opacity: 1;
  }

  .navigation {
    position: absolute;
    width: 64px;
    display: flex;
    justify-content: center;
    background: #fff;
    padding-top: 18px;
    top: 0;
    left: 0;
    z-index: 100;
    cursor: pointer;
  }

</style>
