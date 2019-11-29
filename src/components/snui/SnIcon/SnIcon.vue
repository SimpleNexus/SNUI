<template>
<i :class="iconClasses"/>
</template>

<script>
export default {
  name: 'SnIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    },
    medium: {
      type: Boolean,
      required: false,
      default: false
    },
    large: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    iconClasses () {
      return ['sn-icon', `sn-icon-${this.name}`].concat(this.getSizeClasses())
    }
  },
  mounted () {
    console.log(this.iconClasses)
  },
  methods: {
    getSizeClasses () {
      const sizeModifiers = {
        '--small': this.small,
        '--medium': this.medium,
        '--large': this.large
      }
      const sizeClasses = Object.entries(sizeModifiers)
        .reduce((prev, [cssClass, value]) => value ? [...prev, 'sn-icon' + cssClass] : prev, [])

      return sizeClasses.length ? sizeClasses : ['sn-icon--medium']
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-icon
  display inline-block
  &--small
    font-size $font-size-subhead
  &--medium
    font-size $font-size-body
  &--large
    font-size $font-size-large-title
</style>
