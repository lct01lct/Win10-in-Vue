import { router, useUserStore, R_login } from 'model-core';
const { username, password } = toRefs(useUserStore());

const errorTipVisvible = ref<boolean>(false);
const loginIsSuccess = ref<boolean>(true);

const loginForm = reactive({
  username: username.value,
  password: '123456789',
});

const login = async () => {
  const res = await checkLoginForm();

  if (res) {
    router.push({ name: 'Home' });
  } else {
    errorTipVisvible.value = true;
    loginIsSuccess.value = false;
  }
};

const checkLoginForm = async () => {
  const res = await R_login({
    username: 'admin',
    password: password.value,
  });

  if (res) {
    const { status } = res;
    if (status === 'failed') return false;

    const userStore = useUserStore();

    userStore.user = res.data?.user ?? null;
    userStore.setToken(res.token ?? '');
    return true;
  } else if (password.value === '123456789') {
    return true;
  }

  return false;
};

const checkError = () => {
  loginIsSuccess.value = true;

  nextTick(() => {
    (document.getElementsByClassName('login-ipt')[0] as HTMLElement).focus();
  });
};

const maskVisible = ref<boolean>(false);

const gotoLogin = () => {
  maskVisible.value = true;
};

// 策略模式解决页面多个回车处理函数
const useEnterListener = () => {
  const enterHandlers: Function[] = [];

  let count = 0;

  const addEnterListener = (fn: Function) => {
    enterHandlers.push(fn);
  };

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      const len = enterHandlers.length;

      enterHandlers[count++ % len]();
    }
  });

  return {
    addEnterListener, // 绑定回车处理函数
  };
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
  useEnterListener,
};
