<template>
  <div class="select">
    <select :value="value"
            @input="onChange">
      <option v-for="(option, index) in options"
              :key="index">{{ option }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onChange(ev) {
      this.$emit('input', ev.target.value)
    }
  }
}
</script>

<style>
</style>
