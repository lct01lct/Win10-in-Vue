<script lang="ts" setup>
  import { year, month, second } from '@/share/time';
  import Btn from '@/components/Btn/index.vue';

  const currentYear = ref<string>(year.value);
  const currentMonth = ref<string>(month.value);

  const baseArr = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
  let frontP = 0;

  const load = (dir: 'up' | 'down') => {
    if (dir === 'down') {
      baseArr.push(baseArr[baseArr.length - 1] + 1);
      baseArr.push(baseArr[baseArr.length - 1] + 1);
    } else {
      baseArr.unshift(frontP--);
      baseArr.unshift(frontP--);
    }
  };
</script>

<template>
  <div class="calendar-wrapper">
    <div class="calendar-title">
      <Btn color="#dfdfdff3" hover-color="#fff">
        <span class="current">{{ currentYear }} 年 {{ currentMonth }} 月</span>
      </Btn>
      <span class="btn-group">
        <Btn color="#dfdfdff3" hover-color="#fff">
          <span class="iconfont icon-xiangshang"></span>
        </Btn>
        <Btn color="#dfdfdff3" hover-color="#fff">
          <span class="iconfont icon-xiangxia"></span>
        </Btn>
      </span>
    </div>
    <div class="calendar-table">
      <thead class="calendar-table-head">
        <tr>
          <th v-for="item in ['一', '二', '三', '四', '五', '六', '日']">{{ item }}</th>
        </tr>
      </thead>
      <div v-infinite-scroll="{ load, initTop: 50 }" class="calendar-table-body">
        <tr v-for="row in baseArr">
          <!-- <td class="cell" v-for="col in 7">{{ row - 1 }}</td> -->
          <td class="cell">{{ row }} {{ baseArr.length }}</td>
        </tr>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .calendar-wrapper {
    padding: 20px;
    font-size: 14px;
    font-weight: 400;

    .calendar-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 20px;
      }
    }

    .calendar-table {
      margin-top: 40px;
      color: #fff;
      .calendar-table-body {
        height: 300px;
        overflow: auto;
        .cell {
          height: 50px;
        }
      }
    }
  }
</style>
