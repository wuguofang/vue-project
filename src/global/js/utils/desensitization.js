// 脱敏处理 start表示显示哪一位开始 lastStart表示显示倒数哪几位
function desensitization (str, start, lastStart) {
  str = String(str)
  let len = str.length
  let times = len - start - lastStart
  if(times > 0) {
    let stars = times > 0 ? times :  0
    return str.substring(0, start) + '*'.repeat(stars) + str.substring(str.length - lastStart)
  }else {
    return str
  }
}
export default desensitization