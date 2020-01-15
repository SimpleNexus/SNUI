<template>
  <li
    :class="{
      'sn-tab': true,
      'sn-tab--disabled': disabled
    }"
    @click="handleTabClick"
  >
    <div class="sn-tab-text-wrapper">
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
      </a>
    </div>
    <span
      v-if="hasCount"
      class="sn-tab-count">
    ({{count}})
  </span>
  </li>
</template>

<script>
export default {
  name: 'SnTab',
  props: {
    /**
       * Indicates whether the tab is currently selected
       */
    active: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * Inserted in parentheses after the tab text
       */
    count: {
      type: [Number, String, undefined],
      default: undefined,
      required: false
    },
    /**
       * Disables the tab
       */
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    /**
       * A link or route the tab should navigate to
       */
    link: {
      type: String,
      default: '',
      required: false
    },
    /**
       * The text to be displayed in the tab
       */
    text: {
      type: String,
      default: '',
      required: false
    },
    /**
       * Toggles whether the component should use
       * href or Vue router for the link prop
       */
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
  },
  methods: {
    handleTabClick () {
      // We should only emit if the tab is not disabled
      return !this.disabled && this.$emit('click', arguments)
    }
  }
}
</script>

<style scoped lang="stylus">
  .sn-tab
    text-decoration none
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
      color $sn-black-lighten-3

      &:hover
        cursor not-allowed

    .sn-tab-text-wrapper
      display inline-block

    .sn-tab-text
      &:after
        display block
        content ''
        transition transform 250ms ease-in-out
        transform scaleX(0)
        border-bottom solid 1px $sn-black-lighten-3
        padding-bottom 4px

      &--active
        font-weight $font-weight-medium

        &:after
          transform scaleX(1)

      &--disabled
        border none

    .sn-tab-count
      color $sn-black-lighten-3
      letter-spacing 2px
      margin-left 4px
</style>
