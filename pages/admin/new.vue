<template>
  <section class="admin-container">
    <div class="cover-block">
      <div class="cover-image"/>
      <div class="cover-content">
        <h1 class="content-headline">Новий Фільм</h1>
      </div>
    </div>
    <no-ssr>
      <div class="content-block">
        <div class="intro-text">
          Всі поля є обово'язковими для заповнення. Для завершення успішної реєстрації нового фільму в базі потрібно,
          щоб був доданий хоча б один кіносеанс серед переліку доступних міст.
        </div>
        <div class="input-item">
          <label class="input-item__label">Назва</label>
          <vue-input type="text" name="name" placeholder="Фільм"/>
        </div>
        <div class="input-item">
          <label class="input-item__label">Назва в URL посиланні</label>
          <vue-input placeholder="film-name-in-english">
            <template slot="prepend">
              /
            </template>
          </vue-input>
        </div>
        <div class="input-item">
          <label class="input-item__label">Опис фільму</label>
          <vue-input
            type="textarea"
            class="input-item__textarea"
          />
        </div>
        <div class="input-item">
          <label class="input-item__label">Короткий опис для Facebook, Google відображення</label>
          <vue-input
            type="textarea"
            class="input-item__textarea"
          />
        </div>
        <div class="input-item">
          <label class="input-item__label">Фото (широформатне, мобільне)</label>
          <div class="input-item__photos">
            <div class="upload-photo">
              <label for="screen-photo" class="upload-photo__btn">
                <span class="photo-icon"/>
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
              <label for="laptop-photo" class="upload-photo__btn">
                <span class="photo-icon"/>
                <span>800x400</span>
                <input
                  id="laptop-photo"
                  class="input-file"
                  type="file"
                  @change="uploadImage($event, 'mobile')"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="content-block">
        <h3>Сеанси</h3>
        <div class="input-item">
          <div class="input-item__new">
            <div class="add-icon"/>
            <div>Додати місто</div>
          </div>
        </div>

        <div class="film__block">
          <div class="input-item">
            <vue-select
              v-model="selected"
              :data="options"
              placeholder="Місто">
              <vue-option
                v-for="i in options"
                :key="i.value"
                :value="i.value"
                :label="i.label">
              </vue-option>
            </vue-select>
          </div>
          <div class="calendar-block">
            <admin-calendar />
            <div class="cinemas-list">
              <div class="input-item">
                <vue-select
                  v-model="selected"
                  :data="options"
                  placeholder="Обрати Кінотеатр">
                  <vue-option
                    v-for="i in options"
                    :key="i.value"
                    :value="i.value"
                    :label="i.label">
                  </vue-option>
                </vue-select>
              </div>
              <div class="cinema-list-container">
                Обрані кінотеатри
                <ul class="cinema-list">
                  <li>Жовтень</li>
                  <li>Кінопанорама</li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </no-ssr>
  </section>
</template>

<script>
  import AdminCalendar from '../../components/adminComponents/calendar'

  export default {
    data () {
      return {
        options: [
          { label: 'label 1', value: 1 },
          { label: 'label 2', value: 2 },
          { label: 'label 3', value: 3 },
          { label: 'label 3', value: 7 },
          { label: 'label 3', value: 4 },
          { label: 'label 3', value: 5 }
        ],
        selected: ''
      }
    },
    components: {
      AdminCalendar
    },
    methods: {
      async uploadImage (event, imageType) {
        console.log(event.target.files[0], imageType)
        // console.log(await this.toBase64(event.target.files[0]))
      },
      toBase64 (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  .cover-block {
    height: 400px;
    width: 100%;
    position: relative;
    margin-bottom: 64px;
  }

  .cover-image {
    height: 100%;
    width: 100%;
    background-image: url('../../assets/admin/images/background.png');
    background-size: cover;
    background-position: bottom center;
    background-repeat: no-repeat;
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

  .calendar-block {
    display: flex;
  }

  .cinema-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
</style>
