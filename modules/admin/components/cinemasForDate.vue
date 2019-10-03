<template>
  <div
    v-if="selectedDate"
    class="cinemas-container"
  >
    <div
      class="close-icon"
      @click="cancelForm"
    />
    <div class="cinemas-list__date">
      {{ selectedDate }} <span
        class="small-text"
        @click="deleteDate"
      >Видалити</span>
    </div>
    <div class="cinema__input-item">
      <div class="input-components">
        <vue-select
          :data="cinemasWithoutSelected"
          @change="selectCinema"
          v-if="cinemasWithoutSelected"
          placeholder="Додати Кінотеатр"
        >
          <vue-option
            v-for="(cinema, index) in cinemasWithoutSelected"
            :key="index"
            :value="cinema.value"
            :label="cinema.label"
          />
        </vue-select>
      </div>
    </div>
    <div class="cinema-list-container">
      <h4 class="cinemas-list__label">
        Обрані кінотеатри ({{ selectedCinemas.length }}):
      </h4>
      <ul
        class="cinemas-list"
        v-if="selectedCinemas"
      >
        <li
          v-for="(cinema, index) in selectedCinemas"
          class="cinema-item"
          :key="index"
        >
          <div
            class="remove-icon"
            @click="deleteCinema(cinema)"
          />
          <div>
            {{ cinema.name }}
          </div>
          <div class="cinema-input">
            <div class="input-name">
              URL:
            </div>
            <input
              type="text"
              @input="changeCinemaURL($event, cinema.name)"
              placeholder="Без посилання на показ"
              :value="cinema.url || ''"
            >
          </div>
        </li>
      </ul>
    </div>
    <div class="action-buttons">
      <div
        :class="{'button': true, 'action-button--disabled': !selectedCinemas.length }"
        @click="saveForm"
      >
        Зберегти
      </div>
    </div>
  </div>
</template>

<script>
  import VueSelect from '~/components/select/select'
  import VueOption from '~/components/select/option'

  export default {
    props: {
      selectedDate: {
        type: String,
        required: true
      },
      cinemasForSelectedDate: {
        type: Array,
        required: false,
        default: null
      },
      allCinemas: {
        type: Array,
        required: true
      },
      saveChanges: {
        type: Function,
        required: true
      },
      cancelChanges: {
        type: Function,
        required: true
      },
      deleteDate: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        selectedCinemas: []
      }
    },
    components: {
      VueSelect,
      VueOption
    },
    watch: {
      cinemasForSelectedDate () {
        console.log(this.cinemasForSelectedDate)
        this.selectedCinemas = this.cinemasForSelectedDate || []
      }
    },
    methods: {
      selectCinema (cinema) {
        const selectedCinema = { ...JSON.parse(cinema), ...{ url: null } }
        this.selectedCinemas = [...this.selectedCinemas, selectedCinema]
      },
      changeCinemaURL (e, name) {
        this.selectedCinemas = this.selectedCinemas.map(cinema => {
          return cinema.name === name ? { ...cinema, ...{ url: e.target.value } } : cinema
        })
      },
      saveForm () {
        this.saveChanges(this.selectedCinemas)
        this.selectedCinemas = []
      },
      cancelForm () {
        this.cancelChanges()
        this.selectedCinemas = []
      },
      deleteCinema (cinemaToDelete) {
        this.selectedCinemas = this.selectedCinemas.filter(cinemaName => cinemaName !== cinemaToDelete)
      }
    },
    computed: {
      cinemasWithoutSelected () {
        if (this.allCinemas) {
          const cinemasWithoutSelected = this.allCinemas.reduce((resultArray, cinema) => {
            if (this.selectedCinemas && !this.selectedCinemas.filter(selectedCinema => selectedCinema.name === cinema.name).length) {
              resultArray.push({ value: JSON.stringify(cinema), label: cinema.name })
            }
            return resultArray
          }, [])

          return cinemasWithoutSelected
        } else {
          return null
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row nowrap;
    flex: 0;
  }

  .edit-block {
    flex: 1;
    position: relative;
    margin-left: 16px;
  }

  .button {
    background-color: #4DB077;
    color: #fff;
    padding: 8px 12px;
    flex: 1;
    text-align: center;
    margin: 0 auto;
    border-radius: 16px;
    max-width: 48%;
    cursor: pointer;
    box-shadow: 0 3px 8px 0px rgba(#57FF84, .43%);
    transition: box-shadow 150ms ease-in-out, border-radius 250ms ease-in;
  }

  .action-buttons__cancel {
    background-color: red;
  }

  .action-button--disabled {
    pointer-events: none;
    opacity: .2;
    border-radius: 0;
    box-shadow: none;
  }

  .cinemas-list__date {
    margin-bottom: 15px;
    font-size: 1.4em;
    font-weight: bold;
    display: flex;
    align-items: center;
  }

  .cinemas-list__label {
    margin-bottom: 4px;
  }

  .cinema__input-item {
    margin-bottom: 42px;
    position: relative;
  }

  .input-components {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    z-index: 2;
  }

  .cinemas-container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(#fff, 1);
    border: 1px solid #000;
    z-index: 100;
    padding: 28px 32px;
    display: flex;
    flex-flow: column nowrap;
  }

  .cinemas-list {
    list-style: none;
    margin: 0px 0 12px;
    padding: 12px 0;
    z-index: 1000;
    flex: 1;
    overflow-y: scroll;
    height: 150px;

    .cinema-item {
      padding: 8px;
      display: flex;
      margin-bottom: 4px;
      cursor: pointer;
      align-items: center;

      &:hover .remove-icon {
        opacity: 1;
      }
    }

    .cinema-input {
      display: flex;
      align-items: center;
      flex: 1;
      margin-left: 12px;

      .input-name {
        font-weight: bold;
      }

      input {
        outline: 0;
        border: 1px solid #000;
        padding: 4px 6px;
        margin-left: 4px;
      }
    }

    .cinema-name {
      flex: 1;
    }

    .remove-icon {
      background-image: url('../../../assets/icons/delete-icon.svg');
      width: 24px;
      height: 24px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      opacity: .7;
      cursor: pointer;
      margin-right: 4px;
    }
  }

  .close-icon {
    background-image: url('../../../assets/icons/close.svg');
    width: 16px;
    height: 16px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    top: 24px;
    right: 24px;
    cursor: pointer;
  }

  .small-text {
    font-size: .8rem;
    color: #FF3C71;
    margin-left: 8px;
    opacity: .8;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
</style>
