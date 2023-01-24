import { createApp } from 'vue'
import App from './App.vue'

// Styles
import './assets/styles/variables.sass'
import './assets/styles/helpers.sass'
import './assets/styles/global.sass'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
