//类型map
const TYPE_MAP = {
  int: 'number',
  tinyint: 'number',
  smallint: 'number',
  mediumint: 'number',
  bigint: 'number',
  float: 'number',
  double: 'number',
  decimal: 'number',
  char: 'string',
  varchar: 'string',
  text: 'string',
  mediumtext: 'string',
  longtext: 'string',
  timestamp: 'Date',
  datetime: 'Date',
  date: 'Date',
  time: 'string',
  json: 'any',
};



// 类型转化，mysql>js
function getJsBaseType(type){
  const match = /^([a-zA-Z]+)/.exec(type || '');
  const baseType = match ? match[1].toLowerCase() : type;
  return TYPE_MAP[baseType] || 'any';
}


// 下划线转驼峰
function toCamelCase(field) {
  if (!field) return '';
  return field.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

//下划线转驼峰-首字母大写
function toCapitalCase(field) {
  if (!field) return '';
  return field.split('_').map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join('');
}

// 去除下划线并转小写
function removeUnderscore(str) {
  if (!str) return '';
  return str.replace(/_/g, '').toLowerCase();
}



//可以编写自定义函数来格式化日期时间。例如：
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
}
function pad(num) { return num.toString().padStart(2, '0')}




module.exports = {
  TYPE_MAP,
  getJsBaseType,
  toCamelCase,
  formatDateTime,
  toCapitalCase,
  removeUnderscore
};

