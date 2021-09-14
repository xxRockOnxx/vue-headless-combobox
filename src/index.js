import ComboBox from "./ComboBox.vue";
import ComboBoxLabel from "./Label.vue";
import ComboBoxSuggestions from "./Suggestions.vue";
import ComboBoxSuggestion from "./Suggestion.vue";
import ComboBoxTextbox from "./Textbox.vue";

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component("ComboBox", ComboBox);
  Vue.component("ComboBoxLabel", ComboBoxLabel);
	Vue.component("ComboBoxSuggestions", ComboBoxSuggestions);
	Vue.component("ComboBoxSuggestion", ComboBoxSuggestion);
	Vue.component("ComboBoxTextbox", ComboBoxTextbox);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;

if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(plugin);
}

export {
  ComboBox,
  ComboBoxLabel,
  ComboBoxSuggestion,
  ComboBoxSuggestions,
  ComboBoxTextbox,
};
