<template>
  <nav class="navigation">
    <div class="navigation-block">
      <div class="navigation-block__logo" />
      <div class="navigation-block__icons">
        <icon
          class="icon"
          size="16px"
          viewBox="0 0 7.496 14.993"
          icon-name="facebook"
        >
          <facebook/>
        </icon>
        <icon
          class="icon"
          size="16px"
          viewBox="0 0 14.992 14.993"
          icon-name="messenger"
        >
          <messenger/>
        </icon>

        <icon
          class="icon"
          size="16px"
          viewBox="0 0 21.807 14.993"
          icon-name="youtube"
        >
          <youtube />
        </icon>
        <icon
          class="icon"
          size="16px"
          viewBox="0 0 15.025 15.025"
          icon-name="instagram"
        >
          <instagram />
        </icon>
      </div>
    </div>
  </nav>
</template>

<script>
  import Icon from '~/components/icon'
  import Facebook from '~/assets/icons/vueIcons/facebook'
  import Messenger from '~/assets/icons/vueIcons/messenger'
  import Youtube from '~/assets/icons/vueIcons/youtube'
  import Instagram from '~/assets/icons/vueIcons/instagram'

  export default {
    components: {
      Icon,
      Facebook,
      Messenger,
      Youtube,
      Instagram
    }
  }
</script>

<style>
  nav {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 80px;
    padding: 18px 12px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .navigation-block {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
  }

  .navigation-block__logo {
    background-size: contain;
    background-position: center;
    background-image: url('../../assets/icons/logo.svg');
    height: 40px;
    width: 40px;
    cursor: pointer;
  }

  .navigation-block__icons {
    display: flex;
    align-items: center;
    flex-flow: column nowrap;
    flex: 1;
    justify-content: center;
  }

  .icon {
    margin: 12px;
    cursor: pointer;
    fill: #6F6F6F;
  }
</style>
