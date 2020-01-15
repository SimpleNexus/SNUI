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
        :ref="color.name + '-main'"
      >
        <h2 class="sn-title-1">
          {{color.name}}
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color}})
        </span>
        <span class="sn-headline">
          Hex: {{ shadeColor(color.color, 0)}}
        </span>
      </div>
      <div
        class="swatch lighten sn-title-2"
        :class="`sn-background-${color.name}--lighten-1 `"
        :ref="color.name + '-lighten-1'"
      >
        <h2 class="sn-title-2">
          Lighten 1
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color}})
        </span>
        <span class="sn-headline">
          Hex: {{ shadeColor(color.color, 25)}}
        </span>
      </div>
      <div class="swatch lighten sn-title-2"
           :class="`sn-background-${color.name}--lighten-2 `"
           :ref="color.name + '-lighten-2'"
      >
        <h2 class="sn-title-2">
          Lighten 2
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color}})
        </span>
        <span class="sn-headline">
          Hex: {{ shadeColor(color.color, 50)}}
        </span>
      </div>
      <div class="swatch lighten sn-title-2 sn-text-primary--lighten-1"
           :class="`sn-background-${color.name}--lighten-3 `"
           :ref="color.name + '-lighten-3'"
      >
        <h2 class="sn-title-2">
          Lighten 3
        </h2>
        <span class="sn-headline">
          RGB: ({{color.color}})
        </span>
        <span class="sn-headline">
          Hex: {{ shadeColor(color.color, 75)}}
        </span>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Color',
  data () {
    return {
      colors: [{
        name: 'primary',
        color: '#000000'
      }, {
        name: 'secondary',
        color: '#9B9B9B'
      },
      {
        name: 'warning',
        color: '#D44011'
      },
      {
        name: 'caution',
        color: '#F29F5A'
      },
      {
        name: 'success',
        color: '#24D49A'
      },
      {

        name: 'accent',
        color: '#FEBA01'
      }
      ]
    }
  },
  methods: {
    shadeColor (color, amount) {
      return '#' + color.replace(/^#/, '').replace(/../g, color => ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2))
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
