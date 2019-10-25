<template>
  <div class="locations-selection">
    <div class="locations-selection__block">
      <vue-select
        :data="locations"
        @change="changeLocation"
        :placeholder="location.UI_NAME"
        v-if="location"
      >
        <vue-option
          v-for="(locationItem, index) in locations"
          :key="index"
          :value="locationItem"
          :label="locationItem.UI_NAME"
        />
      </vue-select>
    </div>
  </div>
</template>

<script>
  import VueSelect from '~/components/locationSelect/select'
  import VueOption from '~/components/locationSelect/option'

  export default {
    props: {
      location: {
        type: Object,
        required: true,
        default: () => {}
      },
      locations: {
        type: Array,
        required: true,
        default: () => []
      },
      changeLocation: {
        type: Function,
        required: true
      }
    },
    components: {
      VueSelect,
      VueOption
    },
    data () {
      return {
        isMenuShown: false
      }
    },
    methods: {
      toggleMainMenu () {
        this.isMenuShown = !this.isMenuShown
      }
    }
  }
</script>

<style lang="scss" scoped>
  .locations-selection {
    position: relative;
    max-width: 200px;
    margin: 0 auto 16px;
    z-index: 100;

    .locations-selection__block {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
    }
  }
</style>
