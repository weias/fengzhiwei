import _ from 'lodash';

const methods = {
  //  判断设备
  device () {
    let _agent = navigator.userAgent;

    if (/Android/i.test(_agent)) {
      return 'android';
    } else if (/iPhone|iPad|iPod/i.test(_agent)) {
      return 'ios';
    } else if (/IEMobile/i.test(_agent)) {
      return 'wp';
    } else {
      return 'desktop';
    }
  },
  //  判断是否处于微信浏览器
  isWeixin () {
    let ua = window.navigator.userAgent.toLowerCase();

    return ua.match(/MicroMessenger/i) == 'micromessenger';
  },
  //  判断设备是否横屏
  isLandscape () {
    return window.innerWidth > window.innerHeight;
  },

  //  表单字段是否为空
  isInvalidForm (formObj, { include = [], exclude = [] } = {}) {
    if (exclude.length > 0) {
      return _.some(Object.keys(formObj), key => {
        return _.indexOf(exclude, key) === -1 && !methods.hasValue(formObj[key]);
      });
    } else if (include.length > 0) {
      return _.some(include, key => {
        return !methods.hasValue(formObj[key]);
      });
    } else {
      return _.some(Object.keys(formObj), key => {
        return !methods.hasValue(formObj[key]);
      });
    }
  },

  hasValue (data) {
    return Array.isArray(data) ? data.length > 0 : !!data;
  },

  GetDateDiff (time) {
    return time.replace(/\-/g, '/');
  },

  getTimeout (num) {
    let time = this.device() === 'ios' ? this.GetDateDiff(num) : num;
    let now = new Date().getTime();
    let last = new Date(time).getTime();
    let theTime = parseInt(Math.abs(now - last) / 1000);
    let suffix = now > last ? '前' : '';
    let theTime1 = 0;
    let theTime2 = 0;
    if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
        theTime2 = parseInt(theTime1 / 60);
        theTime1 = parseInt(theTime1 % 60);
      }
    }
    let result = `${parseInt(theTime)}秒${suffix}`;
    if (theTime1 > 0) {
      result = `${parseInt(theTime1)}分钟${suffix}`;
    }
    if (theTime2 > 0) {
      result = `${parseInt(theTime2)}小时${suffix}`;
    }
    if (parseInt(theTime2) > 24) {
      result = `${parseInt(parseInt(theTime2) / 24)}天${suffix}`;
    }
    return result;
  },

  //  秒数格式化
  formatSeconds (second) {
    let s = parseInt(second % 3600 % 60);
    s = s < 10 ? `0${s}` : s;
    let m = parseInt(second % 3600 / 60);
    m = m < 10 ? `0${m}` : m;
    let h = parseInt(second / 3600);
    h = h < 10 ? `0${h}` : h;
    if (second < 3600) {
      return `${m}:${s}`;
    } else {
      return `${h}:${m}:${s}`;
    }
  },
  //  时间撮格式化
  formatTime (time) {
    if (Number(time)) {
      let tmp_time = new Date(time);
      let year = tmp_time.getFullYear();
      let month = tmp_time.getMonth() + 1 < 10 ? `0${tmp_time.getMonth() + 1}` : tmp_time.getMonth() + 1;
      let date = tmp_time.getDate() < 10 ? `0${tmp_time.getDate()}` : tmp_time.getDate();
      let hour = tmp_time.getHours() < 10 ? `0${tmp_time.getHours()}` : tmp_time.getHours();
      let minute = tmp_time.getMinutes() < 10 ? `0${tmp_time.getMinutes()}` : tmp_time.getMinutes();
      return `${year}-${month}-${date} ${hour}:${minute}`;
    }
    return '';
  },

  /**
   * @memberof methods
   * @function newDate 把"2017-05-05 12:12:12"这样的字符串转换成对应的Date实例。该方法主要是用来解决低版本IOS处理"2017-05-05 12:12:12"格式的时间会返回null的问题
   * @return {Date}
   */
  newDate (dateStr) {
    let time = new Date(dateStr);

    if (time > 0) {
      return time;
    }

    let timeMatch = dateStr.match(/^([0-9]{4})-([0-9]+)-([0-9]+)\s+([0-9]+):([0-9]+):([0-9]+)/);
    if (timeMatch) {
      let matchYear = parseInt(timeMatch[1]);
      let matchMonth = parseInt(timeMatch[2]);
      let matchDate = parseInt(timeMatch[3]);
      let matchHour = parseInt(timeMatch[4]);
      let matchMinute = parseInt(timeMatch[5]);

      time = new Date();
      time.setFullYear(matchYear);
      time.setMonth(matchMonth - 1);
      time.setDate(matchDate);
      time.setHours(matchHour);
      time.setMinutes(matchMinute);
    }

    if (time > 0) {
      return time;
    }
  },

  /**
   * @memberof methods
   * @function getUrlParams 获取页面路由中的参数并返回对象
   * @return {Date}
   */
  getUrlParams (url) {
    let tmp_url = url.replace(/#.*/, '').replace(/.*\?/, '');
    let arr = tmp_url.split('&');
    let obj = {};
    _.each(arr, item => {
      obj[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
    });
    return obj;
  },
}

export default methods;
