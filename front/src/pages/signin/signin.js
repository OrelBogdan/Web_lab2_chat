/*import { createApp } from "vue";
import signin from "./signin.vue";

const app = createApp(signin);

app.mount("#root-app")*/

import { createApp } from "vue";
import signin from "./signin.vue";

import store from '../../store'

const app = createApp(signin);

app.use(store)

app.mount("#root-app")
