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
          {{ color.main | hexToRgb}}
        </span>
        <span class="sn-headline">
          Hex: {{ color.main }}
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
          {{color.light1 | hexToRgb}}
        </span>
        <span class="sn-headline">
          Hex: {{ color.light1}}
        </span>
      </div>
      <div class="swatch lighten sn-title-2"
           :class="`sn-background-${color.name}--lighten-2 `"
      >
        <h2 class="sn-title-2">
          Lighten 2
        </h2>
        <span class="sn-headline">
          {{color.light2 | hexToRgb}}
        </span>
        <span class="sn-headline">
          Hex: {{color.light2}}
        </span>
      </div>
      <div class="swatch lighten sn-title-2 sn-text-primary--lighten-1"
           :class="`sn-background-${color.name}--lighten-3 `"
      >
        <h2 class="sn-title-2">
          Lighten 3
        </h2>
        <span class="sn-headline">
          {{color.light4 | hexToRgb}}
        </span>
        <span class="sn-headline">
          Hex: {{ color.light3}}
        </span>
      </div>
      <div class="swatch lighten sn-title-2 sn-text-primary--lighten-1"
           :class="`sn-background-${color.name}--lighten-4 `"
      >
        <h2 class="sn-title-2">
          Lighten 4
        </h2>
        <span class="sn-headline">
          {{color.light4 | hexToRgb}}
        </span>
        <span class="sn-headline">
          Hex: {{ color.light4}}
        </span>
      </div>
      <div
        v-if="color.light5"
        class="swatch lighten sn-title-2 sn-text-primary--lighten-1"
           :class="`sn-background-${color.name}--lighten-5 `"
      >
        <h2 class="sn-title-2">
          Lighten 5
        </h2>
        <span class="sn-headline">
          {{color.light5 | hexToRgb}}
        </span>
        <span class="sn-headline">
          Hex: {{ color.light5}}
        </span>
      </div>
    </section>
    <section id="action">
      <div
        class="accent sn-title-1 sn-background-accent"
      >
        <h2 class="sn-title-1">
          Accent
        </h2>
        <span class="sn-headline">
          RGB(254, 186, 1)
        </span>
        <span class="sn-headline">
          Hex: #FEBA01
        </span>
      </div>
    </section>
  </main>
</template>

<script>
import { hexToRgb } from '../../../util/colorUtils'

export default {
  name: 'Color',
  filters: { hexToRgb },
  data () {
    return {
      colors: [

        {
          name: 'primary',
          main: '#000000',
          light1: '#404040',
          light2: '#7F7F7F',
          light3: '#bfbfbf',
          light4: '#e5e5e5',
          light5: '#f2f2f2'
        },
        {
          name: 'warning',
          main: '#d44011',
          light1: '#DF704D',
          light2: '#E99F88',
          light3: '#F4cfc3',
          light4: '#faebe7'
        },
        {
          name: 'caution',
          main: '#f29f5a',
          light1: '#f6b783',
          light2: '#f8ceac',
          light3: '#fce7d5',
          light4: '#fdf5ee'
        },
        {
          name: 'success',
          main: '#24d49a',
          light1: '#5bdfb3',
          light2: '#91e9cc',
          light3: '#c8f4e5',
          light4: '#e9faf4'
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
      display flex
      flex-direction row
      border-radius 8px

      h2
        margin-bottom 8px
        margin-top 4px

      span
        margin-top 4px

      .swatch
        display flex
        flex-direction column
        padding 16px
        text-transform uppercase
        width 300px

      .lighten
        width 150px

      .accent
        display flex
        flex-direction column
        width 1032px
        padding 16px
        text-transform uppercase
</style>
