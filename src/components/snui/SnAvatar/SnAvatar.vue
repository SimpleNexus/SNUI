<template>
<div class="sn-avatar-wrapper">
  <div :class="avatarClasses"  :style="avatarSize">
    <img v-if="useImage" :src="validatedImage" :alt="imageAltText" class="sn-avatar-content sn-avatar--img" @error="loadDefaultImage" />
    <i v-else-if="icon"  class="sn-avatar-content sn-avatar--icon" :class="avatarIconClasses"/>
    <span v-else-if="name" class="sn-avatar-content sn-avatar--text">{{initials}}</span>
  </div>
</div>
</template>

<script>
export default {
  name: 'SnAvatar',
  props: {
    /**
     * Name of the icon to use in the avatar
     */
    icon: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Image source url for avatar
     * If the image fails to load, the avatar will fallback to using initials if present,
     * otherwise it will render a bundled default avatar image
     */
    image: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Alternate text for avatar img tag
     */
    imageAltText: {
      type: String,
      default: 'Avatar Image',
      required: false
    },
    /**
     * Render large sized avatar
     */
    large: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Render medium sized avatar
     */
    medium: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Render micro sized avatar
     */
    micro: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * Render mini sized avatar
     */
    mini: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * The name of the user. Will be broken up and rendered as initials
     * unless an icon or valid image url is given. If image loading fails,
     * will be used as a fallback to fill the avatar with initials
     */
    name: {
      type: String,
      default: '',
      required: false
    },
    /**
     * Custom size in pixels of the avatar.
     * Named size classes should be preferred to this prop
     * Max 200
     * Min 28
     */
    size: {
      type: Number,
      default: 0,
      required: false
    },
    /**
     * Render small avatar
     */
    small: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
     * When true (default), render the name's full initials
     * as opposed to a single initial when false
     */
    useFullInitials: {
      type: Boolean,
      default: true
    },
    /**
     * Render an xl avatar
     */
    xl: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      validatedImage: this.image,
      useImage: !!this.image
    }
  },
  computed: {
    initials () {
      if (this.useFullInitials && this.name.split(' ').length > 1) {
        const splitInitials = this.name.split(' ').map(name => name.charAt(0))
        return splitInitials.shift() + splitInitials.pop()
      } else {
        return this.name.charAt(0)
      }
    },
    avatarSize () {
      console.log(this.size)
      return this.size ? {
        height: this.size + 'px',
        width: this.size + 'px',
        'font-size': this.size / 2 + 'px'
      } : {}
    },
    avatarClasses () {
      return ['sn-avatar'].concat(this.getSizeClasses())
    },
    avatarIconClasses () {
      return [`sn-icon-${this.icon}`].concat(this.getSizeClasses().map(size => size + '--icon'))
    }
  },
  methods: {
    getSizeClasses () {
      const sizeModifiers = {
        '--xl': this.xl,
        '--large': this.large,
        '--medium': this.medium,
        '--small': this.small,
        '--mini': this.mini,
        '--micro': this.micro
      }

      return Object.entries(sizeModifiers)
        .reduce((prev, [cssClass, value]) => value ? [...prev, 'sn-avatar' + cssClass] : prev, [])
    },
    loadDefaultImage () {
      if (this.initials.length) {
        this.useImage = false
      }
      this.validatedImage = require('../../../assets/images/defaultAvatar.png')
    }
  }
}
</script>

<style scoped lang="stylus">
  iconFontSize(w)
    (w / 1.7)

  textFontSize(w)
    (w / 2)

  .sn-avatar
    font-family $font-family
    font-weight $font-weight-medium
    text-transform uppercase
    width 80px
    height @width
    font-size textFontSize(@width)
    min-height 28px
    min-width 28px
    max-height 200px
    max-width 200px
    text-align center
    border none
    &--icon
      font-size iconFontSize(@width)
    &--xl
      width 200px
      height @width
      font-size textFontSize(@width)
      &--icon
        font-size iconFontSize(@width)
    &--large
      width 150px
      height @width
      font-size textFontSize(@width)
      &--icon
        font-size iconFontSize(@width)
    &--medium
      width 100px
      height @width
      font-size textFontSize(@width)
      &--icon
        font-size iconFontSize(@width)
    &--small
      width 60px
      height @width
      font-size textFontSize(@width)
      &--icon
        font-size iconFontSize(@width)
    &--mini
      width 40px
      height @width
      font-size textFontSize(@width)
      &--icon
        font-size iconFontSize(@width)
    &--micro
      width 28px
      height @width
      font-size textFontSize(@width)
      &--icon
        font-size iconFontSize(@width)

  .sn-avatar-content
    height 100%
    width 100%
    display flex
    background-color $sn-brand
    color $sn-white
    border-radius 50%
    justify-content center
    align-items center
</style>
