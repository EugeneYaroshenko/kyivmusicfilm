<template>
  <div class="calendar__container" v-if="filmShowings">
    <div class="calendar-dates">
      <div
        :class="{'control back': true, 'disabled': !isScrollLeftPossible}"
        @click="scrollLeft"
        v-if="longListOfDates"
      >
        <icon
          view-box="0 0 24 24"
          icon-name="arrow"
          size="28px"
        >
          <arrow-left />
        </icon>
      </div>
      <div class="dates-container" ref="datesContainer">
        <div
          :class="{'dates': true, 'dates--centered': !longListOfDates }"
          :style="{left: `${scrollOffset}px`}"
        >
          <div
            v-for="(filmShowing, index) in filmShowings"
            :class="{ 'date': true, 'selected': filmShowing.date === selectedShowingDate }"
            :key="index"
            @click="selectShowing(filmShowing)"
          >
            <div class="date__day">
              {{ setDay(filmShowing.date) }}
            </div>
            <div class="date__month">
              {{ setMonth(filmShowing.date) }}
            </div>
          </div>
        </div>
      </div>
      <button
        :class="{'control forward': true, 'disabled': !isScrollRightPossible}"
        @click="scrollRight"
        v-if="longListOfDates"
      >
        <icon
          view-box="0 0 24 24"
          icon-name="arrow"
          size="28px"
        >
          <arrow-left />
        </icon>
      </button>
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import ArrowLeft from '~/assets/icons/vueIcons/arrowLeft'

  export default {
    data () {
      return {
        scrollVisibleArea: null,
        scrollOffset: 0,
        DEFAULT_SCROLL_LENGTH: 300,
        isScrollRightPossible: false,
        isScrollLeftPossible: false
      }
    },
    components: {
      Icon,
      ArrowLeft
    },
    watch: {
      filmShowings: function (val, oldVal) {
        if (val && val !== oldVal) {
          this.setScrollVisibleArea()
          this.defineScrollableZone()
          this.ifLongListOfDates()
        }
      }
    },
    computed: {
      filmShowings () {
        return this.$store.state.filmShowings.allShowingsForCity
      },
      selectedShowingDate () {
        return this.$store.state.filmShowings.selectedShowingDate
      }
    },
    methods: {
      setDay (time) {
        // TODO change the way moment handles time
        if (process.client) {
          return this.$moment(time).format('D')
        }
      },
      setMonth (time) {
        if (process.client) {
          return this.$moment(time).format('MMM')
        }
      },
      selectShowing (showing) {
        this.$store.dispatch('filmShowings/selectShowing', showing)
      },
      setScrollVisibleArea (datesArray = []) {
        this.scrollVisibleArea = datesArray.length ? datesArray : this.filmShowings.slice(0, 5)
      },
      ifLongListOfDates () {
        this.longListOfDates = this.filmShowings && this.filmShowings.length > 5
      },
      defineScrollableZone () {
        this.checkIfScrollRightPossible()
        this.checkIfScrollLeftPossible()
      },
      scrollRight () {
        const scrollLastVisibleElement = this.scrollVisibleArea.slice(-1)[0]
        const scrollLastVisibleElementIndex = this.filmShowings.indexOf(scrollLastVisibleElement) + 1

        this.scrollVisibleArea = this.filmShowings.slice(scrollLastVisibleElementIndex, scrollLastVisibleElementIndex + 5)

        this.scrollOffset = this.scrollOffset - this.$refs.datesContainer.clientWidth

        console.log(scrollLastVisibleElementIndex, this.scrollVisibleArea, this.scrollOffset)

        this.defineScrollableZone()
      },
      scrollLeft () {
        const scrollFirstVisibleElement = this.scrollVisibleArea.slice(0)[0]
        const scrollFirstVisibleElementIndex = this.filmShowings.indexOf(scrollFirstVisibleElement)

        this.scrollVisibleArea = this.filmShowings.slice(scrollFirstVisibleElementIndex - 5, scrollFirstVisibleElementIndex)

        this.scrollOffset = this.scrollOffset + this.$refs.datesContainer.clientWidth

        console.log(scrollFirstVisibleElementIndex, this.scrollVisibleArea, this.scrollOffset)

        this.defineScrollableZone()
      },

      checkIfScrollRightPossible () {
        const scrollLastVisibleElement = this.scrollVisibleArea.slice(-1)[0]
        const datesLastElement = this.filmShowings.slice(-1)[0]

        this.isScrollRightPossible = scrollLastVisibleElement !== datesLastElement
      },
      checkIfScrollLeftPossible () {
        const scrollFirstVisibleElement = this.scrollVisibleArea.slice(0)[0]
        const datesFirstElement = this.filmShowings.slice(0)[0]

        this.isScrollLeftPossible = scrollFirstVisibleElement !== datesFirstElement
      }
    }
  }
</script>

<style lang="scss">
  .calendar-dates {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    margin-top: 1em;
  }

  .control {
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    outline: 0;

    &.forward {
      transform: rotate(180deg);
    }
  }

  .dates-container {
    position: relative;
    width: 100%;
    max-width: 150px;
    min-width: 150px;
    height: 30px;
    overflow: hidden;
  }

  .dates {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    position: absolute;
    top: 0;
    height: 100%;
    transition: all .3s ease-in-out;
  }

  .dates--centered {
    justify-content: center;
  }

  .date {
    width: 30px;
    min-width: 30px;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column nowrap;
  }

  .date__day {
    margin: 0;
  }

  .date__month {
    font-size: .6em;
    font-weight: 400;
    margin: 0;
  }

  .selected {
    font-weight: 600;
    font-size: 1.4em;

    .date__month {
      font-weight: 600;
      font-size: .8em;
    }
  }

  .calendar__month {
    font-weight: bold;
    text-align: center;
    font-size: .8em;
  }

  .disabled {
    opacity: .5;
    cursor: default;
    pointer-events: none;
  }

  @media screen and (min-width: 960px) {
    .dates-container {
      max-width: 300px;
      min-width: 300px;
      height: 60px;
    }

    .date {
      height: 60px;
      min-width: 60px;
    }
  }
</style>
