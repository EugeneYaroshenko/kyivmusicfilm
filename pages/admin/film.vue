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
    <no-ssr>
      <div class="content-block">
        <div class="intro-text">
          Всі поля є обов'язковими до заповнення. Для завершення успішної реєстрації нового фільму в базі потрібно,
          щоб був доданий хоча б один кіносеанс серед переліку доступних міст.
        </div>
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
          <label class="input-item__label">Назва в URL посиланні</label>
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
          <label class="input-item__label">Фото (широформатне, мобільне)</label>
          <div class="input-item__photos">
            <div
              class="upload-photo"
            >
              <label
                for="screen-photo"
                class="upload-photo__btn"
              >
                <span class="photo-icon" />
                <span>1200x600</span>
                <input
                  id="screen-photo"
                  class="input-file"
                  type="file"
                  @change="uploadImage($event, 'screen')"
                >
              </label>
            </div>
            <div class="upload-photo upload-photo--mobile">
              <label
                for="mobile-image"
                class="upload-photo__btn"
              >
                <span class="photo-icon" />
                <span>800x400</span>
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
      <div class="content-block">
        <h3>Сеанси</h3>
        <div class="input-item">
          <div class="input-item__new">
            <div class="add-icon" />
            <div class="input-item">
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
        </div>

        <div
          v-for="(showing, index) in cityShowings"
          :key="index"
        >
          <city-showing :city="showing.city" />
        </div>
      </div>
    </no-ssr>
  </section>
</template>

<script>
  import cityShowing from '~/components/admin/sections/cityShowing'
  import { mapState } from 'vuex'

  export default {
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

  .content-block {
    max-width: 800px;
    margin: 0px auto 0;
    padding: 0 16px 40px;
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
    background-color: #3db5ea;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    flex-flow: column nowrap;
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
    display: flex;
    justify-content: space-between;

    .upload-photo {
      height: 200px;
      width: 68%;
    }

    .upload-photo--mobile {
      width: 28%;
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
</style>
