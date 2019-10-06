<template>
  <div class="showing-section">
    <div class="location-name">
      <div class="name">{{ uiName }}</div>
      <div
        class="remove-location remove-icon"
        @click="showRemoveLocationPopup"
      />
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
        :delete-date="deleteShowingDate"
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
        type: String,
        required: true
      },
      uiName: {
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
      cancelEdit: {
        type: Function,
        required: true
      },
      selectedDate: {
        type: Number,
        required: false,
        default: null
      },
      removeLocation: {
        type: Function,
        required: true
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

        this.cancelEdit({ location: this.location })
      },
      dateInMillisecondsToUserFriendlyDate (date) {
        return date ? this.$moment(date).format('DD MMMM') : ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .showing-section {
    margin-bottom: 32px;
  }

  .admin-calendar {
    width: 100%;
  }

  .calendar-block {
    position: relative;
    height: 400px;
  }
  .remove-icon {
    background-image: url('../../../assets/icons/delete-icon.svg');
    width: 32px;
    height: 32px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: .7;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .location-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 4px 4px 12px;
    border-bottom: 2px solid #000;
    margin-bottom: 24px;

    .name {
      font-size: 1.4em;
      font-weight: bold;
    }
  }
</style>
