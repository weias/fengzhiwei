<template>
  <div style="width: 300px;margin-left: 8px">
    <template v-for="item in provinces">
      <el-dropdown-item style="margin:0;padding:8px;display:inline">
        <el-button style="margin: 0" type="text" class="button" @click="positive(item)">{{ item }}</el-button>
      </el-dropdown-item>
    </template>
  </div>
</template>
<script>
  export default {
    props: {
      requestCode: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        provinces: [
          '京',
          '津',
          '冀',
          '晋',
          '蒙',
          '辽',
          '吉',
          '黑',
          '沪',
          '苏',
          '浙',
          '皖',
          '闽',
          '赣',
          '鲁',
          '豫',
          '鄂',
          '湘',
          '粤',
          '桂',
          '琼',
          '渝',
          '川',
          '贵',
          '云',
          '藏',
          '陕',
          '甘',
          '青',
          '宁',
          '新',
          '使',
          '领'
        ],
      };
    },
    methods: {
      positive(province) {
        this.$emit('setProvince', { requestCode:this.requestCode, province:province });
      }
    }
  }
</script>

<style lang='less' scoped>
  .button {
    margin: 6px;
    /*color: #5a5e66;*/
    font-size: 18px;
  }
</style>
