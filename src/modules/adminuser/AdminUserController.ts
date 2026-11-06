import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminUserService } from './AdminUserService';
import { AdminUserEntity } from './entities/AdminUserEntity';

@Controller('adminuser')
export class AdminUserController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post()
  async create(@Body() body: AdminUserEntity) {
    return await this.adminUserService.create();
  }

  @Post()
  async findAll() {
    return await this.adminUserService.findAll();
  }

  @Post('getOne')
  async findOne(@Param('id') id: number) {
    return await this.adminUserService.findOne(Number(id));
  }

  @Post()
  async update(@Param('id') id: number, @Body() body: AdminUserEntity) {
    return await this.adminUserService.update(Number(id), body);
  }

  @Post()
  async remove(@Param('id') id: number) {
    return await this.adminUserService.remove(Number(id));
  }
}
