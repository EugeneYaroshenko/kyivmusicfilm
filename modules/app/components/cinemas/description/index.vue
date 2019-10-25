<template>
    <div :class="{'information': true, 'information--collapsed': isDescriptionCollapsed }">
      <div class="description-open" @click="toggleDescription">Опис Фільму</div>
      <div class="description-close" @click="toggleDescription">Сеанси</div>
      <div class="description">
        <h3 class="heading">
          Опис фільму
        </h3>
        <div class="information-description" >
          <p class="information-description__text">
            {{ this.filmInformation.description_full }}
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      filmInformation: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        isDescriptionCollapsed: true
      }
    },
    methods: {
      toggleDescription () {
        this.isDescriptionCollapsed = !this.isDescriptionCollapsed
      },
    }
  }
</script>

<style lang="scss" scoped>
  .information {
    width: 70%;
    margin: 0 auto;
  }

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
  }

  .description-block {
    cursor: pointer;
  }

  .heading {
    text-align: center;
    margin-bottom: 18px;
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

  @media screen and (min-width: 960px) {
    .description {
      padding: 14px 8px 8px 40px;
      background-color: #fff;
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
    }

    .information--collapsed {
      transform: translate3d(-100%, 0, 0);
    }

    .information-description {
      flex: 1;
      color: #000;
      overflow-y: scroll;
      transition: all 350ms ease-in-out;
      padding: 0 40px;
    }

    .description-open, .description-close {
      display: block;
    }

    .description-open {
      position: absolute;
      top: 150px;
      right: -77px;
      transform: rotate(90deg);
      font-weight: 600;
      font-size: .9em;
      cursor: pointer;
      background-color: rgba(#0000ff, .9);
      color: #fff;
      padding: 8px 18px 4px 12px;
      border-radius: 0px 24px 0 0;
      transition: all 350ms ease;

      &:hover {
        background-color: rgba(#0000ff, .9);
        box-shadow: 2px 2px 8px 0 rgba(#0000ff, 1)
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
      border-radius: 0px 24px 0 0;
      transition: all 350ms ease;

      &:hover {
        background-color: rgba(#000000, 1);
        box-shadow: 2px 2px 8px 0 rgba(#0000ff, .4)
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
      padding: 24px 12px 24px 0;
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
