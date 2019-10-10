<template>
  <div
    class="vue-select__option"
    @click="onSelect"
  >
    <span class="text-container">
      {{ truncatedString(label) }}
    </span>
    <div class="select-text">
      Обрати
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'VueOption',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: [String, Number],
      default: ''
    }
  },

  inject: ['select'],

  methods: {
    onSelect () {
      this.select.$emit('option:select', {
        value: this.value,
        label: this.label
      })
    },
    truncatedString (i) {
      return i.length >= 35 ? i.substring(0, 35) + '...' : i
    }
  }
}
</script>

<style lang="scss">
  $color-grey: #dddddd;
  $color-grey-dark: #aaa;
  $color-grey-light: #f6f6f6;
  $color-primary: #498aed;

  .select-text {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 8px;
    margin: auto 0;
    font-size: 12px;
    color: #0000FF;
    padding: 0 8px 0 12px;
  }

  .vue-select__option {
    position: relative;
    cursor: pointer;
    padding: 12px 16px;
    font-size: .8em;
    color: lighten(#000, 20%);
    &[disabled] {
      cursor: no-drop !important;
      color: lighten(#000, 20%)
    }
    &:hover {
      color: #000;

      .select-text {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    &:last-child {
      border-radius: 0 0 0 12px;
    }
  }

    .text-container {
      max-width: 100px;
    }
</style>
