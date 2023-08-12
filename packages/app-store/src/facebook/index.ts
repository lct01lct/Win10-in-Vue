import Facebook from './index.vue';
import { AppOrigin } from 'win';
import FacebookIcon from './public/logo.png';
import 'win/dist/style.css';

export default {
  bodyComp: Facebook,
  icon: FacebookIcon,
  name: 'facebook',
} as AppOrigin;
