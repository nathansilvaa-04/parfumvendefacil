export interface RequestCheckoutItemDTO {
  description: string;
  price: number;
  quantity: number;
}

export interface RequestCheckoutDTO {
  items: RequestCheckoutItemDTO[];
  origin: string;
}

export interface ResponseCheckoutDTO {
  url?: string;
  error?: string;
  details?: any;
}

export default class CheckoutDTO {}
