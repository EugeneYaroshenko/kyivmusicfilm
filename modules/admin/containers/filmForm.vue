<template>
  <div
    class="edit-block"
  >
    <div
      class="content-heading"
      @click="toggleEditBlock"
    >
      <h4 class="content-heading__header">
        Загальна Інформація
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

    <div :class="{'content-info': true, 'general-info--expanded': editBlockExpanded }">
      <input-component
        input-type="text"
        input-name="name"
        label="Назва"
        :validation="validations.name"
        :input-value="description.name"
        :on-input="updateFilmName"
        :validate="validateInputField"
      />
      <input-component
        input-type="text"
        input-name="url"
        label="Назва в URL посиланні (заповнюється автоматично)"
        :validation="validations.url"
        :input-value="description.url"
        :on-input="updateFilmURL"
        :validate="validateInputField"
      />
      <input-component
        input-type="text"
        input-name="trailer"
        label="Посилання на трейлер"
        :validation="validations.trailer"
        :input-value="description.trailer"
        :on-input="updateFilmTrailer"
        :validate="validateInputField"
      />
      <input-component
        input-type="textarea"
        input-name="description_full"
        label="Опис фільму"
        :validation="validations.description_full"
        :input-value="description.description_full"
        :on-input="updateFilmFullDescription"
        :validate="validateInputField"
      />
      <input-component
        input-type="textarea"
        input-name="description_short"
        label="Короткий опис для Facebook, Google відображення"
        :validation="validations.description_short"
        :input-value="description.description_short"
        :on-input="updateFilmShortDescription"
        :validate="validateInputField"
      />
      <div class="input-item">
        <label class="input-item__label">Постер широкоформатний</label>
        <p
          @click="changeDesktopImage"
          v-if="description.image_desktop"
          class="input-change"
        >
          Змінити
        </p>
        <div
          class="input-item__photos"
          v-else
        >
          <div
            class="upload-photo"
          >
            <label
              for="screen-photo"
              class="upload-photo__btn"
              :style="{backgroundImage: `url('${this.desktopPreviewImage}')` }"
            >
              <span class="photo-icon" />
              <span>1200 x 1400 (max 1.5 MB)</span>
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
        <label class="input-item__label">Постер для Facebook</label>
        <p
          @click="changeMobileImage"
          v-if="description.image_mobile"
          class="input-change"
        >
          Змінити
        </p>
        <div
          class="input-item__photos"
          v-else
        >
          <div class="upload-photo upload-photo--mobile">
            <label
              for="mobile-image"
              class="upload-photo__btn"
              :style="{backgroundImage: `url('${this.mobilePreviewImage}')` }"
            >
              <span class="photo-icon" />
              <span>1200 * 630 (max 1 MB)</span>
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
    <button
      class="action-button"
      @click="saveFilm"
      :disabled="!formCanBeSubmitted"
    >
      Зберегти Фільм
    </button>
  </div>
</template>

<script>
  import inputComponent from '~/modules/admin/components/input'
  import { mapState } from 'vuex'

  export default {
    props: {
      saveFilm: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        editBlockExpanded: false,
        desktopPreviewImage: null,
        mobilePreviewImage: null,
        validations: {
          name: {
            validation_error: false,
            validation_message: 'У кожного фільму повинне бути своє ім\'я',
            validated: false
          },
          url: {
            validation_error: false,
            validation_message: 'У кожного фільму також має бути посилання',
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
      inputComponent
    },
    computed: {
      ...mapState({
                    description: state => state.editForm,
                    selectedCinemas: state => state.editShowings.cinemas
                  }),
      formCanBeSubmitted () {
        return this.ifFilmInformationFilledIn() && this.ifCinemasForLocation()
      }
    },
    methods: {
      toggleEditBlock () {
        this.editBlockExpanded = !this.editBlockExpanded
      },
      changeMobileImage () {
        this.$store.dispatch('editForm/updateFilmMobileImage', null)
      },
      changeDesktopImage () {
        this.$store.dispatch('editForm/updateFilmDesktopImage', null)
      },
      async uploadDesktopImage (e) {
        this.$store.dispatch('editForm/updateFilmDesktopImage', e.target.files[0])

        this.desktopPreviewImage = await this.uploadImage(e.target.files[0])
      },
      async uploadMobileImage (e) {
        this.$store.dispatch('editForm/updateFilmMobileImage', e.target.files[0])

        this.mobilePreviewImage = await this.uploadImage(e.target.files[0])
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
      updateFilmName (e) {
        this.$store.dispatch('editForm/updateFilmName', e.target.value)
        this.updateFilmURL(e)
      },
      updateFilmURL (e) {
        this.$store.dispatch('editForm/updateFilmURL', e.target.value)
      },
      updateFilmTrailer (e) {
        this.$store.dispatch('editForm/updateFilmTrailer', e.target.value)
      },
      updateFilmFullDescription (e) {
        this.$store.dispatch('editForm/updateFilmFullDescription', e.target.value)
      },
      updateFilmShortDescription (e) {
        this.$store.dispatch('editForm/updateFilmShortDescription', e.target.value)
      },
      ifFilmInformationFilledIn () {
        const validationErrors = this.validations.name.validation_error ||
          this.validations.trailer.validation_error ||
          this.validations.description_full.validation_error ||
          this.validations.description_short.validation_error

        const inputValues = this.description.name &&
          this.description.trailer &&
          this.description.description_full &&
          this.description.description_short &&
          this.description.image_desktop &&
          this.description.image_mobile

        return inputValues && !validationErrors
      },
      validateInputField (e, inputName) {
        this.validations[inputName].validation_error = inputName === 'trailer'
          ? !this.validations.trailer.regex.test(e.target.value)
          : !e.target.value.length

        this.validations[inputName].validated = true
      },
      ifCinemasForLocation () {
        return this.selectedCinemas && Object.keys(this.selectedCinemas).length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .edit-block {
    flex: 1;

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
  }

  .content-info {
    max-height: 0;
    overflow: hidden;
    transition: all .3s ease-in-out;
  }

  .general-info--expanded {
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
      background: #3db5ea;
      height: 432px;
      width: 100%;
    }

    .upload-photo--mobile {
      width: 100%;
      height: 300px;
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
    background-color: #4DB077;
    padding: 16px 12px 18px;
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    letter-spacing: .5px;
    cursor: pointer;
    display: block;
    position: fixed;
    outline: 0;
    border: none;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;

    &[disabled] {
      background-color: #C5F2D8;
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

  .input-change {
    cursor: pointer;
  }
</style>
