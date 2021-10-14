<template>
  <input
    v-model="query"
    type="text"
    aria-autocomplete="list"
    :aria-controls="controlsId"
    :aria-activedescendant="activeDescendantId"
    @keydown="onKeydown"
  />
</template>

<script>
export default {
  inject: [
    'listboxId',
    'getQuery',
    'setQuery',
    'getSuggestions',
    'selectSuggestion',
    'getFocusedIndex',
    'setFocusedIndex',
  ],

  computed: {
    controlsId() {
      return `${this.listboxId}-suggestions`
    },

    activeDescendantId() {
      if (this.getFocusedIndex() === null) {
        return null
      }

      return `${this.listboxId}-option-${this.getFocusedIndex()}`
    },

    query: {
      get() {
        return this.getQuery()
      },
      set(value) {
        this.setQuery(value)
      }
    }
  },

  methods: {
    onKeydown(evt) {
      switch (evt.key) {
        case "ArrowDown":
          evt.preventDefault();
          this.focusNext();
          break;
        case "ArrowUp":
          evt.preventDefault();
          this.focusPrevious();
          break;
        case "Enter":
          this.selectFocused(evt);
          break;
        case "Escape":
          this.query = "";
          break;
      }
    },

    focusNext() {
      const suggestionsLength = this.getSuggestions().length;

      if (suggestionsLength === 0) {
        return;
      }

      const currentIndex = this.getFocusedIndex();

      if (currentIndex === null) {
        this.setFocusedIndex(0);
      } else {
        // Upon reaching the end of the suggestions, the next focusedIndex will be 0 again.
        this.setFocusedIndex((currentIndex + 1) % suggestionsLength);
      }
    },

    focusPrevious() {
      const suggestionsLength = this.getSuggestions().length;

      if (suggestionsLength === 0) {
        return;
      }

      const currentIndex = this.getFocusedIndex();

      if (currentIndex === null) {
        this.setFocusedIndex(suggestionsLength - 1);
      } else {
        // Upon reaching the beginning of the suggestions, the next focusedIndex will be the last index.
        this.setFocusedIndex((currentIndex + suggestionsLength - 1) % suggestionsLength);
      }
    },

    selectFocused(evt) {
      if (this.getFocusedIndex() === null) {
        return
      }

      evt.preventDefault();
      this.selectSuggestion(this.getSuggestions()[this.getFocusedIndex()]);
    },
  },
};
</script>
