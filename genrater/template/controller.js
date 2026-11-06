/**
 * 生成NestJS风格的Controller代码
 * @param {object} tableInfo - 表结构相关信息
 * @param {object} codeInfo - 代码生成相关信息
 * @returns {string} - Controller代码字符串
 */
function generateControllerCode(tableInfo, codeInfo) {
  return `import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ${codeInfo.ClassName}Service } from './${codeInfo.ClassName}Service';
import { ${codeInfo.ClassName}Entity } from './entities/${codeInfo.ClassName}Entity';

@Controller('${codeInfo.moduleName}')
export class ${codeInfo.ClassName}Controller {
  constructor(private readonly ${codeInfo.className}Service: ${codeInfo.ClassName}Service) {}

  @Post()
  async create(@Body() body: ${codeInfo.ClassName}Entity) {
    return await this.${codeInfo.className}Service.create();
  }

  @Post('getAll')
  async findAll() {
    return await this.${codeInfo.className}Service.findAll();
  }

  @Post('getOne')
  async findOne(@Param('id') id: number) {
    return await this.${codeInfo.className}Service.findOne(Number(id));
  }

  @Post()
  async update(@Param('id') id: number, @Body() body: ${codeInfo.ClassName}Entity) {
    return await this.${codeInfo.className}Service.update(Number(id), body);
  }

  @Post()
  async remove(@Param('id') id: number) {
    return await this.${codeInfo.className}Service.remove(Number(id));
  }
}
`;
}



module.exports = {
  generateControllerCode
};
