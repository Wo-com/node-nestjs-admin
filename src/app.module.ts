import { Module } from '@nestjs/common';
import { AdminUserModule } from './modules/adminuser/AdminUserModule';
import { MarketDataModule } from './modules/marketdata/MarketDataModule';
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    AdminUserModule,MarketDataModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.10.124',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'stock',
      synchronize: false,//很关键不然修改表结构
      logging: true,
      entities: [__dirname + '/**/*Entity{.ts,.js}'], // 实体文件路径
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
