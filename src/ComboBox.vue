<template>
  <div
    role="combobox"
    aria-haspopup="listbox"
    :aria-expanded="isOpen"
    :aria-owns="`${listboxId}-suggestions`"
  >
    <slot />
  </div>
</template>

<script>
import { generateId } from "./util";

export default {
  props: {
    suggestions: {
      type: Array,
      default: () => [],
    },

    value: {
      type: String,
      default: () => "",
    },

    open: {
      type: Boolean,
      default: () => false,
    },
  },

  data() {
    return {
      listboxId: generateId(),
      focusedIndex: null,
    };
  },

  watch: {
    open() {
      this.focusedIndex = null;
    },

    suggestions() {
      this.focusedIndex = null;
    },
  },

  computed: {
    isOpen() {
      return this.open && this.suggestions.length > 0;
    },
  },

  provide() {
    return {
      listboxId: this.listboxId,

      getQuery: () => this.value,
      setQuery: (query) => this.$emit("input", query),

      isOpen: () => this.isOpen,
      getSuggestions: () => this.suggestions,
      selectSuggestion: (suggestion) => this.$emit("selected", suggestion),

      getFocusedIndex: () => this.focusedIndex,
      setFocusedIndex: (index) => (this.focusedIndex = index),
    };
  },
};
</script>
