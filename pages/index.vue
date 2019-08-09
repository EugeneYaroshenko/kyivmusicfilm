<template>
  <section class="container">
    <navigation-component />
    <div class="main">
      <film-info-component/>
      <div class="main__film-cinema">
        <cinema-screening-component/>
        <cinema-map-component/>
      </div>
    </div>
  </section>
</template>

<script>
  import NavigationComponent from '~/components/navigation'
  import FilmInfoComponent from '~/components/filmInfo'
  import CinemaScreeningComponent from '~/components/cinemaScreening'
  import CinemaMapComponent from '~/components/cinemaMap'

  export default {
    components: {
      NavigationComponent,
      FilmInfoComponent,
      CinemaScreeningComponent,
      CinemaMapComponent
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    margin: 0 auto;
    padding: 0 50px 0 80px;
    height: 100%;
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    position: relative;
  }

  .main {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 80px;
    position: relative;
    bottom: 0;
    display: flex;
    flex: 1;
  }

  .main__film-cinema {
    flex: 1.6;
    display: flex;
    flex-flow: row nowrap;
  }
</style>
