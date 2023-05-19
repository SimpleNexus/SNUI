<template>
  <v-card
    class="pa-0 ma-0"
    :class="`sn-shadow-${computedShadowDepth} sn-shadow--hover-${shadowHoverDepth === null ? computedShadowDepth : shadowHoverDepth}`"
  >
    <slot />
  </v-card>
</template>
<script>
import { VCard } from 'vuetify/lib'

export default {
  name: 'snShadow',
  components: { VCard },

  props: {
    shadowDepth: {
      type: Number,
      required: false,
      default: 1,
      validator: (val) => [null, 0, 1, 2, 3, 4].includes(val)
    },
    shadowHoverDepth: {
      type: Number,
      required: false,
      default: null,
      validator: (val) => [null, 0, 1, 2, 3, 4].includes(val)
    }
  },

  computed: {
    computedShadowDepth () {
      return (this.shadowDepth === null ? 'none' : this.shadowDepth)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.sn-shadow {
  &-none {
    @extend .sn-shadow-depth-0;
  }

  &-0 {
    @extend .sn-shadow-depth-0;
  }

  &-1 {
    @extend .sn-shadow-depth-1;
  }

  &-2 {
    @extend .sn-shadow-depth-2;
  }

  &-3 {
    @extend .sn-shadow-depth-3;
  }

  &-4 {
    @extend .sn-shadow-depth-4;
  }
}

.sn-shadow--hover {
  &-none {
    &:hover {
      @extend .sn-shadow-depth-0;
    }
  }

  &-0 {
    &:hover {
      @extend .sn-shadow-depth-0;
    }
  }

  &-1 {
    &:hover {
      @extend .sn-shadow-depth-1;
    }
  }

  &-2 {
    &:hover {
      @extend .sn-shadow-depth-2;
    }
  }

  &-3 {
    &:hover {
      @extend .sn-shadow-depth-3;
    }
  }

  &-4 {
    &:hover {
      @extend .sn-shadow-depth-4;
    }
  }
}

</style>
