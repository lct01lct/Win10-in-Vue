import Whats from './index.vue';
import WhatsIcon from './public/logo.png';
import { AppOrigin } from 'win';
import 'win/dist/style.css';

export default {
  icon: WhatsIcon,
  name: 'whats',
  bodyComp: Whats,
} as AppOrigin;
