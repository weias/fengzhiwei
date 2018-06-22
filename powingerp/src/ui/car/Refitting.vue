<template>
  <div>
    <div style="width: 56%;min-height:20px;float:left;overflow-y: auto">
      <template v-for="(item, index) in items">
        <div :class="{ content_checked:current == index}" class="content" @click="check(index, item)">
          <img src="../../assets/img/ic_delete.png" style="width: 20px;height: 20px;float: left;vertical-align: middle;padding: 8px" @click="remove(index)">
          <div>
            <p style="margin: 0;font-size: 14px">{{ item.customName }}</p>
            <p style="margin: 0;font-size: 14px">{{ item.customNum }} 件&#160;&#160;&#160;&#160;&#160;{{ item.customPrice }} 元/件&#160;&#160;&#160;&#160;&#160;小计：{{ parseInt(item.customNum) * parseFloat(item.customPrice) }} 元</p>
          </div>
        </div>
      </template>
    </div>
    <div style="width: 1px;height:100%;float: left;margin-right:8px;background: #eee"></div>
    <div style="width: 40%;float: left;">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon label-width="60px" size="mini">
        <el-form-item label="名称：" prop="customName">
          <el-input v-model="form.customName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量：" prop="customNum">
          <el-input-number v-model="form.customNum" :min="1" style="width: 130px;margin-right: 8px"></el-input-number><span style="color: #5a5e66">件</span>
        </el-form-item>
        <el-form-item label="单价：" prop="customPrice">
          <el-input @keyup.native="priceFilter" v-model="form.customPrice" style="width: 130px;margin-right: 8px"></el-input><span style="color: #5a5e66">元/件</span>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" style="width: 90%" v-if="!isEdit" @click="add()">添加</el-button>
      <div style="text-align: center" v-if="isEdit">
        <el-button type="primary" size="small" @click="edit()">修改</el-button><el-button type="primary" size="small" @click="resetForm()">取消</el-button>
      </div>

    </div>
  </div>
</template>
<script>
  import { priceFilter } from '../../commons/dom'

  export default {
    props: {
      items: {
        type: Array,
        required: true,
      }
    },
    data() {
      var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('名称不能为空'));
        }
        callback();
      };
      var checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('价格不能为空'));
        }
//        if (!Number.isInteger(value)) {
//          callback(new Error('请输入数字值'));
//        }
        callback();
      };
      return {
        current: -1,
        isEdit: false,
        form: {
          customId: '',
          customName: '',
          customNum: 1,
          customPrice: '',
        },
        rules: {
          customName: [
            { validator: checkName, trigger: 'blur' }
          ],
          customPrice: [
            { validator: checkPrice, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      priceFilter,
      check(index, item) {
        this.current = index;
        this.form.customId = item.customId;
        this.form.customName = item.customName;
        this.form.customNum = item.customNum;
        this.form.customPrice = item.customPrice;
        this.isEdit = true;
      },
      remove(index) {
//        var index = this.items.indexOf(item);
        if (index !== -1) {
          this.items.splice(index, 1);
          this.$nextTick(() => {
            this.resetForm();
          });
        }
      },
      add() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.items.push({
              customId: this.form.customId,
              customName: this.form.customName,
              customNum: this.form.customNum,
              customPrice: this.form.customPrice,
            });
            this.$nextTick(() => {
              this.resetForm();
            });
          } else {
            return false;
          }
        });
      },
      edit() {
        if (this.current < 0) {
          this.resetForm();
          return;
        }
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.items.splice(this.current, 1, {
              customId: this.form.customId,
              customName: this.form.customName,
              customNum: this.form.customNum,
              customPrice: this.form.customPrice,
            });
            this.$nextTick(() => {
              this.resetForm();
            });
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.isEdit = false;
        this.current = -1;
        this.$refs['form'].resetFields();
        this.form.customId = '';
        this.form.customName = '';
        this.form.customNum = 1;
        this.form.customPrice = '';
      }
    },
  }
</script>

<style lang='less' scoped>
  .content {
    padding-top: 8px;
    padding-bottom: 8px;
    background: #ffffff;
    color: #303133;
    border-bottom: 1px solid #eee;
  }
  .content:hover, .content:active, .content:focus, .content:checked {
    background: #ecf5ff;
    color: #3a8ee6;
  }
  .content_checked {
    background: #ecf5ff;
    color: #3a8ee6;
  }
</style>
