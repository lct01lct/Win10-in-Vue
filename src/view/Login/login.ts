import router from '@/router';

const errorTipVisvible = ref<boolean>(false);
const loginIsSuccess = ref<boolean>(true);

const loginForm = reactive({
  username: 'user',
  password: '12345',
});

const login = () => {
  if (checkLoginForm()) {
    router.push({ name: 'Home' });
  } else {
    errorTipVisvible.value = true;
    loginIsSuccess.value = false;
  }
};

const checkLoginForm = (): boolean => {
  if (loginForm.password === '123456' && loginForm.username === 'user') {
    return true;
  }
  return false;
};

const checkError = () => {
  loginIsSuccess.value = true;
};

const maskVisible = ref<boolean>(false);

const gotoLogin = () => {
  maskVisible.value = true;
};

export { errorTipVisvible, login, loginForm, loginIsSuccess, checkError, maskVisible, gotoLogin };
