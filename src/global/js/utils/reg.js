/**
 * @description   统一存放正则
 */

// 手机号
const mobileReg = /^1[3456789]\d{9}$/
// 密码校验 数字加字母
const pswReg = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]/
// 身份证号
const certNumberReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/

export {
  mobileReg,
  pswReg,
  certNumberReg
}
