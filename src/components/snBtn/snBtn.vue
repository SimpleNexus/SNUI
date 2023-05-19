<template>
<!-- BTN should have these properties
    :data-cy="(dataCy || formattedText)"
    :data-pendo="(dataPendo || formattedText) + '-btn'"
 -->
  <v-btn
    ref="button"
    v-bind="vuetifyOverrideMixin.bindings"
    class="sn-btn"
    :class="[btnType, btnSize, hoverLock]"
    :loading="type !== 'text' && loading"
    :depressed="type === 'text'"
    :elevation="type === 'text' ? 0 : undefined"
    :outlined="type === 'secondary'"
    :text="type === 'text'"
    v-on="$listeners"
    @click="click"
  >
    <v-icon
      v-if="prependIcon"
      class="sn-btn-prepend-icon"
      :style="iconSize ? `height: ${iconSize}px !important; width: ${iconSize}px !important; font-size: ${iconSize}px !important;` : ''"
    >
      {{ prependIcon }}
    </v-icon>
    <span
      v-if="text"
      :class="`${textSize} sn-btn-text`"
      style="padding-bottom: 2px"
    >
      {{ formattedText }}
    </span>
    <v-icon
      v-if="!prependIcon && (dropdown || appendIcon)"
      class="sn-btn-append-icon"
      :style="dropdownIconStyle"
    >
      {{ dropdown ? '$snDownTriangleFilled' : appendIcon }}
    </v-icon>
    <sn-shadow
      v-if="showDropdown"
      ref="dropdown"
      class="sn-btn--dropdown"
      :class="{ 'dropdown-inverted': invertDropdown }"
    >
      <ul
        class="sn-btn--dropdown-list px-0 py-2 ma-0"
        data-cy="sn-btn-dropdown"
      >
        <li
          v-for="(option, index) in dropdownOptions"
          :key="index"
          class="sn-btn--dropdown-list-item sn-body-1"
          :class="{ 'disabled': option.disabled }"
          @click="handleItemClick(option)"
        >
          <div v-if="!option.disabled || !option.disabledMsg">
            <v-icon
              v-if="option.icon"
              class="mr-8"
              style="color: rgba(0, 0, 0, 0.54)"
            >
              {{ option.icon }}
            </v-icon>
            {{ option.label || option }}
          </div>

          <sn-tooltip
            v-if="option.disabled && option.disabledMsg"
            :direction="disabledTooltipDirection"
          >
            <template #activator>
              <div>
                <v-icon
                  v-if="option.icon"
                  class="mr-8"
                >
                  {{ option.icon }}
                </v-icon>
                {{ option.label || option }}
              </div>
            </template>

            {{ option.disabledMsg }}
          </sn-tooltip>
        </li>
      </ul>
    </sn-shadow>
  </v-btn>
</template>

<script>
import { VIcon, VBtn } from 'vuetify/lib'
import snTooltip from '../snTooltip/snTooltip.vue'
import snShadow from '../snShadow/snShadow.vue'
// import { cypressMixin } from '../mixins/cypressMixin'
// import { pendoMixin } from '~/components/snui/v2/mixins/pendoMixin'
import vuetifyOverrideMixin from '../../mixins/vuetifyOverrideMixin.vue'
export default {
  name: 'SnBtn',
  components: {
    snShadow,
    snTooltip
  },
  // mixins: [cypressMixin, pendoMixin, vuetifyOverrideMixin],
  mixins: [vuetifyOverrideMixin],
  props: {
    text: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Defines the type of the button. Must be one of the following:
     * 'primary' | 'secondary' | 'text'
     **/
    type: {
      type: String,
      default: 'primary',
      validator (type) {
        return ['primary', 'secondary', 'text'].includes(type)
      }
    },
    /**
     * Defines the size of the button. Must be one of the following:
     * 'small' | 'standard' | 'large' | 'x-large' | 'full-width' (mobile)
     **/
    size: {
      type: String,
      default: 'x-large',
      validator (size) {
        return ['small', 'standard', 'large', 'x-large', 'full-width'].includes(size)
      }
    },
    prependIcon: {
      type: String,
      default: null
    },
    appendIcon: {
      type: String,
      default: null
    },
    iconSize: {
      type: Number,
      default: 18
    },
    loading: {
      type: Boolean,
      default: false
    },
    warning: {
      type: Boolean,
      default: false
    },
    dropdown: {
      type: Boolean,
      default: false
    },
    dropdownOptions: {
      type: Array,
      default: () => []
    },
    textCase: {
      type: String,
      default: 'sentence',
      required: false,
      validator (textCase) {
        return ['uppercase', 'title', 'sentence', 'no-format', ''].includes(textCase)
      }
    },
    textSize: {
      type: String,
      default: '',
      required: false,
      validator (textSize) {
        return ['sn-body-1', 'sn-body-2', ''].includes(textSize)
      }
    },
    disabledTooltipDirection: {
      type: String,
      required: false,
      default: 'left',
      validator (direction) {
        return ['top', 'right', 'bottom', 'left'].includes(direction)
      }
    }
    // Underlined prop is removed because functionality for having the
    // text underlined is handled below
  },
  data () {
    return {
      showDropdown: false,
      invertDropdown: false,
      vuetifyOverrideMixin: {
        overriddenProps: {
          ripple: false
        }
      }
    }
  },
  computed: {
    adjustedSize () {
      let size = this.size
      if (this.type === 'text') {
        if (size !== 'small') size = 'standard' // text button sizes only have small and standard
      }
      return size
    },
    dropdownIconStyle () {
      return (this.dropdown && this.showDropdown) ? 'transform: rotate(180deg);' : ''
    },
    btnType () {
      const type = [`sn-btn--${this.type}`]

      // 1. Text button type w/ icon = only underline on hover
      // 2. Text button type w/out icon = underline text
      if (this.type === 'text') {
        const hasIcon = this.prependIcon || this.appendIcon

        if (hasIcon) {
          type.push('sn-text-btn--hover-underlined')
        } else {
          type.push('sn-text-btn--underlined')
        }
        if (hasIcon || this.dropdown) {
          type.push('sn-text-btn--icon')
        }
      }
      if (this.warning) {
        type.push('sn-btn--warning')
      }
      if (this.loading) {
        type.push('sn-btn--loading')
      }
      if (this.dropdown) {
        type.push('sn-btn--dropdown')
      }
      return type
    },
    btnSize () {
      const size = []
      if (this.type === 'text') {
        size.push(`sn-text-btn--${this.adjustedSize}`)
      } else {
        size.push(`sn-btn--${this.adjustedSize}`)
      }
      return size
    },
    formattedText () {
      // the formatting cannot use lodash because it will break any html tags or symbols
      const value = this.text
      switch (this.textCase) {
        case 'uppercase':
          return value.toUpperCase()

        case 'title':
          return value.replace(
            /\w\S*/g,
            function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            }
          )

        case 'sentence':
          return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()

        default:
          return value
      }
    },
    hoverLock () {
      return this.dropdown && this.showDropdown && this.type !== 'text' ? 'hover-lock' : ''
    }
  },
  created () {
    if (this.dropdown) {
      document.addEventListener('click', this.clickAway)
    }
  },
  beforeDestroy () {
    if (this.dropdown) {
      document.removeEventListener('click', this.clickAway)
    }
  },
  methods: {
    click () {
      if (this.dropdown) {
        const buttonBotPos = this.$el.getBoundingClientRect().bottom
        const menuHeight = 45 * this.dropdownOptions.length
        const screenBotPos = window.scrollY + window.innerHeight

        this.invertDropdown = (buttonBotPos + menuHeight) > screenBotPos
        this.showDropdown = !this.showDropdown
      }
    },
    clickAway (event) {
      if (this.showDropdown) {
        const { clientX, clientY } = event

        if (!this.$refs.button || !this.$refs.dropdown) {
          return
        }
        const buttonBounds = this.$refs.button.$el.getBoundingClientRect()
        const dropdownBounds = this.$refs.dropdown.$el.getBoundingClientRect()

        if (!this.isWithin(clientX, clientY, dropdownBounds) && !this.isWithin(clientX, clientY, buttonBounds)) {
          this.showDropdown = !this.showDropdown
        }
      }
    },
    handleItemClick (option) {
      if (option.disabled) return

      this.$emit('click', option.value || option)
    },
    isWithin (clientX, clientY, bounds) {
      if (clientX >= bounds.x && clientX <= (bounds.x + bounds.width)) {
        if (clientY >= bounds.y && clientY <= (bounds.y + bounds.height)) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/index.scss';

.disabled {
  color: $sn-gray-04;
  background-color: $sn-white !important;
}

/* default btn styles */
.theme--light.v-btn {
  box-shadow: none;

  &.sn-btn {
    border-radius: 2px;
    box-sizing: border-box;
    color: $sn-white;
    flex: none;
    flex-grow: 0;
    order: 1;
    padding: 16px 40px 16px 40px;
    text-align: center;
    text-transform: none;
    transition: background-color .2s ease-in-out;
    transition: box-shadow .2s ease-in-out;

    .sn-btn--dropdown {
      border-radius: 0;
      max-width: none;
      min-width: 311px;
      position: absolute;
      width: auto;
      z-index: 999;

      &-list {
        display: inline-block;
        list-style-type: none;
        text-align: left;
        width: 100%;

        &-item {
          white-space: nowrap;
          padding: 10px 16px;
          margin-left: -1px;
          line-height: 24px;

          &:hover {
            background: rgba(15, 95, 94, 0.05);
          }
        }
      }
    }

    &:hover {
      box-shadow: $sn-shadow-depth-4 !important;
    }

    // primary button hover/pressed color states
    &.sn-btn--primary {
      background-color: $sn-primary !important;

      &:hover {
        background-color: $sn-primary-04 !important;
        &:before {
          opacity: 0 !important;
        }
      }

      &:active {
        background-color: $sn-primary-02 !important;
        &:before {
          opacity: 0 !important;
        }
      }

      &.sn-btn--warning:not(.v-btn--disabled) {
        background-color: $sn-error-03 !important;

        &:hover {
          background-color: $sn-error-04 !important;
        }

        &:active {
          background-color: $sn-error-02 !important;
        }
      }
    }

    // secondary button hover/pressed color states
    &.sn-btn--secondary {
      background-color: transparent;
      color: $sn-primary;

      &:hover {
        background-color: $sn-primary-04 !important;
        &:before {
          opacity: 0 !important;
        }

        ::v-deep .v-btn__content {
          color: $sn-white !important;
        }
      }

      &:active {
        background-color: $sn-primary-02 !important;
        &:before {
          opacity: 1 !important;
        }

        ::v-deep .v-btn__content {
          color: $sn-white !important;
        }
      }

      ::v-deep .v-btn__content .v-icon {
        transition: none;
      }

      &.sn-btn--warning:not(.v-btn--disabled) {
        color: $sn-error-03 !important;

        &:hover {
          background-color: $sn-error-04 !important;
        }

        &:active {
          background-color: $sn-error-02 !important;
        }
      }
    }

    // text button styles
    &.sn-btn--text {
      height: fit-content !important;
      width: fit-content !important;
      min-width: auto !important;
      padding: 0 1px 0 1px !important;
      color: $sn-primary !important;

      &.v-btn--disabled {
        color: $sn-gray-04 !important;
      }

      &.sn-primary--text {
        color: $sn-primary;
      }

      .sn-btn-append-icon, .sn-btn-prepend-icon, span.sn-btn-text {
        padding-bottom: 2px;
      }

      &.sn-text-btn--underlined {
        span.sn-btn-text {
          padding-bottom: 1px !important;
          border-bottom: 1px solid $sn-gray-04;
          border-radius: 0 !important;
          transition: border-bottom-color 280ms ease-in-out;
        }
        &.sn-text-btn--icon {
          span.sn-btn-text {
            border-bottom-color: transparent;
          }
        }
      }

      &.sn-text-btn--hover-underlined {
        &:hover, &:focus {
          span.sn-btn-text {
            padding-bottom: 1px !important;
            border-bottom: 1px solid $sn-gray-04;
            border-radius: 0 !important;
            transition: border-bottom-color 280ms ease-in-out;
          }
        }
      }

      &.sn-btn--warning:not(.sn-btn--disabled) {
        color: $sn-error-03 !important;

        &.sn-text-btn--underlined {
          span.sn-btn-text {
            padding-bottom: 1px !important;
            border-bottom: 1px solid $sn-error-02;
            border-radius: 0 !important;
            transition: border-bottom-color 280ms ease-in-out;
          }
          &.sn-text-btn--icon {
            span.sn-btn-text {
              border-bottom-color: transparent;
            }
          }
          &:hover {
            span.sn-btn-text {
              padding-bottom: 1px !important;
              border-bottom: 1px solid $sn-error-03;
              border-radius: 0 !important;
              transition: border-bottom-color 280ms ease-in-out;
            }
          }
        }

        &.sn-text-btn--hover-underlined {
          &:hover {
            span.sn-btn-text {
              padding-bottom: 1px !important;
              border-bottom: 1px solid $sn-error-03;
              border-radius: 0 !important;
              transition: border-bottom-color 280ms ease-in-out;
            }
          }
        }
      }

      // text button hover/pressed color states and underline states
      &:hover, &:focus {
        color: $sn-primary-04;
        box-shadow: none !important;

        span.sn-btn-text {
          border-bottom-color: $sn-primary-04;
        }
      }

      &:active {
        color: $sn-primary-02;

        span.sn-btn-text {
          border-bottom-color: $sn-primary-02;
        }
      }

      &:before {
        display: none;
      }
    }

    // small button styles
    &.sn-btn--small {
      height: 28px;
      min-width: 80px;
      padding: 5px 12px 5px 12px;
      font-size: 15px !important;
      line-height: 18px !important;
    }

    // standard button styles
    &.sn-btn--standard {
      height: 36px;
      min-width: 96px;
      padding: 6px 16px 6px 16px;
    }

    // large button styles
    &.sn-btn--large {
      height: 48px;
      min-width: 128px;
      padding: 12px 16px 12px 16px;

      .sn-btn--dropdown {
        top: 36px;
        right: -15px;
        &.dropdown-inverted {
          top: initial;
          bottom: 36px;
        }
      }
    }

    // xl button styles
    &.sn-btn--x-large {
      height: 56px;
      min-width: 200px;
      padding: 16px 40px 16px 40px;

      .sn-btn--dropdown {
        top: 40px;
        right: -40px;
      }
    }

    // full width button styles
    &.sn-btn--full-width {
      height: 56px;
      min-width: 200px;
      width: 100%;
      padding: 16px 40px 16px 40px;

      .sn-btn--dropdown {
        top: 40px;
        right: -40px;
      }
    }

    // small text button
    &.sn-text-btn--small {
      font-size: 15px !important;
      line-height: 18px !important;
    }

    &.sn-btn--small, &.sn-text-btn--small {
      .sn-btn--dropdown {
        top: 25px;
        right: -12px;
      }
    }

    &.sn-btn--standard, &.sn-text-btn--standard {
      .sn-btn-prepend-icon, .sn-btn-append-icon {
        width: 18px !important;
        height: 18px !important;
        font-size: 18px !important;
      }

      .sn-btn--dropdown {
        top: 30px;
        right: -15px;

        &.dropdown-inverted {
          top: initial;
          bottom: 30px;
        }
      }
    }

    // loading styles
    &.sn-btn--loading {
      background-color: $sn-primary-02 !important;
      &.sn-btn--warning {
        background-color: $sn-error-02 !important;
      }
    }

    // disabled style for primary and secondary buttons
    &.sn-btn--primary, &.sn-btn--secondary {
      &.v-btn--disabled {
        background-color: $sn-gray-04 !important;
        color: $sn-white !important;
        border-color: $sn-gray-04 !important;

        .sn-btn-prepend-icon, .sn-btn-append-icon {
          color: $sn-white !important;
        }
      }
    }
  }
}

.sn-btn-prepend-icon, .sn-btn-append-icon {
  width: 24px;
  height: 24px;
  font-size: 24px;
  padding-bottom: 0px;
}

.sn-btn-prepend-icon {
  margin-right: 6px;
  // no right margin if there is no text to the right
  &:last-child {
    margin-right: 0px;
  }
}

.sn-btn-append-icon {
  margin-left: 6px;
}

::v-deep .v-progress-circular {
  width: 18px !important;
  height: 18px !important;

  circle {
    stroke: $sn-gray-03 !important;
  }
}

.hover-lock {
  background-color: $sn-primary-04 !important;
  color: $sn-white !important;
}

</style>
