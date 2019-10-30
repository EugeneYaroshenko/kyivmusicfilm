<template>
  <div
    v-click-outside="onClosePopper"
    class="vue-select"
    :class="{
      'vue-select--opened': showOptions
    }"
  >
    <div>
      <div class="vue-select__block" @click="togglePopper">
        <div class="placeholder">
          <span>{{ placeholder }}</span>
          <div class="control-icon location" />
        </div>
      </div>
    </div>
    <div
      class="list-container"
      :class="{'list-container--expanded': showOptions}"
    >
      <div
        ref="list"
        class="vue-select__option-list"
        :class="{'vue-select__option-list--opened': showOptions }"
      >
        <div
          v-if="!data.length"
          class="vue-select__option-list--empty"
        >
          {{ emptyText }}
        </div>
        <slot v-else />
      </div>
    </div>
  </div>
</template>

<script>
import { clickOutside } from './utils/directives'

export default {
  name: 'VueSelect',

  directives: {
    clickOutside
  },

  provide () {
    return {
      select: this
    }
  },

  props: {
    data: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number, Array, Object],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: 'Немає доступних варіантів'
    },
    name: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      appendEl: '',
      selected: null,
      showOptions: false,
      aheadPointer: 0,
      pointerPosTop: null,
      viewportHeight: null,
      tagsHeight: null
    }
  },
  // watch: {
  //   showOptions (v) {
  //     if (v) {
  //       this.$nextTick(() => {
  //         this.getViewportHeight()
  //         this.getPointerPosTop()
  //       })
  //     }
  //   }
  // },

  created () {
    this.$on('option:select', (e) => {
      this.selected = e
      this.$emit('change', e.value)
      this.onClosePopper()
    })
  },

  mounted () {
    this.appendEl = this.$el
  },

  methods: {
    togglePopper () {
      if (this.disabled) return

      this.showOptions = !this.showOptions
    },
    onClosePopper () {
      if (this.showOptions) this.showOptions = false
    },
    onEnter () {
      const item = this.data[this.aheadPointer]

      this.$emit('change', item.value)
      this.showOptions = false
    },
    getViewportHeight () {
      this.viewportHeight = this.$refs.listContainer.$el.offsetHeight
    },
    getPointerPosTop () {
      this.pointerPosTop = this.$refs.list.children[this.aheadPointer].offsetTop
    },
    scrollByArrow (e) {
      if (!this.data || !this.showOptions) return

      const optionItemHeight = this.$refs.list.children[0].offsetHeight
      const popperInner = this.$refs.listContainer.$el.querySelector(
        '.vue-popper__inner'
      )
      const offsetTop = 10
      const offsetBottom = 6

      if (e.keyCode === 38) {
        if (this.aheadPointer > 0) this.aheadPointer--
        this.getPointerPosTop()
      }
      if (e.keyCode === 40) {
        if (this.aheadPointer < this.data.length - 1) this.aheadPointer++
        this.getPointerPosTop()
      }
      if (this.pointerPosTop < popperInner.scrollTop) {
        popperInner.scrollTop = this.pointerPosTop - offsetTop
      }
      if (
        this.pointerPosTop >
        popperInner.scrollTop + this.viewportHeight - optionItemHeight
      ) {
        popperInner.scrollTop =
          this.pointerPosTop -
          this.viewportHeight +
          optionItemHeight +
          offsetBottom
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/partials/variables';

.vue-select {
  display: block;
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 8px 12px 8px 0;
  transition: all 200ms ease-in-out;
  border-radius: 24px;
  max-width: 400px;
  max-height: 1000px;
  margin: 0;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid $blue;
  }
}

.vue-select__block {
  position: relative;
  overflow: hidden;
}

.vue-select--opened {
  border: 1px solid $blue;
  background-color: #fff;

  .placeholder {
    opacity: 1;
  }

  .placeholder-line {
    transform: translate3d(0, 0, 0);
  }
}

.list-container {
  max-height: 0;
  overflow: hidden;
  transition: all 200ms ease-in-out;
}

.list-container--expanded {
  max-height: 1000px;
}

.vue-select__block {
  position: relative;
  text-align: center;

  .placeholder {
    flex: 1;
    padding: 8px 0 8px 40px;
    margin: 0 auto;
    display: inline;
    opacity: .8;
    font-size: 1.1em;
    position: relative;
  }

  .control-icon {
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
    width: 18px;
    height: 18px;
    position: absolute;
    left: 8px;
    top: 0;
    bottom: 0;
    margin: auto 0;

    &.location {
      background-image: url('../../assets/icons/locationPlaceholder.svg');
    }
  }
}

.vue-select__option-list {
  max-height: 0;
  transition: all 350ms ease-in-out;
  overflow: hidden;
}

.vue-select__option-list--opened {
  max-height: 300px;
  padding: 16px 0 0px 0;
  overflow-y: scroll;
}

.vue-select__option-list--empty {
  padding: 8px 8px 8px 16px;
  font-size: .8em;
}
</style>
