<template>
  <div class="showing-section">
    <div class="input-item">
      <div>{{ city }}</div>
    </div>
    <div class="calendar-block">
      <admin-calendar
        :add-showing-date="addShowingDate"
        :edit-showing-date="editShowingDate"
        :calendar-events="calendarEvents"
        :selected-date="selectedDateForCity"
      />
      <cinema-selection
        :selected-date="dateInMillisecondsToUserFriendlyDate(selectedDateForCity)"
        :cinemas-for-selected-date="showingCinemasForDateAndCity"
        :all-cinemas="allCinemas"
        :save-changes="saveChanges"
        :cancel-changes="cancelChanges"
      />
    </div>
  </div>
</template>

<script>
  import AdminCalendar from '~/components/admin/elements/calendar'
  import CinemaSelection from '~/components/admin/elements/cinemaSelection'

  export default {
    props: {
      city: {
        type: String,
        required: true
      }
    },
    components: {
      AdminCalendar,
      CinemaSelection
    },
    methods: {
      addShowingDate (date) {
        this.$store.dispatch('newFilm/addShowingDate', { date, city: this.city })
        return this.$store.dispatch('adminInterface/selectDate', { date, city: this.city })
      },
      editShowingDate (date) {
        return this.$store.dispatch('adminInterface/selectDate', { date, city: this.city })
      },
      deleteShowingDate () {
        return this.$store.dispatch('newFilm/removeShowingDate', { date: this.selectedDateForCity, city: this.city })
      },
      saveChanges (updatedCinemas) {
        this.$store.dispatch(
          'newFilm/updateShowingDate',
          { city: this.city, date: this.selectedDateForCity, cinemas: updatedCinemas })
        this.removeUISelectedDate()
      },
      cancelChanges () {
        if (!this.showingCinemasForDateAndCity) {
          this.deleteShowingDate()
        }

        this.removeUISelectedDate()
      },
      dateInMillisecondsToUserFriendlyDate (date) {
        return date ? this.$moment(date).format('DD MMMM') : ''
      },
      removeUISelectedDate () {
        return this.$store.dispatch(
          'adminInterface/removeSelectedDate', { city: this.city }
        )
      }
    },
    computed: {
      calendarEvents () {
        return this.$store.getters['newFilm/getShowingDatesByCity'](this.city)
      },
      selectedDateForCity () {
        return this.$store.getters['adminInterface/getSelectedDateForCity'](this.city)
      },
      showingCinemasForDateAndCity () {
        if (this.selectedDateForCity) {
          return this.$store.getters['newFilm/getShowingCinemasForDateAndCity']({ city: this.city, date: this.selectedDateForCity })
        } else {
          return null
        }
      },
      allCinemas () {
        return this.$store.getters['cinemas/getAllCinemasForCity'](this.city)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .showing-section {
    margin-bottom: 32px;
  }

  .admin-calendar {
    width: 50%;
  }

  .calendar-block {
    display: flex;
  }

</style>
