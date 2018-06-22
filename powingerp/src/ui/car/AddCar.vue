<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 8px;margin-left: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/cars' }">车辆管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加车辆</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="container">
      <el-form :inline="true" size="medium" label-position="left" :model="form" :rules="rules" ref="form" label-width="130px">
        <span style="color: #da7f36;font-size: 14px">拍照上传"行驶证正页"照片，可自动识别证件信息</span>
        <el-form-item style="width: 100%;margin-top: 10px">
          <el-upload
            class="avatar-uploader upload"
            style="text-align: center;line-height: 97px"
            :action="cloudUrl"
            :show-file-list="false"
            :on-error="handleUrlError"
            :on-success="handleUrlDim">
            <img v-if="form.picDim" :src="form.picDim" class="avatar">
            <img v-if="!form.picDim" :src="defaultCamera" style="width: 30px;height: 30px" >
            <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          </el-upload>
          <el-upload
            class="avatar-uploader"
            style="margin-right: 20px"
            action="v1/commons/uploadimg"
            :show-file-list="false"
            :on-error="handleUrlError"
            :on-success="handleUrlSurface">
            <img :src="form.picSurface || defaultImg" class="avatar">
            <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
          </el-upload>
          <el-upload
            class="avatar-uploader"
            style="margin-right: 20px"
            action="v1/commons/uploadimg"
            :show-file-list="false"
            :on-error="handleUrlError"
            :on-success="handleUrlDic">
            <img v-if="form.picDic" :src="form.picDic" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-upload
            class="avatar-uploader"
            action="v1/commons/uploadimg"
            :show-file-list="false"
            :on-error="handleUrlError"
            :on-success="handleUrlDicBside">
            <img v-if="form.picDicBside" :src="form.picDicBside" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="车牌号：" prop="plateNumber">
          <el-dropdown placement="bottom-start" trigger="click">
            <span class="el-dropdown-link">
              <img style="width: 30px;vertical-align: middle;" src="../../assets/img/keyboard.png" >
            </span>
            <el-dropdown-menu slot="dropdown">
              <provinces @setProvince="setProvince"></provinces>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color: #5a5e66;margin-left: 10px;margin-right: 10px">{{ form.province }}</span>
          <el-input v-model="form.plateNumber" class="text__uppercase" style="width: 300px;margin-right: 50px"></el-input>
        </el-form-item>
        <el-form-item label="临牌号：" prop="tempPlateNumber">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img style="width: 30px;vertical-align: middle;" src="../../assets/img/keyboard.png" >
            </span>
            <el-dropdown-menu slot="dropdown">
              <provinces v-bind:requestCode="1" @setProvince="setProvince"></provinces>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="color: #5a5e66;margin-left: 10px;margin-right: 10px">{{ form.tempProvince }}</span>
          <el-input v-model="form.tempPlateNumber" class="text__uppercase" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="车架号：" prop="vehicleNumber">
          <el-input v-model="form.vehicleNumber" class="input text__uppercase"></el-input>
        </el-form-item>
        <el-form-item label="发动机号：" prop="engineNumber">
          <el-input v-model="form.engineNumber" class="input text__uppercase"></el-input>
        </el-form-item>
        <el-form-item label="品牌型号：" prop="brandSeries">
          <el-button class="input button-select" @click="brandVisible = true">{{ form.brandSeriesName }}<i class="el-icon-arrow-down el-icon--down arrow"></i></el-button>
        </el-form-item>
        <el-form-item label="使用性质：" prop="usage">
          <el-select v-model="form.usage" placeholder="请选择" class="input">
            <el-option
              v-for="item in formOption.usage"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆性质：" prop="properties">
          <el-select v-model="form.properties" placeholder="请选择" class="input">
            <el-option
              v-for="item in formOption.properties"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆类型：" prop="vehicleType">
          <el-select v-model="form.vehicleType" placeholder="请选择" class="input">
            <el-option
              v-for="item in formOption.vehicleType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座位数：" prop="seatNum">
          <el-input-number v-model="form.seatNum" :min="0" style="width: 340px;margin-right: 15px"></el-input-number><span style="color: #5a5e66;margin-right: 53px">座</span>
        </el-form-item>
        <el-form-item label="车辆渠道：" prop="carOrg">
          <el-button class="input button-select" @click="carOrgVisible = true">{{ form.carOrgName }}<i class="el-icon-arrow-down el-icon--down arrow"></i></el-button>
        </el-form-item>
        <el-form-item label="注册日期：">
          <el-date-picker v-model="form.regDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" class="input"></el-date-picker>
        </el-form-item>
        <el-form-item label="发证日期：">
          <el-date-picker v-model="form.issueDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" class="input"></el-date-picker>
        </el-form-item>
        <el-form-item label="行驶证车型：">
          <el-input v-model="form.model" class="input"></el-input>
        </el-form-item>
        <el-form-item label="上牌地点：">
          <el-input v-model="form.regPlace" class="input"></el-input>
        </el-form-item>
        <el-form-item label="所有人：">
          <el-input v-model="form.owner" class="input"></el-input>
        </el-form-item>
        <el-form-item label="驾驶员：">
          <el-button class="input button-select" @click="driverVisible = true">{{ form.drivers.length }} 个<i class="el-icon-arrow-down el-icon--down arrow"></i></el-button>
        </el-form-item>
        <el-form-item label="新车购置价：">
          <el-input ref="price" @keyup.native="priceFilter" v-model="form.price" style="width: 320px;margin-right: 35px"></el-input><span style="color: #5a5e66;margin-right: 53px">元</span>
        </el-form-item>
        <el-form-item label="排量：">
          <el-select clearable v-model="form.volume" placeholder="请选择" class="input">
            <el-option
              v-for="item in formOption.volume"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="整车质量：">
          <el-input ref="weight" @keyup.native="priceFilter"  v-model="form.weight" style="width: 320px;margin-right: 23px"></el-input><span style="color: #5a5e66;margin-right: 51px">千克</span>
        </el-form-item>
        <el-form-item label="行驶证档案编号：">
          <el-input v-model="form.docSn" class="input"></el-input>
        </el-form-item>
        <el-form-item label="行驶证有效期至：">
          <el-date-picker v-model="form.expireIn" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" class="input"></el-date-picker>
        </el-form-item>
        <el-form-item label="购车方式：">
          <el-input v-model="form.purchaseMode" class="input"></el-input>
        </el-form-item>
        <el-form-item label="新车销售员：">
          <el-button class="input button-select" @click="newSellerVisible = true">{{ form.newSellerName }}<i class="el-icon-arrow-down el-icon--down arrow"></i></el-button>
        </el-form-item>
        <el-form-item label="续保销售员：">
          <el-button class="input button-select" @click="reSellerVisible = true">{{ form.reSellerName }}<i class="el-icon-arrow-down el-icon--down arrow"></i></el-button>
        </el-form-item>
        <el-form-item label="车辆版本：">
          <el-select clearable v-model="form.carVersion" placeholder="请选择" class="input">
            <el-option
              v-for="item in formOption.carVersion"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="过户车：">
          <el-switch v-model="form.transferOwnerShip" class="input"></el-switch>
        </el-form-item>
        <el-form-item label="过户时间：" v-if="form.transferOwnerShip">
          <el-date-picker v-model="form.transferTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" class="input"></el-date-picker>
        </el-form-item>
        <el-form-item label="改装：">
          <el-switch v-model="form.customisation" class="input"></el-switch>
        </el-form-item>
        <el-form-item label="改装清单：" v-if="form.customisation">
          <el-button class="input button-select" @click="refittingVisible = true">{{ form.refitting.length }} 件<i class="el-icon-arrow-down el-icon--down arrow"></i></el-button>
        </el-form-item>
      </el-form>

      <span>车辆验车照</span>
      <el-upload
        style="margin-top: 10px;margin-bottom: 20px"
        action="v1/commons/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-error="handleUrlError"
        :on-success="handleUrlOthers">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="previewVisible" :append-to-body="true">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

      <div style="text-align: center;">
        <el-button style="width: 160px" type="primary" @click="submitForm">保存</el-button>
      </div>
    </div>






    <el-dialog ref="brandDialog" :show-close="false" :visible.sync="brandVisible" width="40%" :append-to-body="true">
      <brands style="height: 500px;" @setBrand="setBrand" @dialogClose="dialogClose"></brands>
    </el-dialog>

    <el-dialog ref="carOrgDialog" title="车辆渠道" :visible.sync="carOrgVisible" width="40%" :append-to-body="true">
      <car-org style="height: 400px;" @setCarOrg="setCarOrg"></car-org>
    </el-dialog>

    <el-dialog ref="newSellerDialog" title="新车销售员" :visible.sync="newSellerVisible" width="40%" :append-to-body="true">
      <new-sellers style="height: 400px;" @setNewSeller="setNewSeller"></new-sellers>
    </el-dialog>

    <el-dialog ref="reSellerDialog" title="续保销售员" :visible.sync="reSellerVisible" width="40%" :append-to-body="true">
      <re-sellers style="height: 400px;" @setReSeller="setReSeller"></re-sellers>
    </el-dialog>

    <el-dialog ref="refittingDialog" title="驾驶员" :visible.sync="driverVisible" width="50%" :append-to-body="true">
      <drivers style="height: 400px;" :items="form.drivers" @setRefitting="setRefitting"></drivers>
    </el-dialog>

    <el-dialog ref="refittingDialog" title="改装清单" :visible.sync="refittingVisible" width="50%" :append-to-body="true">
      <refitting style="height: 400px;" :items="form.refitting" @setRefitting="setRefitting"></refitting>
    </el-dialog>

  </div>
</template>

<script>
  import { cloudUrl } from '../../global/global'
  import { priceFilter } from '../../commons/dom'
  import { mapState } from 'vuex'
  import Cipher from '../../utils/cipher'

  import CarOrg from './CarOrgs.vue'
  import Drivers from './Drivers.vue'
  import Refitting from './Refitting.vue'
  import Provinces from '../../components/Provinces'
  import Brands from '../../components/Brands.vue'
  import NewSellers from '../../components/NewSellers.vue'
  import ReSellers from '../../components/ReSellers.vue'

  export default {
    name: 'add-car',
    components: { CarOrg, Drivers, Refitting, Provinces, Brands, NewSellers, ReSellers },
    data() {
      var plateNumber = (rule, value, callback) => {
        if (this.form.plateNumber === '' && this.form.tempPlateNumber === '') {
          return callback(new Error('请输入车牌号'));
        }
        if (value !== '') {
          let length = value.length;
          if (length < 6 || length > 7) {
            return callback(new Error('请输入车牌号'));
          }
        }
        callback();
      };
      var tempPlateNumber = (rule, value, callback) => {
        if (value !== '') {
          let length = value.length;
          if (length < 6 || length > 7) {
            return callback(new Error('请输入车牌号'));
          }
        }
        callback();
      };
      var brandSeries = (rule, value, callback) => {
        if (this.form.brandSeriesName === '请选择' || this.form.brandSeriesId === '') {
          return callback(new Error('请选择品牌型号'));
        }
        callback();
      };
      var seatNum = (rule, value, callback) => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字座位数'));
        } else if (value < 1) {
            callback(new Error('请输入座位数'));
        }
        callback();
      };
      var carOrg = (rule, value, callback) => {
        if (this.form.carOrgName === '请选择' || this.form.carOrgId === '') {
          return callback(new Error('请选择车辆渠道'));
        }
        callback();
      };
      return {
        cloudUrl,
        defaultImg: require('../../assets/img/img_default.png'),
        defaultCamera: require('../../assets/img/camera_default.png'),
        isEdit: false,
        id: '',
        formOption: {},
        brandVisible: false,
        carOrgVisible: false,
        newSellerVisible: false,
        reSellerVisible: false,
        driverVisible: false,
        refittingVisible: false,
        previewVisible: false,
        dialogImageUrl: '',
        form: {
          picDim: '',
          picSurface: '',
          picDic: '',
          picDicBside: '',
          province: '粤',
          plateNumber: '',
          tempProvince: '粤',
          tempPlateNumber: '',
          vehicleNumber: '',
          engineNumber: '',
          brandSeriesName: '请选择',
          brandSeriesId: '',
          usage: '',
          properties: '',
          vehicleType: '',
          seatNum: 0,
          carOrgName: '请选择',
          carOrgId: '',
          regDate: '',
          issueDate: '',
          model: '',
          regPlace: '',
          owner: '',
          price: '',
          volume: '',
          weight: '',
          docSn: '',
          expireIn: '',
          purchaseMode: '',
          newSellerName: '请选择',
          newSellerId: '',
          reSellerName: '请选择',
          reSellerId: '',
          carVersion: '',
          transferOwnerShip: false,
          transferTime: '',
          customisation: false,
          drivers: [],
          refitting: [],
          picOthers: []
        },
        rules: {
          plateNumber: [
            { required: true, validator: plateNumber, trigger: 'blur' }
          ],
          tempPlateNumber: [
            { validator: tempPlateNumber, trigger: 'blur' }
          ],
          vehicleNumber: [
            { required: true, message: '请输入车架号', trigger: 'blur' },
            { min: 6, max: 17, message: '请输入正确的车架号', trigger: 'blur' }
          ],
          engineNumber: [
            { required: true, message: '请输入发动机号', trigger: 'blur' },
            { min: 6, message: '请输入正确的发动机号', trigger: 'blur' }
          ],
          brandSeries: [
            { required: true, validator: brandSeries, trigger: 'blur' }
          ],
          usage: [
            { required: true, message: '请选择使用性质', trigger: 'change' }
          ],
          properties: [
            { required: true, message: '请选择车辆性质', trigger: 'change' }
          ],
          vehicleType: [
            { required: true, message: '请选择车辆类型', trigger: 'change' }
          ],
          seatNum: [
            { required: true, validator: seatNum, trigger: 'blur' }
          ],
          carOrg: [
            { required: true, validator: carOrg, trigger: 'blur' }
          ],
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
    watch: {
      data() {
      }
    },
    methods: {
      priceFilter,
      handleUrlError(err, file, fileList) {
        this.$message.error(err.message);
      },
      handleUrlDim(response, file, fileList) {
        let data = this.handleUrl(response);
        console.log(data)
        this.form.picDim = data.img;
        this.ocrResult(data);
      },
      handleUrlSurface(response, file, fileList) {
        this.form.picSurface = this.handleUrl(response);
      },
      handleUrlDic(response, file, fileList) {
        this.form.picDic = this.handleUrl(response);
      },
      handleUrlDicBside(response, file, fileList) {
        this.form.picDicBside = this.handleUrl(response);
      },
      handleUrlOthers(response, file, fileList) {
        this.form.picOthers.push({
          url: this.handleUrl(response),
          file: file.url
        });
      },
      handleRemove(file, fileList) {
        let index = this.form.picOthers.indexOf(file.url);
        if (index !== -1) {
          this.form.picOthers.splice(index, 1);
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.previewVisible = true;
      },
      handleUrl(response) {
        let res = JSON.parse(Cipher.Decrypt(response));
//        console.log(res);
        return res.data;
      },
      ocrResult(data) {
        if (data.info != null) {
          let ocrResult = data.info;
          try {
            this.form.province = ocrResult.plateNum.substring(0, 1);
            this.form.plateNumber = ocrResult.plateNum.substring(1);
          } catch(e) {}
          this.form.vehicleNumber = ocrResult.vin;
          this.form.engineNumber = ocrResult.engineNum;
          this.form.regDate = ocrResult.registerDate;
          this.form.issueDate = ocrResult.issueDate;
          this.form.owner = ocrResult.owner;
          this.form.drivingLicenseCarType = ocrResult.model;
          if (ocrResult.userCharacter != null) {
            for (var i in this.formOption.usage) {
              let config = this.formOption.usage[i];
              if (config.name == ocrResult.userCharacter) {
                this.form.usage = config.id;
                break;
              }
            }
          }
          if (ocrResult.vehicleType != null) {
            for (var i in this.formOption.vehicleType) {
              let config = this.formOption.vehicleType[i];
              if (config.name == ocrResult.vehicleType) {
                this.form.vehicleType = config.id;
                break;
              }
            }
          }
        }
      },
      setProvince(obj) {
        if (obj.requestCode == 0) {
          this.form.province = obj.province
        } else {
          this.form.tempProvince = obj.province
        }
      },
      dialogClose() {
        this.brandVisible = false;
      },
      setBrand(obj) {
        this.form.brandSeriesName = obj.nameBrand + ' ' + obj.nameSeries;
        this.form.brandSeriesId = obj.idBrand + ',' + obj.idSeries;
        this.brandVisible = false;
      },
      setCarOrg(obj) {
        this.form.carOrgId = obj.orgId;
        this.form.carOrgName = obj.orgName;
        this.carOrgVisible = false;
      },
      setNewSeller(obj) {
        this.form.newSellerId = obj.newSellerId;
        this.form.newSellerName = obj.newSellerName;
        this.newSellerVisible = false;
      },
      setReSeller(obj) {
        this.form.reSellerId = obj.reSellerId;
        this.form.reSellerName = obj.reSellerName;
        this.reSellerVisible = false;
      },
      setRefitting(obj) {
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.$axios({
              url: "v1/car/add",
              method: "POST",
              data: this.getParams()
            }).then(res => {
              if (res.data.status == 2000) {
                this.total = parseInt(res.data.data.total)
                this.cars = res.data.data.list
              } else {
                this.$message.error(res.data.message);
              }
            }).catch(error => {
              this.$message.error(error.toString());
            });
          } else {
            return false;
          }
        });
      },
      getParams() {
        let params = new Object();
        params.id = this.id;
        params.picDim = this.form.picDim;
        params.picSurface = this.form.picSurface;
        params.picDic = this.form.picDic;
        params.picDicBside = this.form.picDicBside;
        params.plateNumber = this.form.plateNumber == '' ? '' : this.form.province + this.form.plateNumber;
        params.tempNumber = this.form.tempPlateNumber == '' ? '' : this.form.tempProvince + this.form.tempPlateNumber;
        params.vehicleNumber = this.form.vehicleNumber;
        params.engineNumber = this.form.engineNumber;
        params.brand = this.form.brandSeriesId.toString();
        params.brandText = this.form.brandSeriesName;
        params.usage = this.form.usage.toString();
        params.properties = this.form.properties.toString();
        params.vehicleType = this.form.vehicleType.toString();
        params.seatNum = this.form.seatNum.toString();
        params.orgId = this.form.carOrgId.toString();
        params.regDate = this.form.regDate;
        params.issueDate = this.form.issueDate;
        params.model = this.form.model;
        params.regPlace = this.form.regPlace;
        params.owner = this.form.owner;
        params.price = this.form.price;
        params.volume = this.form.volume.toString();
        params.weight = this.form.weight;
        params.docSn = this.form.docSn;
        params.expireIn = this.form.expireIn;
        params.purchaseMode = this.form.purchaseMode;
        params.sellerId = this.form.newSellerId.toString();
        params.reSellerId = this.form.reSellerId.toString();
        params.carVersion = this.form.carVersion;
        params.transferOwnerShip = this.form.transferOwnerShip ? '1' : '0';
        params.transferTime = this.form.transferTime;
        params.customisation = this.form.customisation ? '1' : '0';
        if (this.form.drivers.length > 0) {
          params.driverId = [];
          params.driverName = [];
          params.driverMobile = [];
          params.driverRelationship = [];
          for (var i in this.form.drivers) {
            let driver = this.form.drivers[i];
            params.driverId[i] = driver.driverId == '' ? '0' : driver.driverId;
            params.driverName[i] = driver.driverName;
            params.driverMobile[i] = driver.driverMobile;
            params.driverRelationship[i] = driver.driverRelationship == '' ? '0' : driver.driverRelationship;
          }
        }
        if (this.form.refitting.length > 0) {
          params.customId = [];
          params.customName = [];
          params.customNum = [];
          params.customPrice = [];
          for (var i in this.form.refitting) {
            let refitting = this.form.refitting[i];
            params.customId[i] = refitting.customId == '' ? '0' : refitting.customId;
            params.customName[i] = refitting.customName;
            params.customNum[i] = refitting.customNum;
            params.customPrice[i] = refitting.customPrice;
          }
        }
        if (this.form.picOthers.length > 0) {
          params.img = [];
          for (var i in this.form.picOthers) {
            let picOther = this.form.picOthers[i];
            params.img[i] = picOther.url;
          }
        }
//        console.log(params);
//        console.log(JSON.stringify(params));
        return params;
      }
    }
  }
</script>

<style>
  .container {
    margin: 20px;
    padding: 20px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .text__uppercase .el-input__inner {
    text-transform: uppercase;
  }

  .upload {
    margin-right: 20px;
    background: url(../../assets/img/img_default.png) no-repeat center;
    background-size:100%;
  }
  .input {
    width: 372px !important;
    margin-right: 50px !important;
  }
  .arrow {
    float: right;
    margin-right: 0;
  }
  .button-select {
    text-align: left;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 97px;
    float: left;
  }
  .avatar-uploader :hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 97px;
    line-height: 97px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 97px;
    display: block;
  }
</style>
\**
export default function assertString(input) {
  const isString = (typeof input === 'string' || input instanceof String);

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}



export default function isFloat(str, options) {
  assertString(str);
  options = options || {};
  const float = new RegExp(`^(?:[-+])?(?:[0-9]+)?(?:\\$'.'[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$`);
  if (str === '' || str === '.' || str === '-' || str === '+') {
    return false;
  }
  const value = parseFloat(str.replace(',', '.'));
  return float.test(str) &&
    (!options.hasOwnProperty('min') || value >= options.min) &&
    (!options.hasOwnProperty('max') || value <= options.max) &&
    (!options.hasOwnProperty('lt') || value < options.lt) &&
    (!options.hasOwnProperty('gt') || value > options.gt);
}
*/
