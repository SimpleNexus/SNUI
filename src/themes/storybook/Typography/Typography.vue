<template>
  <section class="sn-font-standard" >
    <table>
      <tr class="row">
        <th class="sn-headline">Class</th>
        <th class="sn-headline">Name</th>
        <th class="sn-headline">Size</th>
        <th class="sn-headline">Line Height</th>
      </tr>
      <tr v-for="(level, i) in levels" :key="i + 'level'" class="row">
        <td class="col">
          {{level.cssClass}}
        </td>
        <td :class="[level.cssClass, fontWeightClass, font]" class="col">
          {{level.text}}
        </td>
        <td class="col">
          {{level.size}}
        </td>
        <td class="col">
          {{level.height}}
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  name: 'Typography',
  props: {
    condensed: {
      type: Boolean,
      required: false,
      default: false
    },
    fontWeight: {
      type: String,
      required: false,
      default: 'regular'
    }
  },
  data () {
    return {
      levels: [
        {
          cssClass: 'sn-display-1',
          text: 'Display 1',
          size: '80px',
          height: '84px'
        },
        {
          cssClass: 'sn-display-2',
          text: 'Display 2',
          size: '60px',
          height: '64px'
        },
        {
          cssClass: 'sn-display-3',
          text: 'Display 3',
          size: '48px',
          height: '48px'
        },
        {
          cssClass: 'sn-large-title',
          text: 'Large Title',
          size: '34px',
          height: '41px'
        },
        {
          cssClass: 'sn-title-1',
          text: 'Title 1',
          size: '28px',
          height: '34px'
        },
        {
          cssClass: 'sn-title-2',
          text: 'Title 2',
          size: '22px',
          height: '25px'
        },
        {
          cssClass: 'sn-title-3',
          text: 'Title 3',
          size: '20px',
          height: '25px'
        },
        {
          cssClass: 'sn-headline',
          text: 'Headline',
          size: '17px',
          height: '22px'
        },
        {
          cssClass: 'sn-body',
          text: 'Body',
          size: '17px',
          height: '22px'
        },
        {
          cssClass: 'sn-callout',
          text: 'Callout',
          size: '16px',
          height: '21px'
        },
        {
          cssClass: 'sn-subhead',
          text: 'Subhead',
          size: '15px',
          height: '20px'
        },
        {
          cssClass: 'sn-footnote',
          text: 'Footnote',
          size: '13px',
          height: '18px'
        },
        {
          cssClass: 'sn-caption-1',
          text: 'Caption 1',
          size: '12px',
          height: '16px'
        },
        {
          cssClass: 'sn-caption-2',
          text: 'Caption 2',
          size: '11px',
          height: '13px'
        }
      ]
    }
  },
  computed: {
    font () {
      return this.condensed ? 'sn-font-condensed' : ''
    },
    fontWeightClass () {
      return `sn-font-weight-${this.fontWeight}`
    }
  }
}
</script>

<style scoped lang="stylus">
  table
    border-collapse collapse

  .row
    padding 8px
    border-bottom 1px solid $sn-black-lighten-3

  .col
    padding 18px
</style>
