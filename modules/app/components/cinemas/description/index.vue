<template>
    <div :class="{'information': true, 'information--collapsed': isDescriptionCollapsed }">
      <div class="description-open" @click="showDescription">Опис фільму</div>
      <div class="description-close" @click="hideDescription">Сеанси</div>
      <div class="description">
        <h3 class="heading heading-desktop">
          {{ this.filmInformation.name }}
        </h3>
        <h3 class="heading-mobile">
          Про фільм
        </h3>
        <div class="description-items">
          <div class="item" v-if="filmInformation.originalName">{{ this.filmInformation.originalName }}</div>
          <div class="item" v-if="filmInformation.genre">{{ this.filmInformation.genre }}</div>
          <div class="item" v-if="filmInformation.director">{{ this.filmInformation.director }}</div>
          <div class="item" v-if="filmInformation.date">{{ this.filmInformation.date }} </div>
          <div class="item" v-if="filmInformation.country"> {{ this.filmInformation.country }}</div>
          <div class="item" v-if="filmInformation.duration">{{ this.filmInformation.duration }}</div>
        </div>
        <div class="information-description" >
          <p class="information-description__text">
            {{ this.filmInformation.description_full.trim() }}
          </p>
        </div>
        <div class="voice" v-if="filmInformation.voice">{{ this.filmInformation.voice }}</div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      filmInformation: {
        type: Object,
        required: true
      },
      showDescriptionEvent: {
        type: Function,
        required: true,
        default: () => []
      },
      hideDescriptionEvent: {
        type: Function,
        required: true,
        default: () => []
      }
    },
    data () {
      return {
        isDescriptionCollapsed: true
      }
    },
    methods: {
      showDescription () {
        this.isDescriptionCollapsed = false
        this.showDescriptionEvent()
      },
      hideDescription () {
        this.isDescriptionCollapsed = true
        this.hideDescriptionEvent()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../../styles/partials/variables';

  .information-heading {
    font-weight: 600;
    color: #fff;
    letter-spacing: 1px;
    text-align: left;
    margin: 0;
    padding: 0;
  }

  .preview-web {
    display: none;
  }

  .description {
    padding: 24px 18px 24px;
    width: 100%;
    max-width: 700px;
  }

  .description-block {
    cursor: pointer;
  }

  .heading {
    margin-bottom: 18px;
    text-align: center;
  }

  .information {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    height: 100%;
  }

  .description-open, .description-close {
    display: none;
  }

  .description-items {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    font-weight: 500;
    font-size: .8em;
    letter-spacing: 0.02em;
    line-height: 15px;
    text-align: left;
    color: #969696;
    margin-top: 12px;

    .item {
      margin-bottom: 8px;
      margin-right: 16px;
    }
  }

  .information-description__text {
    font-size: 1em;
    line-height: 1.6em;
    padding: 0px 12px 0px 0;
    white-space: pre-line;
  }

  .heading-desktop {
    display: none;
  }

  .heading-mobile {
    text-align: center;
  }

  .voice {
    color: #6f6f6f;
    font-weight: 500;
  }

  @media screen and (min-width: 960px) {
    .description-items {
      flex-flow: row wrap;

      .item {
        max-width: 200px;
      }
    }

    .heading-desktop {
      display: block;
    }

    .heading-mobile {
      display: none;
    }
    .description {
      padding: 40px 16px 40px 54px;
    }

    .information {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      margin: auto;
      z-index: 100;
      transform: translate3d(0, 0, 0);
      transition: all 400ms ease-in-out;
      background-color: #fff;
    }

    .information--collapsed {
      transform: translate3d(-100%, 0, 0);
    }

    .information-description {
      flex: 1;
      color: #000;
      overflow-y: scroll;
      transition: all 350ms ease-in-out;
    }

    .description-open, .description-close {
      display: block;
    }

    .description-open {
      position: absolute;
      top: 150px;
      right: -75px;
      transform: rotate(90deg);
      font-weight: 600;
      font-size: .9em;
      cursor: pointer;
      background-color: rgba($blue, .9);
      color: #fff;
      padding: 8px 18px 4px 12px;
      border-radius: 0;
      transition: all 350ms ease;

      &:hover {
        background-color: rgba(blue, 1);
      }
    }

    .description-close {
      position: absolute;
      top: 130px;
      left: -22px;
      transform: rotate(90deg);
      font-weight: 600;
      font-size: .9em;
      cursor: pointer;
      background-color: rgba(#000000, .8);
      color: #fff;
      padding: 8px 18px 4px 12px;
      border-radius: 0;
      transition: all 350ms ease;

      &:hover {
        background-color: rgba(#000000, 1);
      }
    }

    .information-description__items {
      list-style: none;
      margin: 0 0 12px;
      font-size: 12px;
      padding: 0;
    }

    .information-description__item {
      display: flex;

      .label {
        font-weight: 600;
        margin-right: 4px;
      }
    }

    .information-description__text {
      font-size: 1.2em;
      line-height: 1.6em;
      padding: 0px 12px 24px 0;
      white-space: pre-line;
    }

    .information--collapsed {
      .information-description {
        max-height: 0;
        overflow: hidden;
        padding: 0;
      }
    }
  }

  .description--collapsed {
    max-height: 0;
  }
</style>
