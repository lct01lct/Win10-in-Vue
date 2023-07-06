import { createPinia } from 'pinia';
import useUserStore from './user';

const store = createPinia();

export default store;
export { useUserStore };
