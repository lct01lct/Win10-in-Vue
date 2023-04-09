<script lang="ts" setup>
  import options from './options.vue';
  import LoginForm from './login-form.vue';
  import { maskVisible, gotoLogin } from './login';
  import { hour, minute, month, date, day } from '@/share/time';
  import EnterHandlers from '@/share/EnterHandlers';
  import loginBg from '@/assets/images/loginPage/login-bg.jpg';

  new EnterHandlers().addLastEnterListener(gotoLogin).notify();

  const isLoadedBg = ref(false);
</script>

<template>
  <div>
    <section class="login-wallpaper-wrapper" @click="gotoLogin">
      <h1 class="login-page-load" v-if="!isLoadedBg">loading...</h1>
      <img :src="loginBg" alt="" id="login-wallpaper" @load="isLoadedBg = true" />
      <div class="clock-wrapper" v-if="!maskVisible">
        <div class="minute-second">{{ hour }} : {{ minute }}</div>
        <div class="date">{{ month }}月{{ date }}日，{{ day }}</div>
      </div>
      <options v-if="!maskVisible"></options>
    </section>
    <section class="mask" v-if="maskVisible">
      <login-form></login-form>
    </section>
  </div>
</template>

<style scoped lang="scss">
  .login-wallpaper-wrapper {
    position: absolute;
    width: 100vw;
    height: 100vh;

    #login-wallpaper {
      display: block;
      width: 100%;
      height: 100%;
    }

    .clock-wrapper {
      position: absolute;
      bottom: 100px;
      left: 50px;
      color: #fff;
      .minute-second {
        font-size: 100px;
        font-weight: 100;
      }

      .date {
        font-size: 40px;
      }
    }
  }

  .mask {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 752px;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      filter: blur(25px);
      backdrop-filter: blur(25px);
    }
  }

  .login-page-load {
    margin-top: 300px;
    text-align: center;
  }
</style>
