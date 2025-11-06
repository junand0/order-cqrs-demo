export class PaymentFailedEvent {
  constructor(
    public readonly orderId: number,
    public readonly userId: number,
    public readonly code: string,
  ) {}
}
