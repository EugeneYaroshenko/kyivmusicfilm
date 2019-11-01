<template>
  <div class="cinemas">
    <div
      class="cinema"
      v-for="(cinema, index) in cinemas"
      :key="index"
    >
      <div
        class="cinema-name active-link"
        v-if="cinema.url"
      >
        <a
          :href="cinema.url"
          target="_blank"
        >
          {{ cinema.name }}
        </a>
      </div>
      <div
        class="cinema-name"
        v-else
      >
        <span class="name">{{ cinema.name }}</span>
        <span class="soon">Скоро</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cinemas: {
        type: Array,
        required: true,
        default: () => []
      }
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
  @import '../../../../../styles/partials/variables';

  .cinemas {
    margin-top: 12px;
    height: auto;
    min-height: 100px;
    transition: all 350ms ease-in-out;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .cinema {
    padding: 0px 4px;
    margin: 0 4px 6px;
    transition: all .2s ease-in-out;
    cursor: default;
    font-size: .9em;
    text-align: center;
  }

  .cinema-name {
    font-weight: 400;
    letter-spacing: .2px;
    pointer-events: none;
    align-items: center;
    padding: 4px 0px;

    .name {
      opacity: .6;
      color: #0001BF;
    }

    .soon {
      opacity: 1;
      font-size: .8em;
      font-weight: 600;
    }
  }

  .active-link {
    pointer-events: auto;
    cursor: pointer;
    color: $blue;
    border-radius: 18px;

    a {
      color: inherit;
      text-decoration: none;
      border: 1px solid $blue;
      border-radius: 18px;
      padding: 4px 12px;
      transition: all 350ms ease-out;

      &:hover {
        background-color: $blue;
        color: $white;
      }
    }
  }

  @media screen and (min-width: 960px) {
    .cinemas {
      max-height: 200px;
      overflow-y: scroll;
    }
  }

  @media screen and (min-width: 1300px) {
    .cinemas {
      flex-flow: column nowrap;
      max-height: 250px;
      font-size: 1.1em;

      .cinema {
        margin: 0 0 12px;
      }
    }
  }
</style>
