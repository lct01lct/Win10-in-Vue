import Telegram from './index.vue';
import TelegramIcon from './public/logo.png';
import { AppOrigin } from 'win';
import 'win/dist/style.css';

export default {
  icon: TelegramIcon,
  name: 'telegram',
  bodyComp: Telegram,
} as AppOrigin;
