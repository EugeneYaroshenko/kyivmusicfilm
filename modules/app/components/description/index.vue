<template>
    <div :class="{'information': true, 'information--hidden': isPopupHidden }">
      <div class="description">
        <div class="description-block" @click="toggleDescription">
          <div class="description__toggle-icon" :class="{'close-icon': !isDescriptionCollapsed}"/>
          <h4 class="information-heading">
            Про Фільм
          </h4>
        </div>
        <div class="information-description" :class="{'description--collapsed': isDescriptionCollapsed}">
          <p class="information-description__text">
            {{ this.filmDescription }}
          </p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      filmDescription: {
        type: String,
        required: true
      },
      isPopupHidden: {
        type: Boolean,
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
    background-color: yellow;
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
    padding: 14px 8px 8px 40px;
    background-color: #000;
    position: relative;
  }

  .description__toggle-icon {
    height: 40px;
    width: 40px;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .description__toggle-icon {
    width: 40px;
    height: 40px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: .8;
    cursor: pointer;
    padding: 8px;
    background-image: url('../../../../assets/icons/toggleIcon.svg');
    &:hover {
      opacity: 1;
    }
  }

  .close-icon {
    transform: rotate(180deg);
  }

  .description-block {
    cursor: pointer;
  }

  @media screen and (min-width: 960px) {
    .information-heading--mobile {
      display: none;
    }

    .preview-web {
      display: block;
    }

    .information {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      flex-flow: row nowrap;
      width: 45%;
      height: auto;
      min-height: 40px;
      max-height: 45%;
      overflow: hidden;
      margin: auto;
      z-index: 200;
      border-radius: 20px 0 0 0;
    }

    .information-description {
      flex: 1;
      color: #fff;
      max-height: 300px;
      overflow-y: scroll;
      transition: all 350ms ease-in-out;
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
      font-size: 14px;
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
