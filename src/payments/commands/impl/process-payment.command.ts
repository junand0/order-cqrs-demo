export class ProcessPaymentCommand {
  constructor(
    public readonly orderId: number,
    public readonly userId: number,
  ) {}
}
