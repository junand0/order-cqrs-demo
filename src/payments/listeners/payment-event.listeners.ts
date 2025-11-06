import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PaymentEvents } from './constants';
import { PaymentSuccessEvent } from '../events/imple/payment-success.event';
import { PaymentFailedEvent } from '../events/imple/payment-failed.event';

@Injectable()
export class PaymentEventListeners {
  @OnEvent(PaymentEvents.SUCCESS)
  handlePaymentSuccessEvent(event: PaymentSuccessEvent) {
    console.log(`${event.orderId} ${event.userId}`);
  }

  @OnEvent(PaymentEvents.FAIL)
  handlePaymentFailEvent(event: PaymentFailedEvent) {
    console.log(`${event.orderId} ${event.userId} ${event.code}`);
  }
}
