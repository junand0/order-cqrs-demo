import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedEvent } from '../events/impl/order-created.event';
import { OrderEvents } from './constants';

@Injectable()
export class OrderEventListeners {
  @OnEvent(OrderEvents.CREATED)
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    console.log(`Created: ${event.orderId}, ${event.userId}`);
  }

  @OnEvent(OrderEvents.FAILED)
  handleOrderFailedEvent(event: OrderCreatedEvent) {
    console.log(`Failed: ${event.orderId}, ${event.userId}`);
  }
}
