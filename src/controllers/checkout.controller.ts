import CheckoutService from "../services/checkout.service";
import { RequestCheckoutDTO, ResponseCheckoutDTO } from "../dtos/checkout.dto";

export default class CheckoutController {
  private service: CheckoutService;

  constructor() {
    this.service = new CheckoutService();
  }

  async handleCheckout(reqBody: RequestCheckoutDTO): Promise<{ status: number; body: ResponseCheckoutDTO }> {
    const response = await this.service.processCheckout(reqBody);
    
    if (response.error) {
      let status = 500;
      if (response.error === "Carrinho vazio") status = 400;
      return { status, body: response };
    }

    return { status: 200, body: response };
  }
}
