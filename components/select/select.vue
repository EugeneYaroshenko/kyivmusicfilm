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
        </div>
        <div class="placeholder-line"/>
        <div class="control-icon close" v-if="showOptions"/>
        <div class="control-icon search" v-else/>
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
      default: 'Немає показів в інших містах'
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
.vue-select {
  display: block;
  cursor: pointer;
  position: relative;
  width: 100%;
  box-shadow: 0 0 4px 0 rgba(#FFF2F5, 1);
  padding: 8px 12px 8px 0;
  border-radius: 18px 18px 24px 24px;
  max-width: 400px;
  margin: 0;
  background-color: #fff;
  border: 1px solid transparent;
}

.vue-select__block {
  position: relative;
  overflow: hidden;
}

.placeholder-line {
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 70%;
  border-bottom: 1px solid #0000FF;
  transform: translate3d(-100%, 0, 0);
  transition: all 350ms ease-in-out;
}

.vue-select--opened {
  border: 1px solid #0000ff;

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
}

.list-container--expanded {
  max-height: 1000px;
}

.vue-select__block {
  display: flex;
  align-items: center;

  .placeholder {
    flex: 1;
    padding: 8px 0 8px 16px;
    margin-right: 24px;
    opacity: .8;
  }

  .control-icon {
    width: 18px;
    height: 18px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;

    &.search {
      background-image: url('../../assets/icons/search.svg')
    }
    &.close {
      background-image: url('../../assets/icons/close.svg')
    }
  }
}

.vue-select__option-list {
  max-height: 0;
  margin-right: 18px;
  transition: all 350ms ease-in-out;
  overflow: hidden;
}

.vue-select__option-list--opened {
  max-height: 200px;
  padding: 16px 0 0px 0;
  overflow-y: scroll;
}

.vue-select__option-list--empty {
  padding: 8px 8px 8px 16px;
  font-size: .8em;
}
</style>
