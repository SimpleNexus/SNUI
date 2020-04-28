<template>
  <main class="snui">
    <section class="description">
      <h2 class="sn-title-1 sn-text-primary">Helper Classes</h2>
      <p class="sn-body">
        SNUI provides color helper classes nested under the top-level
        class <code>snui</code>.

        These helper classes are in the following format:

      <pre>sn-text-{colorName}</pre>
      <pre>sn-background-{colorName}</pre>

      These colors can be modified by appending a <code>--lighten-{level}</code> to the end of the class name.
      For example:
      <pre>
        class="sn-text-primary sn-background-warning--lighten-4"
      </pre>
      You can find the color names and the lightness variants in the swatches below.
      </p>
      <h3 class="sn-title-2">Remember: These classes must exist as children to the <code>snui</code> class or the styles will not be applied</h3>
    </section>
    <section
      v-for="color in colors"
      :key="color.name"
      :id="color.name"
      class="sn-text-white"
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
        class="accent sn-title-1 sn-background-accent sn-text-white"
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
          main: '#EC7000',
          light1: '#F19440',
          light2: '#F5B77F',
          light3: '#FADBBF',
          light4: '#FEF1E6'
        },
        {
          name: 'success',
          main: '#22A969',
          light1: '#5ABF8F',
          light2: '#90D4B4',
          light3: '#C8E9D9',
          light4: '#E9F7F0'
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

    .description
      display flex
      width 100%
      flex-direction column
</style>
