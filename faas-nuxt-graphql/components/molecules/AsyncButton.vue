<template>
  <app-button :class="buttonClass"
              @click="$emit('click')">
    <slot />
  </app-button>
</template>

<script>
import AppButton from '@/components/atoms/AppButton'

export default {
  components: {
    AppButton
  },
  props: {
    loading: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    buttonClass() {
      return this.loading ? 'is-loading' : ''
    }
  }
}
</script>

<style>
</style>
