<template>
  <div class="admin-calendar">
    <div
      class="calendar-overlay"
      v-if="selectedDate"
    />
    <full-calendar
      :events="calendarEvents"
      @dayClick="addNewDate"
      @eventClick="editEventDate"
    />
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
      },
      selectedDate: {
        type: Number,
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
    position: relative;
    padding-top: 16px;
  }

  .calendar-overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .3);
    z-index: 100;
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

  .full-calendar-body .dates .dates-events .events-week .events-day {
    position: relative;
  }

  .event-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item {
    background-color: deepskyblue;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    justify-content: flex-end;
    color: #ffffff;
    padding: 4px;
    font-size: 1em;
    font-weight: 500;
  }

  .full-calendar-body .dates .dates-events .events-week .events-day .day-number {
    position: absolute;
    z-index: 100;
    top: 4px;
    right: 5px;
    display: block;
  }

  .full-calendar-body .dates .dates-events .events-week .events-day .event-box .event-item.is-end {
    margin: 0;
  }

  .comp-full-calendar {
    padding: 0;
  }
</style>
