<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div class="sn-h1">
          Icons
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8">
        <p class="sn-body-2">
          SNUI icons are SVG icons selected and created by our UX team. These icons are supported by Vuetify's <code>v-icon</code> component.
          An example use case may look something like:
        </p>
        <p class="sn-body-2">
          <code>{{ exampleIcon }}</code>
        </p>
        <p class="sn-body-2">
          Below is a list of all icons currently available along with it's icon name. If one you need is not listed below, you can follow the
          steps outlined in
          <a
            href="https://simplenexus.atlassian.net/wiki/spaces/SIM/pages/2609217607/How+to+add+a+new+Icon+to+the+SNUI+library"
            target="_blank"
            class="sn-font-primary"
          >
            this confluence article
          </a>
          to add the additional icon to the project.
        </p>
      </v-col>
    </v-row>
    <v-row
      wrap
    >
      <v-col
        v-for="icon of icons"
        :key="icon"
        cols="2"
        class="sn-text-primary mt-5"
        style="text-align: center;"
      >
        <v-icon
          align-self="center"
          size="30"
          class="sn-text-primary"
          :style="iconStyles"
        >
          {{ `$${icon}` }}
        </v-icon>
        <div class="mt-1">
          ${{ icon }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Icons',
  props: {
    primaryColor: {
      type: String,
      default: 'snPrimary'
    },
    secondaryColor: {
      type: String,
      default: 'snBrand'
    }
  },
  data () {
    return {
      exampleIcon: '<v-icon>$snAirplane</v-icon>'
    }
  },
  computed: {
    icons () {
      return Object.keys(this.$vuetify.icons.values).filter(icon => /^sn/.test(icon))
    },
    primaryColorHex () {
      return this.getColorHex(this.primaryColor)
    },
    secondaryColorHex () {
      return this.getColorHex(this.secondaryColor)
    },
    iconStyles () {
      var styles = {}
      if (this.primaryColorHex) { styles['--primary-color'] = this.primaryColorHex }
      if (this.secondaryColorHex) { styles['--secondary-color'] = this.secondaryColorHex }
      return styles
    }
  },
  methods: {
    getColorHex (color) {
      if (!color) { return null }
      if (!this.$vuetify?.theme?.themes?.light) { return null }
      var colorHex = this.$vuetify.theme.themes.light[color]
      if (!colorHex) { return null }
      return colorHex
    }
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/css/index.scss';
</style>
