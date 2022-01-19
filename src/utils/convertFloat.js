export const convertToFloatValue = (value,fix) => {
  const numberFormat = (value) => new Intl.NumberFormat().format(value);
  const floatValue = parseFloat(value);
  if (floatValue === 0) {
    return 0;
  } else if (Math.abs(floatValue) <= 0.001) {
    return floatValue.toFixed(8);
  } else {
    return numberFormat(floatValue.toFixed(fix||2));
  }
};

export const numberFormat = (num) => {
  if(num >= 10000){
    return toFixed1(num / 1000) + 'k'
  }else{
    return convertToFloatValue(num,1)
  }
}

export const toFixed1 = (num) => {
  num = num.toString()
  const index = num.indexOf('.')
  if (index !== -1) {
    num = num.substring(0, index + 2)
    return parseFloat(num).toFixed(1)
  } else {
    num = num.substring(0)
    return parseFloat(num)
  }
}

export const rmoney = (s) => {
  s = s+''
  if(s.indexOf('$')!==-1){
    s = s.slice(1)
  }
  return parseFloat(s.replace(/[^\d\\.-]/g, ""));
}

export const truncate = (text = '',[h, t] = [6, 6])=> {
  const head = text.slice(0, h);
  const tail = text.slice(-1 * t, text.length);
  return text.length > h + t ? [head, tail].join('...') : text;
}
