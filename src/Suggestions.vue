<template>
  <ul
    v-show="isOpen()"
    :id="id"
    :aria-labelledby="labelledById"
  >
    <template v-for="(suggestion, index) in getSuggestions()">
      <slot
        :suggestion="suggestion"
        :index="index"
        :isFocused="isFocused(index)"
      />
    </template>
  </ul>
</template>

<script>
export default {
  inject: [
    'listboxId',
    'getSuggestions',
    'isOpen',
    'getFocusedIndex',
    'setFocusedIndex',
    'setQuery',
  ],

  computed: {
    id() {
      return `${this.listboxId}-suggestions`
    },

    labelledById() {
      return `${this.listboxId}-label`
    },
  },

  methods: {
    isFocused(index) {
      return this.getFocusedIndex() === index
    },

    onMouseOut() {
      this.setFocusedIndex(null)
    }
  }
}
</script>
