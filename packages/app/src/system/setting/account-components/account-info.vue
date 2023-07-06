<script lang="ts" setup>
  import { handleBackendPath } from 'utils';
  import { useUserStore } from 'win10/src/store';
  import { User, Role } from 'win10/src/types';
  import { Role_CN } from 'i18n';

  const userStore = useUserStore();
  const user: User = userStore.user!;
  const role = user.role === Role.Admin ? Role_CN.Admin : Role.User;
</script>

<template>
  <div class="account-info">
    <div class="account-info__avatar">
      <img class="avatar-img" :src="handleBackendPath(user.avatar)" alt="" />
    </div>
    <div class="account-info__username">{{ user.username }}</div>
    <div class="account-info__email">{{ user.email }}</div>
    <div class="account-info-email">{{ role }}</div>
  </div>
</template>

<style scoped lang="scss">
  .account-info__avatar {
    .avatar-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
</style>
