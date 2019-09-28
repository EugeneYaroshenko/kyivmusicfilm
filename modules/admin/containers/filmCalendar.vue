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
            @change="addShowingLocation"
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
        v-for="(location, index) in selectedLocations"
        :key="index"
      >
        <div
          class="remove-location"
          @click="removeShowingLocation(location)"
        >
          Remove Location
        </div>
        <showings-for-city
          :location="location.name"
          :events="calendarEvents(location.name)"
          :selected-date="selectedDateForLocation(location.name)"
          :film-cinemas="showingCinemasForDate(location.name)"
          :all-cinemas="allCinemas(location.name)"
          :add-date="addDate"
          :edit-date="editDate"
          :delete-date="deleteDate"
          :save-edit="saveEdit"
          :cancel-edit="cancelEdit"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import showingsForCity from '~/modules/admin/components/showingsForCity'

  export default {
    data () {
      return {
        editBlockExpanded: false
      }
    },
    components: {
      showingsForCity
    },
    computed: {
      ...mapState({
                    allLocations: state => state.locations.all,
                    selectedLocations: state => state.editShowings.locations,
                    selectedCinemas: state => state.editShowings.cinemas
                  }),
      formCanBeSubmitted () {
        return this.ifFilmInformationFilledIn() && this.ifCityShowingsFilledIn()
      },
      locationsWithoutSelected () {
        if (this.allLocations) {
          const allLocationsForSelection = this.allLocations.reduce((resultArray, location) => {
            if (
              !this.selectedLocation ||
              (this.selectedLocations && !this.selectedLocations.filter(selectedLocation => selectedLocation.name === location.name).length)) {
                resultArray.push({ value: JSON.stringify(location), label: location.name })
            }

            return resultArray
          }, [])

          return allLocationsForSelection
        } else {
          return null
        }
      },
    },
    methods: {
      calendarEvents (location) {
        return this.$store.getters['editShowings/getShowingDatesForLocation'](location)
      },
      selectedDateForLocation (location) {
        return this.$store.getters['editShowings/getSelectedDateForLocation'](location)
      },
      showingCinemasForDate (location) {
        return this.$store.getters['editShowings/getShowingCinemasForDate'](location)
      },
      allCinemas (location) {
        return this.$store.getters['cinemas/getAllCinemasForLocation'](location)
      },
      toggleEditBlock () {
        this.editBlockExpanded = !this.editBlockExpanded
      },
      addDate ({ date, location }) {
        this.$store.dispatch('editShowings/addShowingDate', { date, location })
        this.$store.dispatch('editShowings/selectDate', { date, location })
      },
      editDate ({ date, location }) {
        this.$store.dispatch('editShowings/selectDate', { date, location })
      },
      deleteDate ({ date, location }) {
        this.$store.dispatch('editShowings/removeShowingDate', { date, location })

        this.removeUISelectedDate({ location })
      },
      cancelEdit ({ location }) {
        this.removeUISelectedDate({ location })
      },
      addShowingLocation (location) {
        this.$store.dispatch('editShowings/addShowingLocation', JSON.parse(location))
      },
      removeShowingLocation (location) {
        this.$store.dispatch('editShowings/removeShowingLocation', { location })
      },
      removeUISelectedDate ({ location }) {
        this.$store.dispatch(
          'editShowings/removeSelectedDate', { location }
        )
      },
      saveEdit ({ location, date, cinemas }) {
        this.$store.dispatch(
          'editShowings/updateShowingDate',
          { location, date, cinemas })

        this.removeUISelectedDate({ location })
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
