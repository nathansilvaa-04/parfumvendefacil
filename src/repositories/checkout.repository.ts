import Checkout from "../entities/checkout.entity";

export default class CheckoutRepository {
  async createPaymentSession(checkout: Checkout): Promise<{ url?: string; error?: string; details?: any }> {
    const apiUrl = process.env.INFINITEPAY_API_URL;
    const handle = process.env.INFINITEPAY_HANDLE;

    if (!apiUrl || !handle) {
      return { error: "Configuração do checkout ausente" };
    }

    const payload = {
      handle,
      order_nsu: checkout.orderNsu,
      redirect_url: `${checkout.origin}/carrinho/sucesso`,
      webhook_url: `${checkout.origin}/api/webhook`,
      items: checkout.items.map(item => ({
        description: item.description,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: "Erro ao criar checkout", details: data };
      }

      const checkoutUrl = data["https://app.infinitepay.io/home"];
      if (!checkoutUrl) {
        return { error: "URL de checkout não encontrada na resposta", details: data };
      }

      return { url: checkoutUrl };
    } catch (error) {
      return { error: "Erro interno do servidor", details: String(error) };
    }
  }
}
