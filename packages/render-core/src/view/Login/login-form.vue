<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';
  import {
    errorTipVisvible,
    login,
    loginForm,
    loginIsSuccess,
    checkError,
    username,
    useEnterListener,
  } from './login';
  import Options from './options.vue';
  import { useUserStore } from 'model-core';

  const { addEnterListener } = useEnterListener();

  addEnterListener(login);
  addEnterListener(checkError);

  const passwordIptRef = ref<HTMLInputElement | null>(null);
  onMounted(() => {
    passwordIptRef.value!.focus();
  });

  const userStore = useUserStore();
</script>

<template>
  <div class="login-wrapper">
    <options class="options-wrapper"></options>
    <div class="avatar-wrapper">
      <img src="@/assets/images/loginPage/user_avatar_default.png" alt="" class="avatar-img" />
      <span class="username">{{ username }}</span>
    </div>
    <div class="password-ipt" v-if="loginIsSuccess">
      <input
        type="password"
        placeholder="密码"
        class="login-ipt"
        v-model="loginForm.password"
        ref="passwordIptRef"
      />
      <button class="login-btn" @click="login">
        <Icon>
          <img src="@/assets/images/loginPage/right-arrow.svg" alt="" />
        </Icon>
      </button>
    </div>
    <div class="error-tip" v-if="loginIsSuccess">
      <span v-if="errorTipVisvible">密码提示：无</span>
      <span v-if="errorTipVisvible">重置密码</span>
    </div>
    <div class="passwordIsErrorTip" v-else>
      <span>密码不正确，请再试一次</span>
      <WinBtn
        class="check-btn"
        @click="checkError"
        bgColor="#99977e"
        borderStyle="2px solid #e6e6e6"
        :height="34"
        :width="180"
      >
        确认
      </WinBtn>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    width: 500px;
    height: 500px;
    animation: slideIn 1s;

    .avatar-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      .avatar-img {
        border-radius: 50%;
        width: 250px;
        height: 250px;
      }

      .username {
        margin-top: 20px;
        color: #fff;
        font-size: 40px;
      }
    }

    .password-ipt {
      box-sizing: border-box;
      margin-top: 20px;
      width: 400px;
      height: 40px;
      border: 3px solid #cabec5;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        border: 3px solid #e6e6e6;
      }

      .login-ipt {
        margin-left: 4px;
        border: 0;
        outline: none;
        width: 350px;
        height: 30px;
      }

      .login-btn {
        flex: 1;
        height: 34px;
        border: 0;
        background-color: #99977e;
        cursor: pointer;
      }
    }

    .error-tip {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
      > span {
        margin-top: 20px;
      }
    }

    .passwordIsErrorTip {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      span {
        margin-top: 20px;
      }

      .check-btn {
        width: 120px;
        margin-top: 30px;
      }
    }

    .options-wrapper {
      bottom: -80px;
      right: -450px;
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
