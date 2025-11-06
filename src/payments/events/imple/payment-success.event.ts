export class PaymentSuccessEvent {
  constructor(
    public readonly orderId: number,
    public readonly userId: number,
  ) {}
}
