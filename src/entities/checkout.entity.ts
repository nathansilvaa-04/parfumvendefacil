import BaseEntity from "./base.entity";

export class CheckoutItem {
  description!: string;
  price!: number;
  quantity!: number;
}

export default class Checkout extends BaseEntity {
  items!: CheckoutItem[];
  origin!: string;
  orderNsu!: string;
  status!: string;
}
