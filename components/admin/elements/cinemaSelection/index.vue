<template>
  <div class="edit-block">
    <div
      v-if="selectedDate"
      class="cinemas-list"
    >
      <div class="cinemas-list__date">
        {{ selectedDate }}
      </div>
      <div class="input-item">
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
        Обрані кінотеатри
        <ul
          class="cinema-list"
          v-if="selectedCinemas"
        >
          <li
            v-for="(cinema, index) in selectedCinemas"
            :key="index"
          >
            <div>
              {{ cinema }}
              <div
                class="delete"
                @click="deleteCinema(cinema)"
              >
                Delete
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="action-buttons">
        <div
          class="button action-buttons__save"
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
      Оберіть дату
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
        this.selectedCinemas = this.cinemasForSelectedDate
      }
    },
    methods: {
      selectCinema (cinema) {
        this.selectedCinemas = [...this.selectedCinemas, ...[cinema]]
      },
      saveForm () {
        return this.saveChanges(this.selectedCinemas)
      },
      cancelForm () {
        return this.cancelChanges()
      },
      deleteCinema (cinemaToDelete) {
        this.selectedCinemas = this.selectedCinemas.filter(cinemaName => cinemaName !== cinemaToDelete)
      }
    },
    computed: {
      cinemasWithoutSelected () {
        if (this.allCinemas) {
          const allCinemasForSelection = this.allCinemas.reduce((resultArray, cinema) => {
            resultArray.push({ value: cinema, label: cinema })
            return resultArray
          }, [])

          return this.selectedCinemas
            ? allCinemasForSelection.filter(cinema => !this.selectedCinemas.includes(cinema.value))
            : allCinemasForSelection
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

  .button {
    background-color: yellow;
    padding: 8px 12px;
    max-width: 48%;
    cursor: pointer;
  }
</style>
