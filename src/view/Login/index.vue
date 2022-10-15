<script lang="ts" setup>
  const maskVisible = ref<boolean>(false);

  const gotoLogin = () => {
    maskVisible.value = true;
  };
</script>

<template>
  <div>
    <section class="login-wallpaper-wrapper" @click="gotoLogin">
      <img src="@/assets/images/loginPage/login-wallpaper.jpg" alt="" id="login-wallpaper" />
    </section>
    <section class="mask" v-if="maskVisible">2</section>
  </div>
</template>

<style scoped lang="scss">
  .login-wallpaper-wrapper {
    position: absolute;
    width: 100%;
    height: 753px;
    background-color: pink;

    #login-wallpaper {
      width: 100%;
      height: 100%;
    }
  }

  .mask {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 753px;
    background-color: rgba(0, 0, 0, 0.8);
  }
</style>
