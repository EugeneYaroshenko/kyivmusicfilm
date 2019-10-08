<template>
  <div
    class="calendar__container"
    v-if="filmDates"
  >
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
      <div
        class="dates-container"
        ref="datesContainer"
      >
        <div
          :class="{'dates': true, 'dates--centered': !longListOfDates }"
          :style="{left: `${scrollOffset}px`}"
        >
          <div
            v-for="(filmDate, index) in filmDates"
            :class="{ 'date': true, 'selected': filmDate === selectedShowingDate }"
            :key="index"
            @click="selectShowing(filmDate)"
          >
            <div class="date__day">
              {{ setDay(filmDate) }}
            </div>
            <div class="date__month">
              {{ setMonth(filmDate) }}
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
  import { mapState } from 'vuex'

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
    created () {
      this.setScrollVisibleArea()
      this.defineScrollableZone()
    },
    watch: {
      longListOfDates () {
        this.setScrollVisibleArea()
        this.defineScrollableZone()
      }
    },
    computed: {
      ...mapState({
                    filmDates: state => state.filmShowings.allActualDates,
                    selectedShowingDate: state => state.filmShowings.selectedShowingDate
                  }),
      longListOfDates () {
        return this.filmDates && this.filmDates.length > 5
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
      selectShowing (date) {
        this.$store.dispatch('filmShowings/selectShowing', { date })
      },
      setScrollVisibleArea () {
        this.scrollVisibleArea = this.filmDates ? this.filmDates.slice(0, 5) : null
      },
      defineScrollableZone () {
        this.checkIfScrollRightPossible()
        this.checkIfScrollLeftPossible()
      },
      scrollRight () {
        const scrollLastVisibleElement = this.scrollVisibleArea.slice(-1)[0]
        const scrollLastVisibleElementIndex = this.filmDates.indexOf(scrollLastVisibleElement) + 1

        this.scrollVisibleArea = this.filmDates.slice(scrollLastVisibleElementIndex, scrollLastVisibleElementIndex + 5)

        this.scrollOffset = this.scrollOffset - this.$refs.datesContainer.clientWidth

        this.defineScrollableZone()
      },
      scrollLeft () {
        const scrollFirstVisibleElement = this.scrollVisibleArea.slice(0)[0]
        const scrollFirstVisibleElementIndex = this.filmDates.indexOf(scrollFirstVisibleElement)

        this.scrollVisibleArea = this.filmDates.slice(scrollFirstVisibleElementIndex - 5, scrollFirstVisibleElementIndex)

        this.scrollOffset = this.scrollOffset + this.$refs.datesContainer.clientWidth

        this.defineScrollableZone()
      },
      // TODO make check simpler
      checkIfScrollRightPossible () {
        if (this.scrollVisibleArea && this.filmDates) {
          const scrollLastVisibleElement = this.scrollVisibleArea.slice(-1)[0]
          const datesLastElement = this.filmDates.slice(-1)[0]

          this.isScrollRightPossible = scrollLastVisibleElement !== datesLastElement
        }
      },
      checkIfScrollLeftPossible () {
        if (this.scrollVisibleArea && this.filmDates) {
          const scrollFirstVisibleElement = this.scrollVisibleArea.slice(0)[0]
          const datesFirstElement = this.filmDates.slice(0)[0]

          console.log(scrollFirstVisibleElement, datesFirstElement)

          this.isScrollLeftPossible = scrollFirstVisibleElement !== datesFirstElement
        }
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
    width: 64px;
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
    opacity: .8;

    &:hover {
      opacity: 1;
    }
  }

  .date__day {
    margin: 0;
    font-size: 1.1em;
  }

  .date__month {
    font-size: .8em;
    font-weight: 400;
    margin: 0;
  }

  .selected {
    font-weight: 600;
    color: #0001BF;
    font-size: 1em;
    opacity: 1;

    .date__month {
      font-weight: 600;
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
