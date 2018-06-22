let build = process.env.NODE_ENV === 'production';
// 测试全局请求配置
let hostDomain = build ? 'https://powing.baoxuntech.com/' : 'https://apipowingerp.baoxuntech.com/';
let cloudDomain = build ? 'https://cloud.baoxuntech.com/' : 'https://cloudtest.baoxuntech.com/';
// let cloudUrl = build ? 'https://cloud.baoxuntech.com/v1/recognizes/vehicle-lisence-erp' : 'https://cloudtest.baoxuntech.com/v1/recognizes/vehicle-lisence-erp';//有毒!要跨域!
let cloudUrl = build ? 'https://cloud.baoxuntech.com/v1/recognizes/vehicle-lisence-erp' : 'upload_clouds/recognizes/vehicle-lisence-erp';//有毒!upload_clouds为假路径，跨域用

export {
  hostDomain,
  cloudUrl,
}

export function isSucc(code) {
  return !((code > 200 && code <= 600) || (code > 0 && code < 200));
}
