import request from '@/utils/request';

export function getSomeInfo () {
  let params = {
    openid: undefined,
    tel: 18819466864,
    pwd: 'linrui',
    guid: '98f62d1d-b563-49c9-a0ca-fd3c7ba59f89',
    tid: '0,2146054,2146055,2146056,2145716,2145475,2145476,2145477,2145478,2145472,2145473',
    type: 0,
    subjectId: 2053
  };
  return request().post('/app/gettestmodel?urltimer=1526639286033', params)
}
