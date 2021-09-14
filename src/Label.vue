<template>
  <label :id="id">
    <slot />
  </label>
</template>

<script>
export default {
  inject: ['listboxId'],

  computed: {
    id() {
      return `${this.listboxId}-label`
    }
  }
}
</script>
