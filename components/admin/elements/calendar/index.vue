<template>
  <div class="admin-calendar">
    <full-calendar :events="calendarEvents" @dayClick="addNewDate" @eventClick="editEventDate" />
  </div>
</template>

<script>
  export default {
    props: {
      addShowingDate: {
        type: Function,
        required: true
      },
      editShowingDate: {
        type: Function,
        required: true
      },
      calendarEvents: {
        type: Array,
        required: false,
        default: null
      }
    },
    methods: {
      addNewDate (date) {
        this.addShowingDate(this.$moment(date).valueOf())
      },
      editEventDate (eventItem) {
        this.editShowingDate(this.$moment(eventItem.start).valueOf())
      }
    }
  }
</script>

<style lang="scss">
  .admin-calendar {
    width: 50%;
  }

  .full-calendar-body .dates .week-row .day-cell {
    min-height: 50px;
  }

   .full-calendar-body .dates .dates-events .events-week .events-day {
     min-height: 50px;
   }

  .full-calendar-body .weeks {
    border: none;
  }

  .full-calendar-body .dates {
    margin-top: 12px;
  }

  .full-calendar-body .dates .week-row:first-child {
    border-top: 1px solid #e0e0e0;
  }
</style>
