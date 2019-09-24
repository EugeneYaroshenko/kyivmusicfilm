<template>
  <div>
    <edit-popup
      v-if="fetchedFilmRequest"
      :error="filmRequestInformation.error"
      :film-url="filmURL"
      :reset="resetRequest"
    />
    <section class="edit-blocks">
      <no-ssr>
        <film-form-container
          :film="film"
          :save-film="saveFilm"
        />
        <film-calendar-container :film="film"/>
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
    data () {
      return {
        calendarSectionExpanded: false,
      }
    },
    components: {
      editPopup,
      filmFormContainer,
      filmCalendarContainer
    },
    computed: {
      ...mapState({
                    film: state => state.newFilm.film,
                    filmRequestInformation: state => state.newFilm.request
      }),
      fetchedFilmRequest () {
        return this.filmRequestInformation.fetched
      },
      filmURL () {
        return `/showings/${this.film.general.url}`
      }
    },
    methods: {
      toggleCalendarSection () {
        this.calendarSectionExpanded = !this.calendarSectionExpanded
      },
      resetRequest () {
        this.$store.dispatch('newFilm/resetRequest')
      },
      saveFilm () {
        this.$store.dispatch('newFilm/saveFilm')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-blocks {
    max-width: 800px;
    margin: 0px auto 0;
    padding: 0 16px 40px;

    /deep/ .edit-block {
      max-width: 800px;
      margin: 0px auto 24px;
    }
  }

  .action-button {
    background-color: forestgreen;
    padding: 16px 12px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: .5px;
    cursor: pointer;
    display: block;

    &[disabled] {
      opacity: .4;
      pointer-events: none;
    }
  }
</style>
