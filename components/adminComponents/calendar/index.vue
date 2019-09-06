<template>
  <div class="admin-calendar">
    <full-calendar :events="fcEvents" @dayClick="dayClick"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fcEvents: [
          {
            title: 'Сеанс',
            start: '2019-09-06',
            end: '2019-09-06'
          }
        ]
      }
    },
    methods: {
      dayClick (day) {
        console.log('day clicked', day)
      }
    }
  }
</script>

<style lang="scss">
  .admin-calendar {
    width: 50%;
    height: 300px;
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
