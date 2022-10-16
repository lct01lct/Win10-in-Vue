import router from '@/router';
import useUserStore from '@/store/user';
const { username, password } = toRefs(useUserStore());

const errorTipVisvible = ref<boolean>(false);
const loginIsSuccess = ref<boolean>(true);

const loginForm = reactive({
  username: username.value,
  password: '123456',
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
  if (loginForm.password === password.value && loginForm.username === username.value) {
    return true;
  }
  return false;
};

const checkError = () => {
  loginIsSuccess.value = true;

  setTimeout(() => {
    (document.getElementsByClassName('login-ipt')[0] as HTMLElement).focus();
  });
};

const maskVisible = ref<boolean>(false);

const gotoLogin = () => {
  maskVisible.value = true;
};

export {
  errorTipVisvible,
  login,
  loginForm,
  loginIsSuccess,
  checkError,
  maskVisible,
  gotoLogin,
  username,
};
