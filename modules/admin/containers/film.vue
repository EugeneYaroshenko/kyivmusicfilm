<template>
  <div v-if="dataFetched">
    <edit-popup
      v-if="fetchedFilmRequest"
      :error="filmRequestInformation.error"
      :film-url="filmURL"
      :reset="resetRequest"
    />
    <div class="navigation">
      <nuxt-link to="/admin/films" class="icon exit-icon" />
    </div>
    <section class="edit-blocks">
      <no-ssr>
        <film-form-container
          :save-film="saveFilm"
        />
        <film-calendar-container />
      </no-ssr>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import editPopup from '~/modules/admin/components/editPopup'
  import filmFormContainer from '~/modules/admin/containers/filmForm'
  import filmCalendarContainer from '~/modules/admin/containers/filmCalendar'

  export default {
    components: {
      editPopup,
      filmFormContainer,
      filmCalendarContainer
    },
    created () {
      this.$store.dispatch('data/getData')
    },
    computed: {
      ...mapState({
                    filmRequestInformation: state => state.editFilm.request,
                    dataFetched: state => state.data.request.fetched,
                    film: state => state.editFilm.film
      }),
      fetchedFilmRequest () {
        return this.filmRequestInformation.fetched
      },
      filmURL () {
        return `/showings/${this.film.description.url}`
      }
    },
    methods: {
      toggleCalendarSection () {
        this.calendarSectionExpanded = !this.calendarSectionExpanded
      },
      resetRequest () {
        this.$store.dispatch('editFilm/resetRequest')
      },
      saveFilm () {
        this.$store.dispatch('editFilm/saveFilm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-blocks {
    padding: 64px 40px 40px 20px;
    margin: 0px auto 0;
    display: flex;
    max-width: 1200px;

    /deep/ .edit-block {
      max-width: 800px;
      padding: 8px 12px 36px;
    }

    /deep/ .content-heading {
      position: relative;
      box-shadow: 0px 0px 4px 0 rgba(0, 0, 0, .1);
      padding: 24px 18px 24px 24px;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 32px;
    }
  }

  .navigation {
    position: fixed;
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    background: #fff;
    padding-top: 18px;
    top: 0;
    right: 0;
    z-index: 100;
    cursor: pointer;
  }

  .icon {
    min-width: 32px;
    height: 32px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: .7;

    &:hover {
      opacity: 1;
    }
  }

  .exit-icon {
    background-image: url('../../../assets/icons/exit-icon.svg');
  }
</style>
