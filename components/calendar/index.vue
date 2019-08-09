<template>
  <div class="calendar__container">
    <div class="calendar-dates">
      <div class="control back">
        <icon
          view-box="0 0 24 24"
          icon-name="arrow"
          size="28px"
        >
          <arrow-left />
        </icon>
      </div>
      <div class="dates">
        <div class="date">
          23
        </div>
        <div class="date disabled">
          24
        </div>
        <div class="date selected">
          25
        </div>
        <div class="date">
          26
        </div>
        <div class="date">
          27
        </div>
      </div>
      <div class="control forward">
        <icon
          view-box="0 0 24 24"
          icon-name="arrow"
          size="28px"
        >
          <arrow-left />
        </icon>
      </div>
    </div>
    <div class="calendar__month">
      липня
    </div>
  </div>
</template>

<script>
  import Icon from '../../components/icon'
  import ArrowLeft from '../../assets/icons/vueIcons/arrowLeft'

  export default {
    components: {
      Icon,
      ArrowLeft
    }
  }
</script>

<style lang="scss">
  .calendar-dates {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-top: 1em;
  }

  .control {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.forward {
      transform: rotate(180deg);
    }
  }

  .dates {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }

  .date {
    padding: 0 12px;
    margin: 0 4px;
    cursor: pointer;
  }

  .selected {
    font-weight: 600;
    font-size: 1.4em;
  }

  .calendar__month {
    font-weight: bold;
    text-align: center;
    font-size: .8em;
  }

  .disabled {
    opacity: .5;
    cursor: default;
  }
</style>
