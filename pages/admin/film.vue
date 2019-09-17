<template>
  <section class="admin-container">
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
            <div class="input-item">
              <label class="input-item__label">Назва</label>
              <vue-input
                type="text"
                name="name"
                :value="filmInformation.name"
                @input="updateFilmName"
              />
            </div>
            <div class="input-item">
              <label class="input-item__label">Назва в URL посиланні (заповнюється автоматично)</label>
              <vue-input
                placeholder="film-url"
                :value="filmInformation.url"
                :disabled="true"
              >
                <template slot="prepend">
                  /
                </template>
              </vue-input>
            </div>
            <div class="input-item">
              <label class="input-item__label">Посилання на трейлер</label>
              <vue-input
                type="text"
                name="name"
                :value="filmInformation.trailer"
                @input="updateFilmTrailer"
              />
            </div>
            <div class="input-item">
              <label class="input-item__label">Опис фільму</label>
              <vue-input
                type="textarea"
                class="input-item__textarea"
                :value="filmInformation.description_full"
                @input="updateFilmFullDescription"
              />
            </div>
            <div class="input-item">
              <label class="input-item__label">Короткий опис для Facebook, Google відображення</label>
              <vue-input
                type="textarea"
                class="input-item__textarea"
                :value="filmInformation.description_short"
                @input="updateFilmShortDescription"
              />
            </div>
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
      <div class="action-button" @click="saveFilm">Зберегти Фільм</div>
    </section>
  </section>
</template>

<script>
  import cityShowing from '~/components/admin/sections/cityShowing'
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        // TODO move to Vuex
        generalSectionExpanded: false,
        calendarSectionExpanded: false
      }
    },
    components: {
      cityShowing
    },
    computed: {
      ...mapState({
                    cityShowings: state => state.newFilm.showings,
                    allLocations: state => state.locations.all,
                    filmInformation: state => state.newFilm.general
      }),
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
      updateFilmName (name) {
        this.$store.dispatch('newFilm/updateFilmName', name)
        this.updateFilmURL(name)
      },
      updateFilmURL (shortURL) {
        this.$store.dispatch('newFilm/updateFilmURL', shortURL)
      },
      updateFilmTrailer (trailer) {
        this.$store.dispatch('newFilm/updateFilmTrailer', trailer)
      },
      updateFilmFullDescription (fullDescription) {
        this.$store.dispatch('newFilm/updateFilmFullDescription', fullDescription)
      },
      updateFilmShortDescription (shortDescription) {
        this.$store.dispatch('newFilm/updateFilmShortDescription', shortDescription)
      },
      addShowingCity (city) {
        this.$store.dispatch('newFilm/addShowingCity', { city })
      },
      removeShowingCity (city) {
        this.$store.dispatch('newFilm/removeShowingCity', { city })
      },
      saveFilm () {
        this.$store.dispatch('newFilm/saveFilm')
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .input-item {
    margin-bottom: 24px;
  }

  .input-item__label {
    font-weight: 600;
    padding-bottom: 8px;
    display: block;
  }

  .input-item__textarea {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
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
  }
</style>
