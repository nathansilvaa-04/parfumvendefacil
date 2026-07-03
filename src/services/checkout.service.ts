import CheckoutRepository from "../repositories/checkout.repository";
import { RequestCheckoutDTO, ResponseCheckoutDTO } from "../dtos/checkout.dto";
import Checkout from "../entities/checkout.entity";

export default class CheckoutService {
  private repository: CheckoutRepository;

  constructor() {
    this.repository = new CheckoutRepository();
  }

  async processCheckout(data: RequestCheckoutDTO): Promise<ResponseCheckoutDTO> {
    if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
      return { error: "Carrinho vazio" };
    }

    const checkout = new Checkout();
    checkout.items = data.items;
    checkout.origin = data.origin;
    checkout.orderNsu = `pedido_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    checkout.status = "PENDING";

    const result = await this.repository.createPaymentSession(checkout);
    return result;
  }
}
