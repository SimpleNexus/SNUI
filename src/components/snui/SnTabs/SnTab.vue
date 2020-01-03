<template>
  <li
    :class="{
      'sn-tab': true,
      'sn-tab--disabled': disabled
    }"
    @click="!disabled && $emit('click')"
  >
    <a
      :class="{
        'sn-tab-text': true,
        'sn-tab-text--active': active,
        'sn-tab-text--disabled': disabled
      }"
      :to="useRouter && link ? link : undefined"
      :href="!useRouter && link ? link : undefined"
    >
      {{ text }}
      <span
        v-if="hasCount"
        class="sn-tab-count">
    ({{count}})
  </span>
    </a>
  </li>
</template>

<script>
export default {
  name: 'SnTab',
  props: {
    active: {
      type: Boolean,
      default: false,
      required: false
    },
    count: {
      type: [Number, String, undefined],
      default: undefined,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    link: {
      type: String,
      default: '',
      required: false
    },
    text: {
      type: String,
      default: '',
      required: true
    },
    useRouter: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  computed: {
    hasCount () {
      return typeof this.count !== 'undefined'
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-tab
    text-decoration none
    text-transform uppercase
    font-family $font-family
    font-weight $font-weight-regular
    font-size 14px
    line-height 20px
    margin 8px
    &:after
      text-decoration none
    &:hover
      cursor pointer
    &--disabled
      color disable($sn-black-var)
      &:hover
        cursor not-allowed

    .sn-tab-text
      padding-bottom 4px
      &:after
        display block
        content ''
        transition transform 250ms ease-in-out
        transform scaleX(0)
        border-bottom solid 1px #D8D8D8
      &--active:after
        transform scaleX(1)
      &--disabled
        border none

    .sn-tab-count
      color $sn-grey
      letter-spacing 2px
      margin-left 4px
</style>
