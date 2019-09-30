<template>
  <div class="edit-block">
    <div
      class="content-heading"
      @click="toggleEditBlock"
    >
      <h4 class="content-heading__header">
        Календар
      </h4>
      <div
        class="content-heading__controls"
      >
        <div
          class="dropdown-icon"
          :class="{'close-icon': editBlockExpanded, 'open-icon': !editBlockExpanded}"
        />
      </div>
    </div>
    <div :class="{'content-info': true, 'calendar-info--expanded': editBlockExpanded }">
      <div class="input-item">
        <div class="input-item__new">
          <vue-select
            :data="locationsWithoutSelected"
            @change="addShowingLocation"
            placeholder="Обрати місто"
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
        class="location-container"
        :key="index"
      >
        <showings-for-city
          :location="location.name"
          :ui-name="location.UI_NAME"
          :events="calendarEvents(location.name)"
          :selected-date="selectedDateForLocation(location.name)"
          :film-cinemas="showingCinemasForDate(location.name)"
          :all-cinemas="allCinemas(location.name)"
          :add-date="addDate"
          :edit-date="editDate"
          :delete-date="deleteDate"
          :save-edit="saveEdit"
          :cancel-edit="cancelEdit"
          :remove-location="() => removeShowingLocation(location)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import showingsForCity from '~/modules/admin/components/showingsForCity'
  import VueSelect from '~/components/select/select'
  import VueOption from '~/components/select/option'

  export default {
    data () {
      return {
        editBlockExpanded: false
      }
    },
    components: {
      showingsForCity,
      VueSelect,
      VueOption
    },
    computed: {
      ...mapState({
                    allLocations: state => state.data.locations,
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
              !this.selectedLocations ||
              (this.selectedLocations && !this.selectedLocations.filter(selectedLocation => selectedLocation.name === location.name).length)) {
              resultArray.push({ value: JSON.stringify(location), label: location.UI_NAME })
            }

            return resultArray
          }, [])

          return allLocationsForSelection
        } else {
          return null
        }
      }
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
        return this.$store.getters['data/getAllCinemasForLocation'](location)
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
        this.removeUISelectedDate({ location: location.name })
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
  .edit-block {
    flex: 2;

    &:hover .dropdown-icon {
      opacity: 1;
    }
  }

  .content-headline {
    text-align: center;
  }

  .content-heading__header {
    margin: 0;
    font-size: 1.2em;
    letter-spacing: .1px;
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
    width: 24px;
    height: 24px;
  }

  .content-info {
    max-height: 0;
    overflow: hidden;
    transition: all .3s ease-in-out;
  }

  .general-info--expanded, .calendar-info--expanded {
    max-height: 2000px;
    overflow: auto;
    min-height: 1000px;
  }

  .input-item__label {
    font-weight: 600;
    padding-bottom: 8px;
    display: block;
  }

  .input-item {
    margin-bottom: 100px;
    position: relative;
    z-index: 200;
  }

  .input-item__new {
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
  }

  .dropdown-icon {
    width: 24px;
    height: 24px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: .7;
    background-image: url('../../../assets/icons/dropdown-icon.svg');
  }

  .close-icon {
    transform: rotate(180deg);
  }
</style>
