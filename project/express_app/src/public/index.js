//полифилы
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
//наш код
import {Shop} from './js/vue-main'
import './css/style.css'





//создаем инстанс компонента Shop
Vue.createApp(Shop).mount('#app')