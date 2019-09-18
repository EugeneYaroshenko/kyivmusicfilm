<template>
  <section class="films-container">
    <div class="films-container__heading">
      <h2>
        Фільми
      </h2>
      <div class="add-film" @click="createFilm">Додати</div>
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
        <div
          class="film-image"
          :style="{ backgroundImage: 'url(' + film.general.image_mobile + ')' }"
        />
        <div class="film-info">
          <p class="film-heading">
            {{ film.general.name }}
          </p>
          <div class="button link-button">
            <nuxt-link
              :to="generateFilmLink(film.general.url)"
              class="link"
            >
              Переглянути на сайті
            </nuxt-link>
          </div>

          <div class="button edit-button" @click="editFilm(film)">
            Редагувати
          </div>
          <div class="button delete-button" @click="deleteFilm(film)">
            Видалити
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    fetch ({ store }) {
      return store.dispatch('films/getAll')
    },
    computed: {
      ...mapState({
                    films: state => state.films.data
      }),
    },
    methods: {
      generateFilmLink (url) {
        return `/showings/${url}`
      },
      editFilm (film) {
        this.$store.dispatch('newFilm/editFilm', film)
        this.$router.push('/admin/film')
      },
      createFilm () {
        this.$store.dispatch('newFilm/createFilm')
        this.$router.push('/admin/film')
      },
      deleteFilm (film) {
        this.$store.dispatch('films/deleteFilm', film)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .films-container {
    padding: 32px 16px;
  }

  .films-container__heading {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .add-film {
    margin-left: 8px;
    cursor: pointer;
  }

  .film-image {
    height: 300px;
  }

  .films-block {
    display: flex;
    flex-flow: row wrap;
  }

  .film {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .3);
  }

  .film-image {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .film {
    flex: 1;
    margin: 12px 24px;
    min-width: 300px;
    max-width: 300px;
  }

  .film-info {
    padding: 12px 16px 16px;
  }

  .film-heading {
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
  }

  .button {
    text-align: center;
    padding: 4px 16px;
    margin-bottom: 12px;
    cursor: pointer;
    display: block;
  }

  .link-button {
    background-color: darkblue;

    .link {
      text-decoration: none;
      color: #fff;
    }
  }

  .edit-button {
    background-color: darkorange;
    color: #fff;
  }

  .delete-button {
    background-color: darkred;
    color: #fff;
  }
</style>
