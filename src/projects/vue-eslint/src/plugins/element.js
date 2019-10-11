import Vue from 'vue';
import { Button, Switch } from 'element-ui';
import './element-variable.scss';

Vue.use(Button);
Vue.use(Switch);
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
