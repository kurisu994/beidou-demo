/**
 * 判断当前浏览器是否支持 sticky 属性
 */

function isSupportSticky(): boolean {
  const prefix = ['', '-webkit-', '-ms-', '-moz-', '-o-'];

  let stickyText = '';

  prefix.forEach((item) => {
    stickyText += `position:${item}sticky;`;
  });

  let elem = document.createElement('div');
  elem.style.cssText = `display:none;${stickyText}`;
  document.body.appendChild(elem);
  const isSupport = /sticky/i.test(window.getComputedStyle(elem).position || '');
  document.body.removeChild(elem);

  // @ts-ignore
  elem = null;
  return isSupport;
}

export default isSupportSticky;
