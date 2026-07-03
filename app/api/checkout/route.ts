import { NextResponse } from "next/server";
import CheckoutController from "../../../src/controllers/checkout.controller";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const controller = new CheckoutController();
    const result = await controller.handleCheckout(body);

    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro interno do servidor", details: String(error) },
      { status: 500 }
    );
  }
}
