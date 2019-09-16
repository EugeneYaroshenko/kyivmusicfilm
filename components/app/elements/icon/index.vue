<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    :viewBox="viewBox"
    :preserveAspectRatio="preserve"
    role="presentation"
    :stroke="strokeColor"
    :fill="fillColor"
  >
    <title
      :id="iconName"
    >
      {{ iconName }}
    </title>
    <g>
      <slot />
    </g>
  </svg>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      iconName: {
        type: String,
        default: 'icon'
      },
      size: {
        type: [Number, String],
        default: '18px'
      },
      fillColor: {
        type: String,
        default: null
      },
      strokeColor: {
        type: String,
        default: 'transparent'
      },
      viewBox: {
        type: String,
        default: '0 0 18 18'
      },
      preserve: {
        type: String,
        default: 'xMidYMid meet'
      }
    }
  }

</script>
