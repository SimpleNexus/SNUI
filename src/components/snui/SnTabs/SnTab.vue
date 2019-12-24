<template>
<li>
  {{text}}
</li>
</template>

<script>
export default {
  name: 'SnTab',
  props: {
    text: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
