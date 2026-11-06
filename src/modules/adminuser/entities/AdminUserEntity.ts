import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';


/**
 * author: authorName
 * tableComment: 后台用户表
 * createTime: 2025-11-09 15:45:12
 * */
@Entity({ name: 'admin_user' })
export class AdminUserEntity {

  /**
   * 用户ID
   */
  @PrimaryGeneratedColumn({ name: 'user_id' })
  userId: number;

  /**
   * 用户账号
   */
  @Column({ name: 'account_name' })
  accountName: string;

  /**
   * 真实姓名
   */
  @Column({ name: 'real_name' })
  realName: string;

  /**
   * 瀵嗙爜
   */
  @Column({ name: 'password' })
  password: string;

  /**
   * 瀵嗙爜鐩?
   */
  @Column({ name: 'password_salt' })
  passwordSalt: string;

  /**
   * 手机号码
   */
  @Column({ name: 'mobile' })
  mobile: string;

  /**
   * 用户角色：0-超级管理员|1-管理 员|2-开发&测试&运营|3-普通用户（只能查看）
   */
  @Column({ name: 'role' })
  role: number;

  /**
   * 状态：0-失效|1-有效|2-删 除
   */
  @Column({ name: 'user_status' })
  userStatus: number;

  /**
   * 创建人ID
   */
  @Column({ name: 'create_by' })
  createBy: number;

  /**
   * 创建时间
   */
  @Column({ name: 'create_time' })
  createTime: Date;

  /**
   * 修改人ID
   */
  @Column({ name: 'update_by' })
  updateBy: number;

  /**
   * 修改时间
   */
  @Column({ name: 'update_time' })
  updateTime: Date;

}