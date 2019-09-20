<template>
  <section class="edit-container">
    <edit-popup
      v-if="fetchedFilmRequest"
      :error="filmRequestInformation.error"
      :film-url="filmURL"
      :reset="resetRequest"
    />
    <section class="edit-blocks">
      <no-ssr>
        <edit-form-container
          :validations="validations"
          :film="film"
          :validate-input-field="validateInputField"
        />
        <edit-calendar-container :film="film"/>
      </no-ssr>
      <button
        class="action-button"
        @click="saveFilm"
        :disabled="!formCanBeSubmitted"
      >
        Зберегти Фільм
      </button>
    </section>
  </section>
</template>

<script>
  import cityShowing from '~/components/admin/sections/cityShowing'
  import { mapState } from 'vuex'
  import editPopup from '~/components/admin/elements/editPopup'
  import editFormContainer from '~/modules/admin/container/editForm'
  import editCalendarContainer from '~/modules/admin/container/editCalendar'

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
      cityShowing,
      editPopup,
      editFormContainer,
      editCalendarContainer
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
  .edit-container {
    position: relative;
  }

  .popup-edit {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: green;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #fff;
  }

  .content-headline {
    text-align: center;
  }

  .cover-block {
    height: 400px;
    width: 100%;
    position: relative;
    margin-bottom: 64px;
  }

  .cover-image {
    height: 100%;
    width: 100%;
    background: #000;
  }

  .cover-content {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to top, #3D113C, transparent);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    color: #ffffff;
    padding: 16px 24px 0;
    letter-spacing: 2px;
  }

  .edit-blocks {
    max-width: 800px;
    margin: 0px auto 0;
    padding: 0 16px 40px;

    /deep/ .edit-block {
      max-width: 800px;
      margin: 0px auto 24px;
    }
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

  .intro-text {
    text-align: center;
    margin-bottom: 32px;
  }

  .upload-photo__btn {
    height: 100%;
    width: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    flex-flow: column nowrap;
    transition: all .3s ease-in-out;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .photo-icon {
    background-image: url('../../assets/admin/icons/photo-add.svg');
    height: 32px;
    width: 32px;
    display: block;
    margin-bottom: 4px;
  }

  .input-file {
    visibility: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }

  .input-item__photos {
    padding: 8px 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .upload-photo {
      height: 432px;
      width: 100%;
    }

    .upload-photo--mobile {
      width: 56%;
    }
  }

  .input-item__new {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 12px 0;
    cursor: pointer;

    .add-icon {
      background-image: url('../../assets/admin/icons/plus.svg');
      height: 50px;
      width: 50px;
      margin-right: 8px;
    }
  }

  .cinema-list {
    list-style: none;
    padding: 0;
    margin: 0;
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
