import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { ProcessPaymentCommand } from '../impl/process-payment.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PaymentEvents } from 'src/payments/listeners/constants';
import { PaymentFailedEvent } from 'src/payments/events/imple/payment-failed.event';
import { PaymentSuccessEvent } from 'src/payments/events/imple/payment-success.event';

@CommandHandler(ProcessPaymentCommand)
export class ProcessPaymentHandler
  implements ICommandHandler<ProcessPaymentCommand>
{
  constructor(
    private readonly eventBus: EventBus,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: ProcessPaymentCommand) {
    const { orderId, userId } = command;
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve({ orderId, userId });
      }, 100),
    );

    const isSuccess = Math.random() < 0.8;
    if (isSuccess) {
      this.eventEmitter.emit(
        PaymentEvents.SUCCESS,
        new PaymentSuccessEvent(orderId, userId),
      );
    } else {
      this.eventBus.publish(
        new PaymentFailedEvent(orderId, userId, 'ERR_CODE'),
      );
    }
  }
}
