export class CancelOrderCommand {
  constructor(
    public readonly orderId: number,
    public readonly userid: number,
  ) {}
}
