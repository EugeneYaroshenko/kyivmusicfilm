<template>
  <div class="main__film-info">
    <div class="preview-image__container">
      <div class="preview-image">
        <img
          class="image"
          src="../../assets/images/preview__image.jpg"
          alt="preview image"
        >
        <div class="preview-image__overflow" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style>

  .main__film-info {
    width: 100%;
    max-width: 28%;
  }

  .preview-image {
    position: relative;
  }

  .image {
    margin: 0;
    display: block;
    padding: 0;
    max-width: 100%;
  }

  .preview-image__overflow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #141E30;
    background: linear-gradient(to top, rgba(0, 51, 69, .8), transparent);
    cursor: pointer;
  }
</style>
