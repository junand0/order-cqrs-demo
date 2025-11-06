import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PaymentSagas } from './sagas/payment.saga';

@Module({ imports: [CqrsModule], providers: [PaymentSagas] })
export class PaymentModule {}
