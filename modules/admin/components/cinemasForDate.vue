<template>
  <div class="edit-block">
    <div
      v-if="selectedDate"
      class="cinemas-list"
    >
      <h3 class="cinemas-list__date">
        {{ selectedDate }}
      </h3>
      <div class="cinema__input-item">
        <h4 class="cinemas-list__label">
          Кінотеатри:
        </h4>
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
      <div class="cinema-list-container">
        <h4 class="cinemas-list__label">
          Обрані кінотеатри:
        </h4>
        <ul
          class="cinemas-list"
          v-if="selectedCinemas"
        >
          <li
            v-for="(cinema, index) in selectedCinemas"
            :key="index"
          >
            <div>
              {{ cinema }}
            </div>
            <div
              class="delete"
              @click="deleteCinema(cinema)"
            >
              Delete
            </div>
          </li>
        </ul>
      </div>
      <div class="action-buttons">
        <div
          :class="{'button action-buttons__save': true, 'action-button--disabled': !selectedCinemas.length }"
          @click="saveForm"
        >
          Зберегти
        </div>
        <div
          class="button action-buttons__cancel"
          @click="cancelForm"
        >
          Скасувати
        </div>
      </div>
    </div>
    <div
      class="select-date-block"
      v-else
    >
      Щоб додати кінотеатр, обери дату
    </div>
  </div>
</template>

<script>
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
      }

    },
    data () {
      return {
        selectedCinemas: []
      }
    },
    watch: {
      cinemasForSelectedDate () {
        this.selectedCinemas = this.cinemasForSelectedDate || []
      }
    },
    methods: {
      selectCinema (cinema) {
        this.selectedCinemas = [...this.selectedCinemas, ...[JSON.parse(cinema)]]
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
  }

  .edit-block {
    flex: 1;
    position: relative;
    margin-left: 16px;
  }

  .select-date-block {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .1);
  }

  .button {
    background-color: #000;
    color: #fff;
    padding: 8px 12px;
    flex: 1;
    text-align: center;
    max-width: 48%;
    cursor: pointer;
    pointer: cursor;
  }

  .action-buttons__cancel {
    background-color: red;
  }

  .action-button--disabled {
    pointer-events: none;
    opacity: .2;
  }

  .cinemas-list__date {
    margin-bottom: 15px;
  }

  .cinemas-list__label {
    margin-bottom: 4px;
  }

  .cinema__input-item {
    margin-bottom: 20px;
  }

  .cinemas-list {
    list-style: none;
    margin: 12px 0 24px;
    padding: 0;

    li {
      padding: 16px 12px;
      display: flex;
      justify-content: space-between;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, .1);
      border-radius: 8px;
      margin-bottom: 12px;
    }
  }
</style>
