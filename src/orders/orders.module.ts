import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { OrdersService } from './orders.service';
import { OrderSagas } from './sagas/order.saga';

@Module({
  controllers: [OrdersController],
  imports: [CqrsModule],
  providers: [OrdersService, OrderSagas],
})
export class OrdersModule {}
