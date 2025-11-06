import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable, tap } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentEvents } from '../listeners/constants';
import { PaymentFailedEvent } from '../events/imple/payment-failed.event';
import { CancelOrderCommand } from 'src/orders/commands/impl/cancel-order.command';

@Injectable()
export class PaymentSagas {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Saga()
  paymentFail = (events: Observable<any>): Observable<ICommand> =>
    events.pipe(
      ofType(PaymentFailedEvent),
      tap((event) => this.eventEmitter.emit(PaymentEvents.FAIL, event)),
      map((event) => new CancelOrderCommand(event.orderId, event.userId)),
    );
}
