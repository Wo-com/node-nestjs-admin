const { generateEntityClassCode } = require("./template/entity");
const { generateServiceCode } = require("./template/service");
const { toCamelCase,toCapitalCase,formatDateTime,removeUnderscore } = require("./util");

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const { Controller } = require("@nestjs/common");

// 数据库配置
const config = {
  host: '172.16.2.231',
  user: 'root',
  password: '123456',
  database: 'stock',
  port: 3306,
  charset: 'utf8mb4'
};

// 要查询的表名和生成的类名
const tableInfo = {
  tableName: 'market_data',
  tableComment: '',
  columns:[]
}

const className = toCamelCase(tableInfo.tableName)
const ClassName = toCapitalCase(tableInfo.tableName);

const codeInfo = {
  author: 'authorName',
  createTime : formatDateTime(new Date()) ,
  className : className,
  ClassName : ClassName,
  // entityName : `${className}Entity`,
  // EntityName : `${ClassName}Entity`,
  // serviceName : `${className}Service`,
  // ServiceName : `${ClassName}Service`,
  // controllerName : `${className}Controller`,
  // ControllerName : `${ClassName}Controller`,
  genCodePath : '../src/modules/',
  moduleName : removeUnderscore(tableInfo.tableName)
}

/**
 * 获取表注释
 */
async function getTableComment(connection) {
  const [rows] = await connection.query(
    `SELECT TABLE_COMMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?`,
    [config.database, tableInfo.tableName]
  );
  if (rows.length > 0) {
    return rows[0].TABLE_COMMENT || '';
  }
  return '';
}

/**
 * 确保目录存在
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 读取数据库结构，生成并保存Entity和Service代码
 */
async function generateFromDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('数据库连接成功！');

    // 检查表是否存在
    const [tables] = await connection.query(
      `SHOW TABLES LIKE ${connection.escape(tableInfo.tableName)}`
    );
    if (tables.length === 0) {
      console.log(`表 ${tableInfo.tableName} 不存在于数据库 ${config.database} 中`);
      return;
    }

    // 读取表结构（包含字段注释等）
    const [columns] = await connection.query(
      `SHOW FULL COLUMNS FROM ${connection.escapeId(tableInfo.tableName)}`
    );
    tableInfo.columns = columns;
  

    // 获取表注释
    tableInfo.tableComment = await getTableComment(connection);

    // 生成 entity 代码
    const entityCode = generateEntityClassCode(tableInfo, codeInfo);
    const entityDir = path.resolve(__dirname, codeInfo.genCodePath, codeInfo.moduleName, 'entities');
    const entityPath = path.resolve(entityDir, `${codeInfo.ClassName}Entity.ts`);
    ensureDir(entityDir);
    fs.writeFileSync(entityPath, entityCode, 'utf8');
    console.log(`实体类已生成: ${entityPath}`);

    // 生成 service 代码
    const serviceCode = generateServiceCode(tableInfo, codeInfo);
    const serviceDir = path.resolve(__dirname, codeInfo.genCodePath, codeInfo.moduleName);
    const servicePath = path.resolve(serviceDir, `${codeInfo.ClassName}Service.ts`);
    ensureDir(serviceDir);
    fs.writeFileSync(servicePath, serviceCode, 'utf8');
    console.log(`Service类已生成: ${servicePath}`);

    // 生成 controller 代码
    const { generateControllerCode } = require('./template/controller');
    const controllerCode = generateControllerCode(tableInfo, codeInfo);
    const controllerDir = path.resolve(__dirname, codeInfo.genCodePath, codeInfo.moduleName);
    const controllerPath = path.resolve(controllerDir, `${codeInfo.ClassName}Controller.ts`);
    ensureDir(controllerDir);
    fs.writeFileSync(controllerPath, controllerCode, 'utf8');
    console.log(`Controller类已生成: ${controllerPath}`);

    // 生成 module 代码
    const { generateModuleCode } = require('./template/module');
    const moduleCode = generateModuleCode(codeInfo.ClassName);
    const moduleDir = path.resolve(__dirname, codeInfo.genCodePath, codeInfo.moduleName);
    const modulePath = path.resolve(moduleDir, `${codeInfo.ClassName}Module.ts`);
    ensureDir(moduleDir);
    fs.writeFileSync(modulePath, moduleCode, 'utf8');
    console.log(`Module类已生成: ${modulePath}`);


 
  } catch (error) {
    console.error('生成过程出错:', error);
  } finally {
    if (connection) await connection.end();
  }
}

// 执行
generateFromDatabase();