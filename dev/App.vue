<template>
  <div class="min-h-screen container p-10 mx-auto">
    <ComboBox
      ref="combobox"
      v-model="query"
      :suggestions="suggestions"
      :open="showSuggestions"
      @selected="selectSuggestion"
    >
      <form action="#">
        <ComboBoxLabel>
          <span class="sr-only">Type to search products...</span>

          <ComboBoxTextbox
            class="w-full border p-4"
            placeholder="Type to search products..."
            @focus.native="showSuggestions = true"
          />
        </ComboBoxLabel>
      </form>

      <ComboBoxSuggestions
        ref="suggestions"
        class="w-full py-2 mt-2 bg-white rounded-xl border shadow-lg"
      >
        <ComboBoxSuggestion
          slot-scope="{ suggestion, index, isFocused }"
          class="w-full px-5 py-3 cursor-pointer"
          :class="{
            'bg-gray-200': isFocused,
            'hover:bg-gray-100': !isFocused,
          }"
          v-text="suggestion"
          :suggestion="suggestion"
          :index="index"
        />
      </ComboBoxSuggestions>
    </ComboBox>
  </div>
</template>

<script>
import {
  ComboBox,
  ComboBoxLabel,
  ComboBoxTextbox,
  ComboBoxSuggestions,
  ComboBoxSuggestion,
} from "../src";

export default {
  components: {
    ComboBox,
    ComboBoxLabel,
    ComboBoxTextbox,
    ComboBoxSuggestions,
    ComboBoxSuggestion,
  },

  data() {
    return {
      query: "",
      showSuggestions: false,
      suggestions: [],
      skipSearch: false,
    };
  },

  watch: {
    query(newVal) {
      if (this.skipSearch) {
        return;
      }

      if (!newVal || !newVal.trim()) {
        this.suggestions = [];
      } else {
        // This part can also be async if you have an API for searching.
        const suggestions = ["Apple", "Banana", "Grapes", "Orange"];

        this.suggestions = suggestions.filter((suggestion) => {
          return suggestion.toLowerCase().startsWith(newVal.toLowerCase())
        });

        this.showSuggestions = true;
      }
    },
  },

  mounted() {
    // Close ComboBox if user clicked outside the component.
    // You have complete control whether you want combobox open or not.
    document.body.addEventListener("click", (evt) => {
      if (!this.$refs.combobox.$el.contains(evt.target)) {
        this.showSuggestions = false
      }
    })
  },

  methods: {
    selectSuggestion(suggestion) {
      // Prevent searching again after the query is updated.
      // In this demo, if you type "a" and selected "Apple"
      this.skipSearch = true;

      this.query = suggestion;
      this.showSuggestions = false;

      // Wait for the new input to be rendered before allowing searches.
      this.$nextTick(() => {
        this.skipSearch = false
      })
    },
  },
};
</script>
