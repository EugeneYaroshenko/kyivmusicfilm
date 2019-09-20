<template>
  <div>
    <edit-popup
      v-if="fetchedFilmRequest"
      :error="filmRequestInformation.error"
      :film-url="filmURL"
      :reset="resetRequest"
    />
    <section class="edit-blocks">
      <no-ssr>
        <film-form-container
          :validations="validations"
          :film="film"
          :validate-input-field="validateInputField"
        />
        <film-calendar-container :film="film"/>
      </no-ssr>
      <button
        class="action-button"
        @click="saveFilm"
        :disabled="!formCanBeSubmitted"
      >
        Зберегти Фільм
      </button>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import editPopup from '~/modules/admin/components/editPopup'
  import filmFormContainer from '~/modules/admin/container/filmForm'
  import filmCalendarContainer from '~/modules/admin/container/filmCalendar'

  export default {
    data () {
      return {
        calendarSectionExpanded: false,
        validations: {
          name: {
            validation_error: false,
            validation_message: 'У кожного фільму повинне бути своє ім\'я',
            validated: false
          },
          trailer: {
            regex: /\b((http|https):\/\/?)[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/,
            validation_error: false,
            validation_message: 'Щось не так із посиланням на трейлер',
            validated: false
          },
          description_short: {
            validation_error: false,
            validation_message: 'Короткий опис для пошукових систем би не завадив',
            validated: false
          },
          description_full: {
            validation_error: false,
            validation_message: 'Про що фільм? Усі хочуть знати',
            validated: false
          }
        }
      }
    },
    components: {
      editPopup,
      filmFormContainer,
      filmCalendarContainer
    },
    computed: {
      ...mapState({
                    allLocations: state => state.locations.all,
                    film: state => state.newFilm.film,
                    filmRequestInformation: state => state.newFilm.request
      }),
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
      fetchedFilmRequest () {
        return this.filmRequestInformation.fetched
      },
      filmURL () {
        return `/showings/${this.film.general.url}`
      }
    },
    methods: {
      toggleCalendarSection () {
        this.calendarSectionExpanded = !this.calendarSectionExpanded
      },
      resetRequest () {
        this.$store.dispatch('newFilm/resetRequest')
      },
      saveFilm () {
        this.$store.dispatch('newFilm/saveFilm')
      },
      ifFilmInformationFilledIn () {
        const validationErrors = this.validations.name.validation_error ||
          this.validations.trailer.validation_error ||
          this.validations.description_full.validation_error ||
          this.validations.description_short.validation_error

        const inputValues = this.film.general.name &&
          this.film.general.trailer &&
          this.film.general.description_full &&
          this.film.general.description_short &&
          this.film.general.image_desktop &&
          this.film.general.image_mobile

        return inputValues && !validationErrors
      },
      validateInputField (e, inputName) {
        this.validations[inputName].validation_error = inputName === 'trailer'
          ? !this.validations.trailer.regex.test(e.target.value)
          : !e.target.value.length

        this.validations[inputName].validated = true
      },
      // TODO check if city was added with calendar date and showing (check onSave)
      ifCityShowingsFilledIn () {
        return this.film.showings && this.film.showings.length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-blocks {
    max-width: 800px;
    margin: 0px auto 0;
    padding: 0 16px 40px;

    /deep/ .edit-block {
      max-width: 800px;
      margin: 0px auto 24px;
    }
  }

  .action-button {
    background-color: forestgreen;
    padding: 16px 12px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: .5px;
    cursor: pointer;
    display: block;

    &[disabled] {
      opacity: .4;
      pointer-events: none;
    }
  }
</style>
