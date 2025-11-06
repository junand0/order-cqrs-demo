import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor() {}

  async checkOrderValidity(orderId: number) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(orderId);
      }, 100),
    );
    return true;
  }

  async checkUserValidity(userId: number) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve(userId);
      }, 100),
    );
    return true;
  }

  async createOrder(orderId: number, userId: number) {
    await new Promise((resolve) =>
      setTimeout(() => {
        resolve({ orderId, userId });
      }, 100),
    );
    return orderId;
  }
}
