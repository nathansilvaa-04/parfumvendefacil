import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, origin } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }

    const apiUrl = process.env.INFINITEPAY_API_URL;
    const handle = process.env.INFINITEPAY_HANDLE;

    if (!apiUrl || !handle) {
      return NextResponse.json(
        { error: "Configuração do checkout ausente" },
        { status: 500 }
      );
    }

    const order_nsu = `pedido_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const payload = {
      handle,
      order_nsu,
      redirect_url: `${origin}/carrinho/sucesso`,
      webhook_url: `${origin}/api/webhook`,
      items: items.map((item: { description: string; price: number; quantity: number }) => ({
        description: item.description,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao criar checkout", details: data },
        { status: response.status }
      );
    }

    const checkoutUrl = data["https://app.infinitepay.io/home"];

    if (!checkoutUrl) {
      return NextResponse.json(
        { error: "URL de checkout não encontrada na resposta", data },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor", details: String(error) },
      { status: 500 }
    );
  }
}
