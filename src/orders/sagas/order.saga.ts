import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable, tap } from 'rxjs';
import { OrderCreatedEvent } from '../events/impl/order-created.event';
import { ProcessPaymentCommand } from 'src/payments/commands/impl/process-payment.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderEvents } from '../listeners/constants';

@Injectable()
export class OrderSagas {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Saga()
  orderCreated = (events: Observable<any>): Observable<ICommand> =>
    events.pipe(
      ofType(OrderCreatedEvent),
      tap((event) => this.eventEmitter.emit(OrderEvents.CREATED, event)),
      map((event) => new ProcessPaymentCommand(event.orderId, event.userId)),
    );
}
