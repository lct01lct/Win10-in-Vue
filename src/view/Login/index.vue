<script lang="ts" setup>
  import options from './options.vue';

  const maskVisible = ref<boolean>(false);

  const gotoLogin = () => {
    maskVisible.value = true;
  };
</script>

<template>
  <div>
    <section class="login-wallpaper-wrapper" @click="gotoLogin">
      <img src="@/assets/images/loginPage/login-bg.jpg" alt="" id="login-wallpaper" />
      <div class="clock-wrapper" v-if="!maskVisible">
        <div class="minute-second">20 : 26</div>
        <div class="date">10月15日，星期日</div>
      </div>
      <options></options>
    </section>
    <section class="mask" v-if="maskVisible">
      <div class="login-wrapper">123456</div>
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

    .login-wrapper {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 2;
      width: 500px;
      height: 500px;
      animation: slideIn 0.5s;
      background-color: #000;
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
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
