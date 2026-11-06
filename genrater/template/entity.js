const { getJsBaseType,toCamelCase } = require("../util");


// 字段类型
function buildDecorator(column) {
  let decorator;
  if (column.Key === 'PRI') {
    // 主键两种情况: 有自增则用 PrimaryGeneratedColumn，否则 PrimaryColumn
    decorator = (column.Extra || '').includes('auto_increment')? 'PrimaryGeneratedColumn': 'PrimaryColumn';
  } else {
    decorator = 'Column';
  }
  return `@${decorator}({ name: '${column.Field}' })`;
}


// 代码模板
function generateEntityClassCode(tableInfo,codeInfo) {
  const header = 
`import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


/**
 * author: ${codeInfo.author}
 * tableComment: ${tableInfo.tableComment}
 * createTime: ${codeInfo.createTime}
 * */
@Entity({ name: '${tableInfo.tableName}' })
export class ${codeInfo.ClassName}Entity {\n
`;

  const body = tableInfo.columns.map(column => {
    return `  /**
   * ${column.Comment || column.Field}
   */
  ${buildDecorator(column)}
  ${toCamelCase(column.Field)}${column.Null === 'YES' ? '?' : ''}: ${getJsBaseType(column.Type)};

`;
  }).join('');
  return `${header}${body}}`;
}

module.exports = { generateEntityClassCode };
