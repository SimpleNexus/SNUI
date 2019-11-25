<template>
<i :class="`sn-icon-${name}`"></i>
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

<style scoped>

</style>
