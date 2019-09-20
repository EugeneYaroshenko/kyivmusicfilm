<template>
  <div class="edit-block">
    <div
      class="content-heading"
      @click="toggleEditBlock"
    >
      <h3 class="content-heading__header">
        Сеанси
      </h3>
      <div
        class="content-heading__controls"
      >
        <div
          v-if="editBlockExpanded"
        >
          Close
        </div>
        <div
          v-else
        >
          Open
        </div>
      </div>
    </div>
    <div :class="{'content-info': true, 'calendar-info--expanded': editBlockExpanded }">
      <div class="info-text">
        Обери місто, де буде відбуватися кінопоказ стрічки.
      </div>
      <div class="input-item">
        <div class="input-item__new">
          <div class="add-icon" />
          <vue-select
            :data="locationsWithoutSelected"
            @change="addShowingCity"
            placeholder="Додати Місто"
          >
            <vue-option
              v-for="(location, index) in locationsWithoutSelected"
              :key="index"
              :value="location.value"
              :label="location.label"
            />
          </vue-select>
        </div>
      </div>
      <div
        v-for="(showing, index) in film.showings"
        :key="index"
      >
        <showings-for-city
          :city="showing.city"
          :events="calendarEvents(showing.city)"
          :selected-date="selectedDateForCity(showing.city)"
          :film-cinemas="showingCinemasForDateAndCity(showing.city)"
          :all-cinemas="allCinemas(showing.city)"
          :add-date="addDate"
          :edit-date="editDate"
          :delete-date="deleteDate"
          :save-edit="saveEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import showingsForCity from '~/modules/admin/components/showingsForCity';

  export default {
    props: {
      film: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        editBlockExpanded: false
      }
    },
    components: {
      showingsForCity
    },
    computed: {
      ...mapState({ allLocations: state => state.locations.all }),
      formCanBeSubmitted () {
        return this.ifFilmInformationFilledIn() && this.ifCityShowingsFilledIn()
      },
      locationsWithoutSelected () {
        if (this.allLocations) {
          const allLocationsForSelection = this.allLocations.reduce((resultArray, location) => {
            resultArray.push({ value: location.name, label: location.name })
            return resultArray
          }, [])

          if (this.film.showings) {
            const selectedLocations = this.film.showings.map(showing => showing.city)

            return allLocationsForSelection.filter(location => !selectedLocations.includes(location.value))
          } else {
            return allLocationsForSelection
          }
        } else {
          return null
        }
      },
      calendarEvents (city) {
        return this.$store.getters['newFilm/getShowingDatesByCity'](city)
      },
      selectedDateForCity (city) {
        return this.$store.getters['adminInterface/getSelectedDateForCity'](city)
      },
      showingCinemasForDateAndCity (city) {
        if (this.selectedDateForCity) {
          return this.$store.getters['newFilm/getShowingCinemasForDateAndCity']({ city, date: this.selectedDateForCity })
        } else {
          return null
        }
      },
      allCinemas (city) {
        return this.$store.getters['cinemas/getAllCinemasForCity'](city)
      }
    },
    methods: {
      toggleEditBlock () {
        this.editBlockExpanded = !this.editBlockExpanded
      },
      addDate ({ date, city }) {
        this.$store.dispatch('newFilm/addShowingDate', { date, city })
        this.$store.dispatch('adminInterface/selectDate', { date, city })
      },
      editDate ({ date, city }) {
        this.$store.dispatch('adminInterface/selectDate', { date, city })
      },
      deleteDate ({ date, city }) {
        this.$store.dispatch('newFilm/removeShowingDate', { date, city })

        this.removeUISelectedDate({ city })
      },
      removeUISelectedDate () {
        this.$store.dispatch(
          'adminInterface/removeSelectedDate', { city: this.city }
        )
      },
      saveEdit ({ city, date, cinemas }) {
        this.$store.dispatch(
          'newFilm/updateShowingDate',
          { city, date, cinemas })

        this.removeUISelectedDate({ city })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-headline {
    text-align: center;
  }

  .content-heading__header {
    margin: 0;
  }

  .content-heading {
    position: relative;
    box-shadow: 0px 0px 12px 0 rgba(0, 0, 0, .1);
    padding: 16px 16px 16px 32px;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 32px;
  }

  .content-heading__controls {
    position: absolute;
    right: 12px;
    top: 0;
    bottom: 0;
    margin: auto 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .content-info {
    max-height: 0;
    overflow: hidden;
    transition: all .3s ease-in-out;
  }

  .general-info--expanded, .calendar-info--expanded {
    max-height: 2000px;
  }

  .input-item__label {
    font-weight: 600;
    padding-bottom: 8px;
    display: block;
  }

  .input-item {
    padding-bottom: 54px;
    position: relative;
  }
</style>
