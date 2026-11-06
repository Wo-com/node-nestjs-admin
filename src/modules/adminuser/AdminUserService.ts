import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { AdminUserEntity } from './entities/AdminUserEntity';

/**
 * author: authorName
 * tableComment: 后台用户表
 * createTime: 2025-11-09 15:45:12
 */
@Injectable()
export class AdminUserService {
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
    return await this.manager.find(AdminUserEntity);
  }

  /**
   * 根据ID查询
   */
  async findOne( id : number) {
    return await this.manager.findOne(AdminUserEntity, {
      where: { userId:1 } as any,
    });
  }

  /**
   * 更新
   */
  async update( id: number, adminUserEntity: AdminUserEntity) {
    await this.manager.update(AdminUserEntity, id, adminUserEntity);
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
