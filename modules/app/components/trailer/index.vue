<template>
  <div
    class="play-icon"
    ref="iconContainer"
    @click="showTrailerContainer"
  >
    <icon
      view-box="0 0 160.2 176.8"
      size="80px"
      ref="playIcon"
    >
      <play-button />
    </icon>
    <no-ssr>
    <div
      class="trailer-block"
      ref="trailerBlock"
    >
      <youtube
        :video-id="trailerID"
        ref="youtube"
        :fit-parent="true"
      />
    </div>
    </no-ssr>
    <div
      class="trailer-close"
      ref="trailerClose"
      @click="hideTrailerContainer"
    >
      <div class="trailer-close__icon" />
    </div>
  </div>
</template>

<script>
  import Icon from '~/components/app/elements/icon'
  import PlayButton from '~/assets/icons/vueIcons/playButton'
  import TimelineMax from 'gsap/umd/TimelineMax'
  import EasePack from 'gsap/umd/EasePack'
  import TweenMax from 'gsap/umd/TweenMax'
  import { getIdFromUrl } from 'vue-youtube'

  export default {
    props: {
      hideTrailer: {
        type: Function,
        required: true,
        default: null
      },
      showTrailer: {
        type: Function,
        required: true,
        default: null
      },
      trailer: {
        type: String,
        required: false,
        default: ''
      }
    },
    data () {
      return {
        trailerShown: false
      }
    },
    components: {
      Icon,
      PlayButton
    },
    // methods: {
    //   hideTrailer () {
    //     return this.$store.dispatch('ui/hideTrailer')
    //   }
    // },
    methods: {
      // stopPlayer () {
      //   this.player.stopVideo()
      // },
      showTrailerContainer () {
        if (!this.trailerShown) {
          this.showTrailer()

          const t = new TimelineMax()

          t.add(TweenMax.set(this.$refs.playIcon, { opacity: 0 }))

          t.add(TweenMax.to(
            this.$refs.iconContainer,
            0.6,
            {
              maxHeight: '100%',
              maxWidth: '100%',
              borderRadius: '0',
              ease: EasePack.Sine.easeIn
            }
          ))

          t.add(TweenMax.to(
            this.$refs.trailerBlock,
            { display: 'block' }
          ))

          t.add(TweenMax.to(
            this.$refs.trailerBlock,
            0.8,
            {
              opacity: 1,
              visibility: 'visible',
              transform: 'translate3d(0, 0, 0)',
              ease: EasePack.Sine.easeOut
            }
          ))

          t.add(TweenMax.to(
            this.$refs.trailerClose,
            0.4,
            {
              transform: 'translate3d(0, 0, 0)',
              ease: EasePack.Sine.easeOut
            }
          ))

          this.trailerShown = true
          this.player.playVideo()
        }
      },
      hideTrailerContainer ($e) {
        $e.preventDefault()
        $e.stopPropagation()
        const t = new TimelineMax()

        t.add(TweenMax.to(
          this.$refs.trailerClose,
          0.4,
          {
            transform: 'translate3d(-100%, 0, 0)',
            ease: EasePack.Sine.easeIn
          }
        ))

        t.add(TweenMax.to(
          this.$refs.trailerBlock,
          0.8,
          {
            opacity: 0,
            visibility: 'hidden',
            transform: 'translate3d(0, -10%, 0)',
            ease: EasePack.Sine.easeOut
          }
        ))

        t.add(TweenMax.to(
          this.$refs.iconContainer,
          0.6,
          {
            maxHeight: '160px',
            maxWidth: '144px',
            borderRadius: '40px 0 0 40px',
            ease: EasePack.Sine.easeIn
          }
        ))

        this.hideTrailer()
        this.player.stopVideo()
        this.trailerShown = false
      }
    },
    computed: {
      trailerID () {
        return getIdFromUrl(this.trailer)
      },
      player () {
        return this.$refs.youtube.player
      }
      // trailerLink () {
      //   const updatedTrailerLink = this.trailer.includes('watch?v=') ? this.trailer.replace('watch?v=', 'embed/') : this.trailer
      //   return `${updatedTrailerLink}?autoplay=1&enablejsapi=1&version=3`
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../styles/partials/variables';

  .play-icon {
    height: 100%;
    width: 100%;
    max-height: 160px;
    max-width: 144px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    top: 0;
    bottom: 0;
    margin: auto 0;
    position: absolute;
    right: 0;
    border-radius: 40px 0 0 40px;
    background-image: url('../../../../assets/images/trailerBackground.svg');
    background-size: cover;
    background-position: right center;
    background-attachment: fixed;
    box-shadow: -2px 0 8px 0 rgba(0, 0, 0, .3);
    overflow: hidden;

    svg {
      transition: all 350ms ease-in-out;
      fill: $white;
    }
  }

  .play-icon:hover {
    svg {
      fill: $blue;
    }
  }

  .trailer {
    width: 100%;
    height: 100%;
    display: block;
    border: 0;
    border-radius: 24px;
    background: #000;
    max-width: 1500px;
  }

  .icon-container {
    padding: 16px 0 16px 8px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: -48px;
    left: 0;
    fill: #000;
  }

  .trailer-block {
    position: absolute;
    height: 90%;
    width: 90%;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transform: translate3d(0, -10%, 0);
  }

  .trailer-close {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    left: 0;
    width: 120px;
    height: 100px;
    background-color: darken($blue, 40%);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 24px;
    border-radius: 0 32px 32px 0;
    transform: translate3d(-100%, 0, 0);
    box-shadow: 2px 0 8px 0 rgba(0, 0, 0, .3);
    cursor: pointer;

    &:hover {
      .trailer-close__icon {
        opacity: 1;
      }
    }
  }

  .trailer {
    height: 100%;
    width: 100%;
  }

  .trailer-close__icon {
    background-image: url('../../../../assets/icons/exit-icon.svg');
    background-size: contain;
    height: 54px;
    width: 54px;
    background-position: center;
    opacity: .7;
  }

  iframe {
    width: 100%;
    height: 100%;
  }
</style>
