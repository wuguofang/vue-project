/**
 * @description   时间戳
 */

function genUUID () {
  function tempFunction () {
    var uuidIndex = 1// 闭包保存
    return function innerFunction () {
      return (new Date().getTime() + '' + uuidIndex++)
    }
  }

  return tempFunction()
}

module.exports = {
  uuid: genUUID()
}
