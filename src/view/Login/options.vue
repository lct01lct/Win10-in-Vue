<script lang="ts" setup>
  import Icon from '@/components/Icon/index.vue';
</script>

<template>
  <div class="options-wrapper">
    <div class="shutdown-btn options-btn">
      <Icon>
        <img src="../../assets/images/loginPage/wifi.png" alt="" />
      </Icon>
    </div>
    <div class="wifi-btn options-btn">
      <Icon>
        <img src="../../assets/images/loginPage/RestartNowPower_80.png" alt="" />
      </Icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .options-wrapper {
    position: absolute;
    right: 70px;
    bottom: 40px;
    color: #fff;

    .options-btn {
      float: left;
      margin-left: 40px;
    }
  }
</style>
