<template>
  <section class="edit-container">
    <edit-popup
      v-if="fetchedFilmRequest"
      :error="filmRequest.error"
      :film-url="filmURL"
      :reset="resetRequest"
    />
    <div class="cover-block">
      <div class="cover-image" />
      <div class="cover-content">
        <h2 class="content-headline">
          {{ filmInformation.name }}
        </h2>
      </div>
    </div>
    <section class="container">
      <no-ssr>
        <div class="content intro-text">
          Всі поля є обов'язковими до заповнення. Для завершення успішної реєстрації нового фільму в базі потрібно,
          щоб був доданий хоча б один кіносеанс серед переліку доступних міст.
        </div>
        <div class="content">
          <div
            class="content-heading"
            @click="toggleGeneralSection"
          >
            <h3 class="content-heading__header">
              Загальна Інформація
            </h3>
            <div
              class="content-heading__controls"
            >
              <div
                v-if="generalSectionExpanded"
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

          <div :class="{'content-info': true, 'general-info--expanded': generalSectionExpanded }">
            <input-component
              input-type="text"
              input-name="назва"
              label="Назва"
              :validation="validations.name"
              :input-value="filmInformation.name"
              :on-input="updateFilmName"
              :validate="validateName"
            />
            <input-component
              input-type="text"
              input-name="url"
              label="Назва в URL посиланні (заповнюється автоматично)"
              :input-value="filmInformation.url"
              :disabled="true"
            />
            <input-component
              input-type="text"
              input-name="трейлер"
              label="Посилання на трейлер"
              :validation="validations.trailer"
              :input-value="filmInformation.trailer"
              :on-input="updateFilmTrailer"
              :validate="validateTrailer"
            />
            <input-component
              input-type="textarea"
              input-name="description-full"
              label="Опис фільму"
              :validation="validations.description_full"
              :input-value="filmInformation.description_full"
              :on-input="updateFilmFullDescription"
              :validate="validateFullDescription"
            />
            <input-component
              input-type="textarea"
              input-name="description-short"
              label="Короткий опис для Facebook, Google відображення"
              :validation="validations.description_short"
              :input-value="filmInformation.description_short"
              :on-input="updateFilmShortDescription"
              :validate="validateShortDescription"
            />
            <div class="input-item">
              <label class="input-item__label">Постер широкоформатний</label>
              <div class="input-item__photos">
                <div
                  class="upload-photo"
                >
                  <label
                    for="screen-photo"
                    class="upload-photo__btn"
                    :style="createInlineBackground(filmInformation.image_desktop)"
                  >
                    <span class="photo-icon" />
                    <span>1920 x 1080</span>
                    <input
                      id="screen-photo"
                      class="input-file"
                      type="file"
                      @change="uploadImage($event, 'screen')"
                    >
                  </label>
                </div>
              </div>
            </div>
            <div class="input-item">
              <label class="input-item__label">Постер для мобільних</label>
              <div class="input-item__photos">
                <div class="upload-photo upload-photo--mobile">
                  <label
                    for="mobile-image"
                    class="upload-photo__btn"
                    :style="createInlineBackground(filmInformation.image_mobile)"
                  >
                    <span class="photo-icon" />
                    <span>1080x566</span>
                    <input
                      id="mobile-image"
                      class="input-file"
                      type="file"
                      @change="uploadImage($event, 'mobile')"
                    >
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div
            class="content-heading"
            @click="toggleCalendarSection"
          >
            <h3 class="content-heading__header">
              Сеанси
            </h3>
            <div
              class="content-heading__controls"
            >
              <div
                v-if="calendarSectionExpanded"
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
          <div :class="{'content-info': true, 'calendar-info--expanded': calendarSectionExpanded }">
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
              v-for="(showing, index) in cityShowings"
              :key="index"
            >
              <city-showing :city="showing.city" />
            </div>
          </div>
        </div>
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
  import inputComponent from '~/components/admin/elements/form/input'
  import editPopup from '~/components/admin/elements/editPopup'

  export default {
    data () {
      return {
        // TODO move to Vuex
        generalSectionExpanded: false,
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
      inputComponent,
      editPopup
    },
    computed: {
      ...mapState({
                    cityShowings: state => state.newFilm.film.showings,
                    allLocations: state => state.locations.all,
                    filmInformation: state => state.newFilm.film.general,
                    filmRequest: state => state.newFilm.request
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

          if (this.cityShowings) {
            const selectedLocations = this.cityShowings.map(showing => showing.city)

            return allLocationsForSelection.filter(location => !selectedLocations.includes(location.value))
          } else {
            return allLocationsForSelection
          }
        } else {
          return null
        }
      },
      fetchedFilmRequest () {
        return this.filmRequest.fetched
      },
      filmURL () {
        return `/showings/${this.filmInformation.url}`
      }
    },
    methods: {
      toggleGeneralSection () {
        this.generalSectionExpanded = !this.generalSectionExpanded
      },
      toggleCalendarSection () {
        this.calendarSectionExpanded = !this.calendarSectionExpanded
      },
      async uploadImage (event, imageType) {
        // TODO Handle Error
        const imageBase64 = await this.toBase64(event.target.files[0])

        return imageType === 'mobile'
          ? this.$store.dispatch('newFilm/updateFilmMobileImage', imageBase64)
          : this.$store.dispatch('newFilm/updateFilmDesktopImage', imageBase64)
      },
      toBase64 (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
      },
      createInlineBackground (image) {
        return image
          ? { backgroundImage: 'url(\'' + image + '\')' }
          : { background: '#3db5ea' }
      },
      updateFilmName (e) {
        this.$store.dispatch('newFilm/updateFilmName', e.target.value)
        this.updateFilmURL(e.target.value)
      },
      updateFilmURL (name) {
        this.$store.dispatch('newFilm/updateFilmURL', name)
      },
      updateFilmTrailer (e) {
        this.$store.dispatch('newFilm/updateFilmTrailer', e.target.value)
      },
      updateFilmFullDescription (e) {
        this.$store.dispatch('newFilm/updateFilmFullDescription', e.target.value)
      },
      updateFilmShortDescription (e) {
        this.$store.dispatch('newFilm/updateFilmShortDescription', e.target.value)
      },
      addShowingCity (city) {
        this.$store.dispatch('newFilm/addShowingCity', { city })
      },
      removeShowingCity (city) {
        this.$store.dispatch('newFilm/removeShowingCity', { city })
      },
      resetRequest () {
        this.$store.dispatch('newFilm/resetRequest')
      },
      saveFilm () {
        this.$store.dispatch('newFilm/saveFilm')
      },
      // validations
      validateName (e) {
        this.validations.name.validation_error = !e.target.value.length

        this.validations.name.validated = true
      },
      validateTrailer (e) {
        this.validations.trailer.validation_error = !this.validations.trailer.regex.test(e.target.value)

        this.validations.trailer.validated = true
      },
      validateFullDescription (e) {
        this.validations.description_full.validation_error = !e.target.value.length

        this.validations.description_full.validated = true
      },
      validateShortDescription (e) {
        this.validations.description_short.validation_error = !e.target.value.length

        this.validations.description_short.validated = true
      },
      ifFilmInformationFilledIn () {
        const validationErrors = this.validations.name.validation_error ||
          this.validations.trailer.validation_error ||
          this.validations.description_full.validation_error ||
          this.validations.description_short.validation_error

        const inputValues = this.filmInformation.name &&
          this.filmInformation.trailer &&
          this.filmInformation.description_full &&
          this.filmInformation.description_short &&
          this.filmInformation.image_desktop &&
          this.filmInformation.image_mobile

        return inputValues && !validationErrors
      },
      // TODO check if city was added with calendar date and showing (check onSave)
      ifCityShowingsFilledIn () {
        return this.cityShowings && this.cityShowings.length
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

  .container {
    max-width: 800px;
    margin: 0px auto 0;
    padding: 0 16px 40px;
  }

  .content {
    max-width: 800px;
    margin: 0px auto 24px;
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
