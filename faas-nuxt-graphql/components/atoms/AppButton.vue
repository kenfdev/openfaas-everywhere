<template>
  <a class="button"
     @click="$emit('click')">
    <slot />
  </a>
</template>

<script>
export default {}
</script>

<style>
</style>
