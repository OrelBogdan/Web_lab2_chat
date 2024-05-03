/*import { createApp } from "vue";
import aboutme from "./myaccount.vue";

const app = createApp(aboutme);

app.mount("#root-app")*/

import { createApp } from "vue";
import aboutme from "./myaccount.vue";

import store from '../../store'

const app = createApp(aboutme);

app.use(store)

app.mount("#root-app")
