<template>
<div class="sn-avatar-wrapper">
  <div class="sn-avatar">
    <img v-if="image" :src="image" :alt="imageAlt" class="sn-avatar-content sn-avatar--img"  />
    <sn-icon v-else-if="icon" :name="icon"  class="sn-avatar-content sn-avatar--icon" />
    <span v-else-if="name" class="sn-avatar-content sn-avatar--text">{{initials}}</span>
  </div>
</div>
</template>

<script>
import SnIcon from '../SnIcon/SnIcon'
export default {
  name: 'SnAvatar',
  components: { SnIcon },
  props: {
    icon: {
      type: String,
      default: '',
      required: false
    },
    image: {
      type: String,
      default: '',
      required: false
    },
    imageAlt: {
      type: String,
      default: 'Avatar Image',
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    useFullInitials: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    initials () {
      if (this.useFullInitials && this.name.split(' ').length > 1) {
        return this.name.split(' ').map(name => name.charAt(0)).join('')
      } else {
        return this.name.charAt(0)
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-avatar
    font-family $font-family
    font-weight $font-weight-medium
    font-size 20px
    height 60px
    width 60px
    text-align center

  .sn-avatar-content
    height 100%
    width 100%
    display flex
    background-color $sn-black
    color $sn-white
    border-radius 50%
    justify-content center
    align-items center
</style>
