// 处理数字金额
function thousands (number) {
  number = String(number);
  var reg = /\d+\d{3}/;
  if(/\./.test(number)) {
    var pos = number.lastIndexOf('.');
    var intPart = number.substr(0, pos);
    var pointPart = number.substr(pos + 1);
    while(reg.test(intPart)) {
      intPart = String(intPart).replace(/(\d+)(\d{3})/, '$1,$2');
    }
    number = intPart + '.' + pointPart;
  }else {
    while(reg.test(number)) {
      number = String(number).replace(/(\d+)(\d{3})/, '$1,$2');
    }
  }
  return number;
}

// 金额转换 传入分 
function moneyTransform (number, type = 'yuan', fix = 0) {
  if(type == 'yuan') {
    number = number / 100;
  } 
  if(type == 'wan') {
    number = number / 100 / 10000;
  }
  return number.toFixed(fix);
}

export {
  thousands,
  moneyTransform
}