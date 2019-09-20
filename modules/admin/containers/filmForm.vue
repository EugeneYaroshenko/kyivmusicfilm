<template>
  <div class="edit-block">
    <div
      class="content-heading"
      @click="toggleEditBlock"
    >
      <h3 class="content-heading__header">
        Загальна Інформація
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

    <div :class="{'content-info': true, 'general-info--expanded': editBlockExpanded }">
      <input-component
        input-type="text"
        input-name="назва"
        label="Назва"
        :validation="validations.name"
        :input-value="film.general.name"
        :on-input="updateFilmName"
        :validate="validateName"
      />
      <input-component
        input-type="text"
        input-name="url"
        label="Назва в URL посиланні (заповнюється автоматично)"
        :input-value="film.general.url"
        :disabled="true"
      />
      <input-component
        input-type="text"
        input-name="трейлер"
        label="Посилання на трейлер"
        :validation="validations.trailer"
        :input-value="film.general.trailer"
        :on-input="updateFilmTrailer"
        :validate="validateInputField($event, 'trailer')"
      />
      <input-component
        input-type="textarea"
        input-name="description-full"
        label="Опис фільму"
        :validation="validations.description_full"
        :input-value="film.general.description_full"
        :on-input="updateFilmFullDescription"
        :validate="validateInputField($event, 'description_full')"
      />
      <input-component
        input-type="textarea"
        input-name="description-short"
        label="Короткий опис для Facebook, Google відображення"
        :validation="validations.description_short"
        :input-value="film.general.description_short"
        :on-input="updateFilmShortDescription"
        :validate="validateInputField($event, 'description_short')"
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
              :style="createInlineBackground(film.general.image_desktop)"
            >
              <span class="photo-icon" />
              <span>1920 x 1080</span>
              <input
                id="screen-photo"
                class="input-file"
                type="file"
                @change="uploadDesktopImage($event)"
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
              :style="createInlineBackground(film.general.image_mobile)"
            >
              <span class="photo-icon" />
              <span>1080x566</span>
              <input
                id="mobile-image"
                class="input-file"
                type="file"
                @change="uploadMobileImage($event)"
              >
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import inputComponent from '~/modules/admin/components/input'

  export default {
    props: {
      film: {
        type: Object,
        required: true
      },
      validations: {
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
      inputComponent
    },
    methods: {
      toggleEditBlock () {
        this.generalSectionExpanded = !this.generalSectionExpanded
      },
      async uploadDesktopImage (e) {
        const desktopImageBase64 = await this.uploadImage(e.target.files[0])

        this.$store.dispatch('newFilm/updateFilmDesktopImage', desktopImageBase64)
      },
      async uploadMobileImage (e) {
        const mobileImageBase64 = await this.uploadImage(e.target.files[0])

        this.$store.dispatch('newFilm/updateFilmMobileImage', mobileImageBase64)
      },
      async uploadImage (imageFile) {
        const base64Image = await this.toBase64(imageFile)

        return base64Image
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-headline {
    text-align: center;
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
    background-image: url('../../../assets/admin/icons/photo-add.svg');
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
      background-image: url('../../../assets/admin/icons/plus.svg');
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
