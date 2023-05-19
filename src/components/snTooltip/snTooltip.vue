<template>
  <v-tooltip
    v-bind="effectiveBindings"
    v-on="$listeners"
  >
    <template v-slot:activator="{on, attrs}">
      <div
        v-bind="attrs"
        v-on="on"
      >
        <slot name="activator" />
      </div>
    </template>
    <slot />
  </v-tooltip>
</template>

<script>
import { VTooltip } from 'vuetify/lib'
import vuetifyOverrideMixin from '../../mixins/vuetifyOverrideMixin.vue'

const DIRECTIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right'
}

export default {
  name: 'SnTooltip',
  components: {
    VTooltip
  },
  mixins: [vuetifyOverrideMixin],
  props: {
    direction: {
      default: 'top',
      validator: (val) => {
        return Object.values(DIRECTIONS).includes(val)
      }
    }
  },
  data () {
    return {
      DIRECTIONS,
      vuetifyOverrideMixin: {
        overriddenProps: {
          absolute: false,
          activator: undefined,
          color: '#1F1F1F',
          internalActivator: false,
          nudgeBottom: 0,
          nudgeLeft: 0,
          nudgeRight: 0,
          nudgeTop: 0,
          nudgeWidth: 0,
          offsetOverflow: false,
          openOnClick: false, // Confluence design docs state that a popup opens on click and a tooltip opens on hover and focus
          openOnFocus: true,
          openOnHover: true,
          positionX: undefined,
          positionY: undefined,
          transition: undefined,
          zIndex: 300
        },
        silencedPropWarnings: ['activator']
      }
    }
  },
  computed: {
    effectiveBindings () {
      return {
        ...this.vuetifyOverrideMixin.bindings,
        ...this.directionOverride,
        contentClass: this.caretDirection
      }
    },
    caretDirection () {
      switch (this.direction) {
        case DIRECTIONS.TOP:
          return 'tooltip-top'
        case DIRECTIONS.BOTTOM:
          return 'tooltip-bottom'
        case DIRECTIONS.LEFT:
          return 'tooltip-left'
        case DIRECTIONS.RIGHT:
          return 'tooltip-right'
        default:
          return ''
      }
    },
    directionOverride () {
      return {
        top: this.direction === DIRECTIONS.TOP,
        bottom: this.direction === DIRECTIONS.BOTTOM,
        left: this.direction === DIRECTIONS.LEFT,
        right: this.direction === DIRECTIONS.RIGHT
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';

  // Convoluted css is required to make the caret properly.
  // There is a feature request for this exact issue on the vuetify repo here https://github.com/vuetifyjs/vuetify/issues/12939 but there hasn't been a PR to add the functionality yet.

  .tooltip-top::before {
    border-right: solid 10px transparent;
    border-left: solid 10px transparent;
    transform: translateX(-50%);
    position: absolute;
    z-index: 21;
    content: '';
    top: 100%;
    left: 50%;
    height: 0;
    width: 0;
  }

  .tooltip-top::before{
    border-top: solid 8px $sn-primary-03 !important;
  }

  .tooltip-bottom::before{
    border-right: solid 10px transparent;
    border-left: solid 10px transparent;
    transform: translateX(-50%);
    position: absolute;
    z-index: 21;
    content: '';
    bottom: 100%;
    left: 50%;
    height: 0;
    width: 0;
  }

  .tooltip-bottom::before{
    border-bottom: solid 8px $sn-primary-03 !important;
  }

  .tooltip-right::before{
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -10px;
    border-width: 10px;
    border-style: solid;
    border-top: solid 10px transparent;
    border-bottom: solid 10px transparent;
    border-left: solid 10px transparent;
  }

  .tooltip-right::before{
    border-right: solid 8px $sn-primary-03 !important;
  }

  .tooltip-left::before{
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -10px;
    border-width: 10px;
    border-style: solid;
    border-top: solid 10px transparent;
    border-bottom: solid 10px transparent;
    border-right: solid 10px transparent;
  }

  .tooltip-left::before{
    border-left: solid 8px $sn-primary-03 !important;
  }
</style>
