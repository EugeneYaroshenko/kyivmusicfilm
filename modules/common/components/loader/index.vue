<template>
  <div class="loader-container" ref="loaderContainer" :class="{'loader-container--hidden': loadingFinished}">
    <div class="loader-background" ref="loaderBackground" :class="{'loader-background--finished': loadingFinished}">
      <div class="stripe stripe-main"></div>
      <div class="stripe stripe-secondary"></div>
      <div class="stripe stripe-main"></div>
      <div class="stripe stripe-secondary"></div>
      <div class="stripe stripe-main"></div>
      <div class="stripe stripe-secondary"></div>
      <div class="stripe stripe-main"></div>
      <div class="stripe stripe-secondary"></div>
      <div class="stripe stripe-main"></div>
      <div class="stripe stripe-secondary"></div>
      <div class="stripe stripe-main"></div>
    </div>
    <div class="loader-block" ref="loaderBlock" >
      <svg viewBox="0 0 401.02 467.9" width="100%" height="100%" class="loader" :class="{'loader--finished': loadingFinished}">
        <g id="fe9bc707-a879-4f52-aa09-8698281c2c72">
          <g class="word" ref="kyiv">
          <path d="M28,0V41.07h.3L48.94,0H78.62l-27,46.77L81.92,107H50.14L33.8,69.71,28,78.7V107H.07V0Z"
                stroke="#fcfcfc" stroke-miterlimit="10"/>
          <path d="M79.07,0H109.2l10.5,37.33h.3L130.49,0h30.58L133.79,64.91V107H105.91V64.91Z"
                stroke="#fcfcfc" stroke-miterlimit="10"/>
          <path d="M195.25,0V107H167.37V0Z" stroke="#fcfcfc" stroke-miterlimit="10"/>
          <path d="M231.38,0l11.24,80.65h.3L254.16,0h29.69L260.76,107h-36L202.15,0Z" stroke="#fcfcfc"
                stroke-miterlimit="10"/>
          </g>
          <g class="word" ref="music">
            <path d="M40,179.89,51.19,243.3h.3l11.24-63.41h39.88v107H76.52V207.17h-.3L61.38,286.92H41.29L26.45,207.17h-.3v79.75H.07v-107Z"
                  stroke="#dbdbdb" stroke-miterlimit="10"/>
            <path d="M144.43,257.09q0,7.8,2.25,10.42a8.52,8.52,0,0,0,12.29,0q2.25-2.62,2.25-10.42v-77.2H189.1v70.16q0,11.24-2.39,18.74a28.9,28.9,0,0,1-7,12,23.8,23.8,0,0,1-11.32,6.14,66,66,0,0,1-15.59,1.65,66.27,66.27,0,0,1-15.52-1.65,23.76,23.76,0,0,1-11.39-6.14,28.69,28.69,0,0,1-7-12q-2.4-7.5-2.4-18.74V179.89h27.88Z"
                  stroke="#dbdbdb" stroke-miterlimit="10"/>
            <path d="M245.77,208.22a16.07,16.07,0,0,0-2-8.17,6.45,6.45,0,0,0-6-3.37q-4.5,0-6.6,2.92a10.91,10.91,0,0,0-2.1,6.52,10.68,10.68,0,0,0,3.37,8.32,31.24,31.24,0,0,0,8.47,5.33q5.1,2.23,10.95,4.57a48.81,48.81,0,0,1,10.94,6.07,30.1,30.1,0,0,1,8.47,9.82q3.38,6.06,3.37,15.81,0,17.1-9.74,24.81t-28.18,7.72a74.14,74.14,0,0,1-15.37-1.42,27.54,27.54,0,0,1-11.24-4.95,22.21,22.21,0,0,1-7-9.22,36.33,36.33,0,0,1-2.4-14.09v-3.75h27v2.55q0,6.9,2.55,9.67a8.55,8.55,0,0,0,6.6,2.77,7.94,7.94,0,0,0,6.67-3,11.63,11.63,0,0,0,2.32-7.35,10.94,10.94,0,0,0-3.22-8.32,28.34,28.34,0,0,0-8.1-5.25q-4.87-2.16-10.57-4.42A46.58,46.58,0,0,1,213.46,236a28.78,28.78,0,0,1-8.09-9.44q-3.23-5.85-3.22-15.29,0-16.33,8.69-24.89t26.39-8.54q18.28,0,26.46,7.87t8.16,25.11H245.77Z"
                  stroke="#dbdbdb" stroke-miterlimit="10"/>
            <path d="M314.43,179.89v107H286.54v-107Z" stroke="#dbdbdb" stroke-miterlimit="10"/>
            <path d="M370.49,200a6.16,6.16,0,0,0-5.84-3.3,7.35,7.35,0,0,0-5,1.65c-1.25,1.1-2.19,3-2.84,5.84a63.24,63.24,0,0,0-1.28,11.32q-.3,7.13-.3,17.92t.3,17.91a63.12,63.12,0,0,0,1.28,11.32c.65,2.8,1.59,4.75,2.84,5.85a7.34,7.34,0,0,0,5,1.64,6.66,6.66,0,0,0,4.19-1.27,8.19,8.19,0,0,0,2.55-4.27,38.93,38.93,0,0,0,1.28-8q.36-5,.37-12.67h27v7.94q0,11.25-3,18.44a28.8,28.8,0,0,1-7.95,11.32,26.42,26.42,0,0,1-11.32,5.55,59.91,59.91,0,0,1-13.11,1.42q-11.7,0-19.19-2.84a23.21,23.21,0,0,1-11.7-9.52q-4.2-6.68-5.77-17.24a176.94,176.94,0,0,1-1.57-25.56,152.54,152.54,0,0,1,1.87-25.94q1.88-10.64,6.37-17.24a25.49,25.49,0,0,1,11.85-9.52q7.33-2.91,18.14-2.92a47.17,47.17,0,0,1,16,2.4,25.66,25.66,0,0,1,16.71,17.46,48.55,48.55,0,0,1,1.87,14v6.75h-27v-6Q372.29,203.29,370.49,200Z"
                  stroke="#dbdbdb" stroke-miterlimit="10"/>
          </g>
          <g class="word" ref="film">
            <path d="M63.41,359.86v22.79H27.88v18.29H61.16v21.88H27.88V466.9H0v-107Z" stroke="#fcfcfc"
                  stroke-miterlimit="10"/>
            <path d="M101.94,359.86v107H74.06v-107Z" stroke="#fcfcfc" stroke-miterlimit="10"/>
            <path d="M145,359.86v84.25h34.33V466.9H117.08v-107Z" stroke="#fcfcfc" stroke-miterlimit="10"/>
            <path d="M228.31,359.86l11.24,63.41h.3l11.25-63.41H291v107H264.89V387.14h-.3L249.75,466.9H229.66l-14.84-79.76h-.3V466.9H188.43v-107Z"
                  stroke="#fcfcfc" stroke-miterlimit="10"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
  import TweenMax from 'gsap/umd/TweenMax'
  import TimelineMax from 'gsap/umd/TimelineMax'
  import EasePack from 'gsap/umd/EasePack'

  export default {
    props: {
      fetched: {
        type: Boolean,
        required: false,
        default: false
      },
      loading: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    data () {
      return {
        loadingAnimation: null,
        loadingFinished: false
      }
    },
    watch: {
      fetched: function (newVal) {
        if (newVal) {
          setTimeout(() => {
            this.stopLoading()
          }, 4000)
        }
      }
    },
    mounted () {
      this.startLoadingAnimation()

      setTimeout(() => {
        this.stopLoading()
      }, 4000)
    },
    methods: {
      stopLoading () {
        this.loadingAnimation.kill()
        this.loadingFinished = true

        const t = new TimelineMax()
        //
        t.to(
          this.$refs.loaderBlock,
          0.8,
          {
            transform: 'translateY(0)',
            ease: EasePack.Sine.easeOut
          }
        )

        t.to(
          this.$refs.loaderBlock,
          0.6,
          {
            transform: 'translateY(100%)',
            opacity: 0,
            ease: EasePack.Power3.easeIn
          }
        )
      },
      startLoadingAnimation () {
        if (process.browser) {
          const t = new TimelineMax({ repeat: -1 })

          t.add(TweenMax.to(
            this.$refs.kyiv,
            0.8,
            {
              fill: '#ffffff',
              ease: EasePack.Sine.easeOut
            },
          ), 'kyiv')

          t.add(TweenMax.to(
            this.$refs.kyiv,
            0.1,
            {
              fill: 'transparent',
              ease: EasePack.Sine.linear
            },
          ), 'music')

          t.add(TweenMax.to(
            this.$refs.music,
            0.8,
            {
              fill: '#ffffff',
              ease: EasePack.Sine.easeOut
            },
          ), 'music')

          t.add(TweenMax.to(
            this.$refs.music,
            0.1,
            {
              fill: 'transparent',
              ease: EasePack.Sine.linear
            },
          ), 'film')

          t.add(TweenMax.to(
            this.$refs.film,
            0.8,
            {
              fill: '#ffffff',
              ease: EasePack.Sine.easeOut
            },
          ), 'film')

          t.add(TweenMax.to(
            this.$refs.film,
            0.1,
            {
              fill: 'transparent',
              ease: EasePack.Sine.linear
            },
          ), 'kyiv')

          this.loadingAnimation = t
        }
      }
      // slideUp () {
      //   const t = new TimelineMax()
      //
      //   t.to(
      //     this.$refs.upSquare,
      //     4,
      //     {
      //       x: 9475,
      //       y: -8000,
      //       ease: EasePack.Sine.easeIn
      //     },
      //   )
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .loader-background {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    flex-flow: row wrap;

    .stripe {
      flex: 1;
      min-width: 100%;
      background-color: black;
    }

    .stripe-secondary {
      background-color: black;
      transition: all 600ms ease-out;
      position: relative;
      z-index: 1;
      box-shadow: 0 0 8px 0 rgba(255, 255, 255, 0)
    }
  }

  .loader-block {
    padding: 64px 24px 120px;
    height: 90%;
    max-height: 600px;
    left: 10%;
    position: absolute;
    bottom: 0;
    transform: translateY(100px);
    background-color: black;
    width: 70%;
    min-width: 200px;
    max-width: 600px;
    box-shadow: 2px 2px 16px 0 rgba(0, 0, 0, .8);
    z-index: 2;
  }

  .loader-background--finished {
    .stripe-secondary {
      background-color: white;
      box-shadow: 0 0 8px 0 rgba(255, 255, 255, .8);
      animation: moveRight 1.4s ease-in 1s forwards;
    }

    .stripe-main {
      animation: moveLeft 1.4s ease-in 1s forwards;
    }
  }

  .loader--finished .word {
    fill: white !important;
  }

  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    margin: auto;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    z-index: 10000;
  }

  .loader-container--hidden {
    animation: fadeOut 1.4s ease-in 1.3s forwards;
  }

  .square-secondary {
    opacity: 0;
  }

  .loader {
    width: 100%;
    height: 100%;
  }

  @keyframes moveRight {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(120%, 0, 0);
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      visibility: visible;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes moveLeft {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-120%, 0, 0);
    }
  }

  @media screen and (min-width: 700px) {
    .loader-block {
      padding: 64px 54px 160px;
      height: 90%;
      max-height: 1000px;
    }
  }
</style>
