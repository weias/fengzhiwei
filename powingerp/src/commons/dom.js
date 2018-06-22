export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }

  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}

export function getData(el, name, val) {
  let prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}

/**
 * 限制input输入保留两位小数
 * @param e
 */
export function priceFilter(e) {
  e.target.value = e.target.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  e.target.value = e.target.value.replace(/^\./g, ""); //验证第一个字符是数字
  e.target.value = e.target.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
  e.target.value = e.target.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}
