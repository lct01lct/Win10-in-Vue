<script lang="ts" setup>
  import options from './options.vue';
  import LoginForm from './login-form.vue';
  import { maskVisible, gotoLogin } from './login';

  const loginWallPaperClick = (e: Event) => {
    if ((e as KeyboardEvent).keyCode === 13) {
      gotoLogin();
    }
  };

  onMounted(() => {
    document.addEventListener('keydown', loginWallPaperClick);
  });
</script>

<template>
  <div>
    <section class="login-wallpaper-wrapper" @click="gotoLogin">
      <img src="@/assets/images/loginPage/login-bg.jpg" alt="" id="login-wallpaper" />
      <div class="clock-wrapper" v-if="!maskVisible">
        <div class="minute-second">20 : 26</div>
        <div class="date">10月15日，星期日</div>
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
    width: 100%;
    height: 753px;

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
</style>
