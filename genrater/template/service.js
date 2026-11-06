
// 生成 Service 代码
function generateServiceCode(tableInfo, codeInfo) {

  
  return `import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ${codeInfo.ClassName}Entity } from './entities/${codeInfo.ClassName}Entity';

/**
 * author: ${codeInfo.author}
 * tableComment: ${tableInfo.tableComment}
 * createTime: ${codeInfo.createTime}
 */
@Injectable()
export class ${codeInfo.ClassName}Service {
  @InjectEntityManager()
  private manager: EntityManager;

  /**
   * 创建
   */
  async create( ) {
    return '';
  }

  /**
   * 查询所有
   */
  async findAll() {
    return await this.manager.find(${codeInfo.ClassName}Entity);
  }

  /**
   * 根据ID查询
   */
  async findOne( id : number) {
    return await this.manager.findOne(${codeInfo.ClassName}Entity, {
      where: { id : 1 } as any,
    });
  }

  /**
   * 更新
   */
  async update( id: number, ${codeInfo.className}Entity: ${codeInfo.ClassName}Entity) {
    await this.manager.update(${codeInfo.ClassName}Entity, id, ${codeInfo.className}Entity);
    return await this.findOne( id );
  }

  /**
   * 删除
   */
  async remove( id : number ) {
    return await this.manager.remove(
      await this.findOne( id )
    );
  }
}
`;

}

module.exports = { generateServiceCode };

