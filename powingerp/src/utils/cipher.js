const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("ast2sfas211pq5ad"); //十六位十六进制数作为秘钥
const iv = CryptoJS.enc.Utf8.parse('2017120616045658'); //十六位十六进制数作为秘钥偏移量

//加密
function Encrypt(data) {
  let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encodeURIComponent(encrypted.toString());
}
//解密
function Decrypt(data){
  let decrypt = CryptoJS.AES.decrypt(data, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export default {
  Encrypt,
  Decrypt
}
