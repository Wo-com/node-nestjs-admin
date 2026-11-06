/**
 * 生成NestJS模块代码的模板函数
 * @param {string} className - 模块的类名（首字母大写, 如 AdminUser）
 * @returns {string} - 生成的module.ts代码字符串
 */
function generateModuleCode(className) {
  const moduleName = className.toLowerCase();
  const entityName = `${className}Entity`;

  return `import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${className}Service } from './${className}Service';
import { ${className}Controller } from './${className}Controller';
import { ${entityName} } from './entities/${entityName}';

@Module({
  imports: [TypeOrmModule.forFeature([${entityName}])],
  controllers: [${className}Controller],
  providers: [${className}Service],
  exports: [${className}Service],
})
export class ${className}Module {}
`;
}

module.exports = {
  generateModuleCode,
};
