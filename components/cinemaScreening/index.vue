<template>
  <div class="cinema-screening">
    <h3 class="title">
      Клімт і Шіле
    </h3>
    <div class="screening-block">
      <h4 class="screening-block__title">
        Сеанси
      </h4>
      <calendar-component />
    </div>
    <div class="screening-block">
      <h4 class="screening-block__title">
        Кінотеатри
      </h4>
      <div class="cinemas">
        <div class="cinema">
          <div class="cinema-name">"Київ"</div>
          <div class="time">
            <div class="time-item">16:20</div>
            <div class="time-item">18:00</div>
          </div>
        </div>
        <div class="cinema">
          <div class="cinema-name">"Жовтень"</div>
          <div class="time">
            <div class="time-item">13:30</div>
            <div class="time-item">15:00</div>
            <div class="time-item">18:00</div>
            <div class="time-item">21:00</div>
          </div>
        </div>
        <div class="cinema">
          <div class="cinema-name">"Батерфляй"</div>
          <div class="time">
            <div class="time-item">13:30</div>
            <div class="time-item">15:00</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CalendarComponent from '~/components/calendar'

  export default {
    components: {
      CalendarComponent
    }
  }
</script>

<style lang="scss">
  .cinema-screening {
    flex: 1.2;
    max-width: 60%;
    padding: 24px 32px 12px 24px;
  }

  .title {
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 2px;
    font-weight: 500;
    margin: 0 0 2em 0;
  }

  .screening-block {
    margin: 0 auto 2em;
    max-width: 90%;
  }

  .screening-block__title {
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: .5px;
    text-align: center;
  }

  .cinemas {
    margin-top: 8px;
  }

  .cinema {
    padding: 18px 26px;
    margin-bottom: 4px;
    display: flex;
    justify-content: space-between;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 8px 0 rgba(#000000, .1);
    }
  }

  .cinema-name {
    text-transform: uppercase;
    color: #3DB5EA;
    font-weight: 600;
  }

  .time {
    font-size: 0.8em;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    max-width: 60%;
  }

  .time-item {
    padding: 0 4px;
  }
</style>
