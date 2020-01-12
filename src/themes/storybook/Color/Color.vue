<template>
  <main class="snui sn-text-white">
    <section
      v-for="color in colors"
      :key="color.name"
      :id="color.name"
    >
      <div
        class="swatch sn-title-1"
        :class="`sn-background-${color.name}`"
      >
        <h2 class="sn-title-1">
          {{color.name}}
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color}})
        </span>
        <span class="sn-headline">
          Hex: {{color.color | rgbToHex}}
        </span>
      </div>
      <div
        class="swatch lighten sn-title-2"
        :class="`sn-background-${color.name}--lighten-1 `"
      >
        <h2 class="sn-title-2">
          Lighten 1
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color | lighten1}})
        </span>
        <span class="sn-headline">
          Hex: {{color.color | lighten1 | rgbToHex}}
        </span>
      </div>
      <div class="swatch lighten sn-title-2"
           :class="`sn-background-${color.name}--lighten-2 `"
      >
        <h2 class="sn-title-2">
          Lighten 2
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color | lighten2}})
        </span>
        <span class="sn-headline">
          Hex: {{color.color | lighten2 | rgbToHex}}
        </span>
      </div>
      <div class="swatch lighten sn-title-2 sn-text-primary--lighten-3"
           :class="`sn-background-${color.name}--lighten-3 `"
      >
        <h2 class="sn-title-2">
          Lighten 3
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color | lighten3}})
        </span>
        <span class="sn-headline">
          Hex: {{color.color | lighten3 | rgbToHex}}
        </span>
        </div>
    </section>
  </main>
</template>

<script>
import { rgbToHex } from '../../../util/colorUtils'

export default {
  name: 'Color',
  filters: {
    rgbToHex,
    lighten1 (color) {
      return color + ', 0.75'
    },
    lighten2 (color) {
      return color + ', 0.50'
    },
    lighten3 (color) {
      return color + ', 0.25'
    },
    disabled (color) {
      return color + ', 0.2'
    }
  },
  data () {
    return {
      colors: [{
        name: 'primary',
        color: '255, 255, 255'
      }, {
        name: 'secondary',
        color: '155, 155, 155'
      },
      {
        name: 'warning',
        color: '212, 64, 17'
      },
      {
        name: 'caution',
        color: '242, 159, 90'
      },
      {
        name: 'success',
        color: '36, 212, 154'
      },
      {

        name: 'accent',
        color: '254, 186, 1'
      }
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
main
  display flex
  flex-direction row
  flex-wrap wrap
  section
    margin 24px 16px
    h2
      margin-bottom 8px
      margin-top 4px
    span
      margin-top 4px
    .swatch
      display flex
      flex-direction column
      padding 10px
      border-radius 8px
      text-transform uppercase
      width 600px
      height 100px
    .lighten
      margin-top 4px
</style>
