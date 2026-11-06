import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


/**
 * author: authorName
 * tableComment: 后台用户表
 * createTime: 2025-11-09 15:03:10
 * */

export class AdminUserVO {

  /**
   * 用户ID
   */
  userId: number;

  /**
   * 用户账号
   */
  accountName: string;


}