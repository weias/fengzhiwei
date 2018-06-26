import fetch from 'isomorphic-fetch';
import { API_URL } from '@/constants/apiConfig';

export default (prefix = '/featurev1/app/v1') => {
  let fullPrefix = process.env.NODE == 'NODE' ? API_URL + prefix : prefix
  let methods = ['get', 'post', 'del', 'put'];
  let result = {};
  methods.forEach(item => {
    result[item] = wrapMethod(item, fullPrefix);
  });
  return result;
};

function wrapMethod (methodName, prefix) {
  return (url, data = {}, scope = 'snsapi_userinfo') => {
    let fetchObj = {};
    let headers = {};
    let fetchUrl = `${prefix}${url}`;

    headers['Content-type'] = 'application/x-www-form-urlencoded';
    // headers['Cookies'] = 'clientType=3;clientVersion=1;brandType=1';
    // headers.append('cookie', 'clientType=3;clientVersion=1;brandType=1');
    fetchObj.method = methodName;
    if (['get', 'delete'].indexOf(methodName) !== -1) {
      fetchUrl += serialize(data);
    } else {
      fetchObj.body = serialize(data).replace('?', '');
    }
    fetchObj.headers = headers;
    fetchObj.traditional = true;
    fetchObj.credentials = 'include'
    if (process.env.ENV === 'production') {
      fetchObj = {...fetchObj, credentials: 'include'};
    }
    return fetch(fetchUrl, fetchObj)
      .then(res => res.json())
  };
}

function serialize (obj) {
  let str = [];
  let keys = Object.keys(obj);
  if (!keys.length) {
    return '';
  }
  keys.forEach(item => {
    str.push(`${encodeURIComponent(item)}=${encodeURIComponent(obj[item])}`);
  });

  return `?${str.join("&")}`;
}
