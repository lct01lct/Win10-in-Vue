import Office from './index.vue';
import OfficeIcon from './public/logo.png';
import { AppOrigin } from 'win';
import 'win/dist/style.css';

export default {
  icon: OfficeIcon,
  name: 'office',
  bodyComp: Office,
} as AppOrigin;
