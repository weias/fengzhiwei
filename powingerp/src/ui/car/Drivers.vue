<template>
  <div>
    <div style="width: 50%;min-height:20px;float:left;overflow-y: auto">
      <template v-for="(item, index) in items">
        <div :class="{ content_checked:current == index}" class="content">
          <img v-if="index != 0" @click="remove(index)" src="../../assets/img/ic_delete.png" style="width: 20px;height: 20px;float: left;vertical-align: middle;padding: 8px">
          <div style="float: left">
            <p style="margin: 0;font-size: 14px">{{ item.driverName }}</p>
            <p style="margin: 0;font-size: 14px">{{ item.driverMobile }}</p>
          </div>
          <el-select clearable v-model="item.driverRelationship" placeholder="请选择" style="width: 140px;float: right;">
            <el-option
              v-for="item in formOption.drvRelationship"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </template>
    </div>

    <div style="width: 1px;height:100%;float: left;margin-right:8px;background: #eee"></div>

    <div style="width: 46%;float: left;">
      <el-form label-position="left" :model="form" :rules="rules" ref="form" status-icon label-width="96px" size="mini">
        <el-form-item label="驾驶员姓名：" prop="driverName">
          <el-input v-model="form.driverName" auto-complete="off" style="width: 120px"></el-input>
          <el-button type="primary" @click="customerVisible = true">选择</el-button>
        </el-form-item>
        <el-form-item label="驾驶员手机：" prop="mobile">
          <el-input v-model="form.driverMobile"></el-input>
        </el-form-item>
        <el-form-item label="驾驶员关系：" prop="relationship">
          <el-select clearable v-model="form.driverRelationship" placeholder="请选择">
            <el-option
              v-for="item in formOption.drvRelationship"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" style="width: 90%" v-if="!isEdit" @click="addValidate">添加</el-button>
      <div style="text-align: center" v-if="isEdit">
        <el-button type="primary" size="small" @click="edit">修改</el-button><el-button type="primary" size="small" @click="resetForm">取消</el-button>
      </div>

    </div>

    <el-dialog ref="customerDialog" title="驾驶员" :visible.sync="customerVisible" width="40%" :append-to-body="true">
      <customers style="height: 400px;" @setCustomer="setCustomer"></customers>
    </el-dialog>

  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Customers from './Customers.vue'

  export default {
    components: { Customers },
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
      return {
        customerVisible: false,
        formOption: {},
        current: -1,
        isEdit: false,
        form: {
          driverId: '',
          driverName: '',
          driverMobile: '',
          driverRelationship: '',
        },
        rules: {
          driverName: [
            { validator: checkName, trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
      ...mapState([
        'userInfo'
      ])
    },
    mounted () {
      this.formOption = this.userInfo.formOption;
    },
    methods: {
      setCustomer(obj) {
//        this.form.driverId = obj.id;
        this.form.driverName = obj.realname;
        this.form.driverMobile = obj.mobile;
        this.form.driverRelationship = '';
        this.customerVisible = false;
      },
      check(index, item) {
        this.current = index;
        this.form.driverId = item.driverId;
        this.form.driverName = item.driverName;
        this.form.driverMobile = item.driverMobile;
        this.form.driverRelationship = item.driverRelationship;
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
      checkDriver(mobile) {
        return this.$axios({
          url: "v1/cars/check-driver",
          method: "POST",
          data: {
            mobile: mobile
          }
        });
      },
      addValidate() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.checkDriver(this.form.driverMobile)
              .then(res => {
                if (res.data.status == 2000) {
                  this.add();
                } else {
                  this.$confirm('当前驾驶员客户信息已经存在，客户信息将只做记录不会新增，是否继续？')
                    .then(_ => {
                      this.add();
                    })
                    .catch(_ => {});
                }
              }).catch(error => {
                this.$message.error(error.toString());
              });
          } else {
            return false;
          }
        });
      },
      add() {
        this.items.push({
          driverId: this.form.driverId,
          driverName: this.form.driverName,
          driverMobile: this.form.driverMobile,
          driverRelationship: this.form.driverRelationship,
        });
        this.$nextTick(() => {
          this.resetForm();
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
              driverId: this.form.driverId,
              driverName: this.form.driverName,
              driverMobile: this.form.driverMobile,
              driverRelationship: this.form.driverRelationship,
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
        this.form.driverId = '';
        this.form.driverName = '';
        this.form.driverMobile = '';
        this.form.driverRelationship = '';
      }
    },
  }
</script>

<style lang='less' scoped>
  .content {
    float: left;
    width: 100%;
    padding-top: 8px;
    padding-bottom: 8px;
    background: #ffffff;
    color: #303133;
    border-bottom: 1px solid #eee;
  }
  /*.content:hover, .content:active, .content:focus, .content:checked {
    background: #ecf5ff;
    color: #3a8ee6;
  }
  .content_checked {
    background: #ecf5ff;
    color: #3a8ee6;
  }*/
</style>
