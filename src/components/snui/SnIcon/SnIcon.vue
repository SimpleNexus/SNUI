<template>
<i :class="`sn-icon sn-icon-${name}`"/>
</template>

<script>
export default {
  name: 'SnIcon',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">
.sn-icon
  display inline-block
</style>
