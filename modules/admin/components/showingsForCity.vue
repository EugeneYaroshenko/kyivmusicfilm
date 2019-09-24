<template>
  <div class="showing-section">
    <div class="input-item">
      <div>{{ city }}</div>
    </div>
    <div class="calendar-block">
      <calendar-for-date
        :add-showing-date="addShowingDate"
        :edit-showing-date="editShowingDate"
        :calendar-events="events"
        :selected-date="selectedDate"
      />
      <cinemas-for-date
        :selected-date="dateInMillisecondsToUserFriendlyDate(selectedDate)"
        :cinemas-for-selected-date="filmCinemas"
        :all-cinemas="allCinemas"
        :save-changes="saveChanges"
        :cancel-changes="cancelChanges"
      />
    </div>
  </div>
</template>

<script>
  import CinemasForDate from '~/modules/admin/components/cinemasForDate'
  import CalendarForDate from '~/modules/admin/components/calendarForDate'

  export default {
    props: {
      location: {
      location: {
        type: String,
        required: true
      },
      addDate: {
        type: Function,
        required: true
      },
      editDate: {
        type: Function,
        required: true
      },
      deleteDate: {
        type: Function,
        required: true
      },
      filmCinemas: {
        type: Array,
        required: false,
        default: null
      },
      events: {
        type: Array,
        required: false,
        default: null
      },
      allCinemas: {
        type: Array,
        required: false,
        default: null
      },
      saveEdit: {
        type: Function,
        required: true
      },
      selectedDate: {
        type: String,
        required: false,
        default: null
      }
    },
    components: {
      CalendarForDate,
      CinemasForDate
    },
    methods: {
      addShowingDate (date) {
        return this.addDate({ date, location: this.location })
      },
      editShowingDate (date) {
        return this.editDate({ date, location: this.location })
      },
      deleteShowingDate () {
        return this.deleteDate({ date: this.selectedDate, location: this.location })
      },
      saveChanges (updatedCinemas) {
        return this.saveEdit({ location: this.location, date: this.selectedDate, cinemas: updatedCinemas })
      },
      cancelChanges () {
        if (!this.filmCinemas) {
          this.deleteShowingDate()
        }
      },
      dateInMillisecondsToUserFriendlyDate (date) {
        return date ? this.$moment(date).format('DD MMMM') : ''
      }
    },
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
