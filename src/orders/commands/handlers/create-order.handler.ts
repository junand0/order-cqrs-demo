import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impl/create-order.command';
import { OrderCreatedEvent } from 'src/orders/events/impl/order-created.event';
import { OrdersService } from 'src/orders/orders.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderFailedEvent } from 'src/orders/events/impl/order-failed.event';
import { OrderEvents } from 'src/orders/listeners/constants';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly eventBus: EventBus,
    private readonly orderService: OrdersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: CreateOrderCommand): Promise<{ orderId: number }> {
    const { userId } = command;
    const orderId = Math.floor(Math.random() * 1000);

    const [isValidOrder, isValidUser] = await Promise.all([
      this.orderService.checkOrderValidity(orderId),
      this.orderService.checkUserValidity(userId),
    ]);

    if (isValidOrder && isValidUser) {
      await this.orderService.createOrder(orderId, userId);
    } else {
      this.eventEmitter.emit(
        OrderEvents.FAILED,
        new OrderFailedEvent(orderId, userId, 'ERR_CODE'),
      );
    }

    this.eventBus.publish(new OrderCreatedEvent(orderId, userId));

    return { orderId };
  }
}
