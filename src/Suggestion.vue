<template>
  <li
    role="option"
    :id="id"
    @click="selectSuggestion(suggestion)"
  >
    <slot />
  </li>
</template>

<script>
export default {
  props: {
    index: {
      required: true,
      type: Number,
    },

    suggestion: {
      required: true,
      type: String,
    }
  },

  inject: [
    'listboxId',
    'selectSuggestion',
  ],

  computed: {
    id() {
      return `${this.listboxId}-option-${this.index}`;
    },
  },
};
</script>
