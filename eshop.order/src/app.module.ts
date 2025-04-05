import { Module } from '@nestjs/common';
import { AppService } from './AppService';
import { RabbitMQConsumer, RabbitMQModule } from 'mqmanager-nestjs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderStatusHistory } from './entities/order-status-history.entity';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    RabbitMQModule,
    TypeOrmModule.forFeature([Address, Order, OrderItem, OrderStatusHistory]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'nas',
      port: +process.env.DB_PORT || 54132,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'jacui4Nhftk',
      database: process.env.DB_NAME || 'eshop.orders',
      entities: [Address, Order, OrderItem, OrderStatusHistory],
      synchronize: true,
      ssl: process.env.DB_SSL === 'true',
      extra:
        process.env.DB_SSL === 'true'
          ? {
              ssl: {
                rejectUnauthorized: false,
              },
            }
          : {},
    }),
  ],
  controllers: [],
  providers: [AppService, RabbitMQConsumer, OrderService],
})
export class AppModule {}
