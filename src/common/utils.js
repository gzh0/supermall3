export function /* 防抖函数 delay是指传入的延迟时间 */
debounce(func,delay) {
  let timer = null

  return function(...args) {
    //如果timer不为空 就清除之前的timer
    if(timer) clearTimeout(timer)
    timer = setTimeout(() =>{
      func.apply(this,args)
    },delay)
  }
}