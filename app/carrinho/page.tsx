"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { getRecomendacoes } from "@/app/actions";
import { ResponseRecomendacaoDTO } from "@/src/dtos/recomendacao.dto";

export default function Carrinho() {
  const { items, adicionar, remover, atualizarQuantidade, limpar, total, totalItens } =
    useCart();
  const [finalizando, setFinalizando] = useState(false);

  const maisCaro =
    items.length > 0
      ? items.reduce((a, b) => (a.produto.preco > b.produto.preco ? a : b))
      : null;

  const [recomendacoes, setRecomendacoes] = useState<ResponseRecomendacaoDTO>([]);

  useEffect(() => {
    if (maisCaro) {
      getRecomendacoes(maisCaro.produto.id, 3).then(setRecomendacoes).catch(() => setRecomendacoes([]));
    } else {
      setRecomendacoes([]);
    }
  }, [maisCaro?.produto.id]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black text-gold-400 py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-widest hover:text-gold-200 transition-colors">
            <span>🧴</span>
            <span>ELEGANZA</span>
          </Link>
          <div className="flex items-center gap-1 text-lg">
            <span>🛒</span>
            <span className="text-sm font-normal">
              {totalItens} {totalItens === 1 ? "item" : "itens"}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Carrinho de Compras
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-8xl block mb-4">🛒</span>
            <p className="text-xl text-gray-500 mb-6">Seu carrinho está vazio</p>
            <Link
              href="/"
              className="bg-black hover:bg-gray-800 text-gold-400 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.produto.id}
                  className="border border-gray-200 rounded-xl p-4 flex items-center gap-4"
                >

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.produto.nome}
                    </h2>
                    <span className="text-sm text-gold-500 font-medium">
                      {item.produto.categoria}
                    </span>
                    <div className="text-base font-bold text-gold-400 mt-1">
                      R$ {item.produto.preco.toFixed(2).replace(".", ",")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        atualizarQuantidade(item.produto.id, item.quantidade - 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-800">
                      {item.quantidade}
                    </span>
                    <button
                      onClick={() =>
                        atualizarQuantidade(item.produto.id, item.quantidade + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 font-bold text-gray-700 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right min-w-[90px]">
                    <div className="text-lg font-bold text-gray-800">
                      R${" "}
                      {(item.produto.preco * item.quantidade)
                        .toFixed(2)
                        .replace(".", ",")}
                    </div>
                    <button
                      onClick={() => remover(item.produto.id)}
                      className="text-sm text-red-500 hover:text-red-700 mt-1 transition-colors"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center text-xl font-bold text-gray-800 mb-6">
                <span>Total:</span>
                <span className="text-gold-400">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => limpar()}
                  className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Limpar carrinho
                </button>
                <button
                  onClick={async () => {
                    if (finalizando) return;
                    setFinalizando(true);
                    try {
                      const res = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          origin: window.location.origin,
                          items: items.map((item) => ({
                            description: item.produto.nome,
                            price: Math.round(item.produto.preco * 100),
                            quantity: item.quantidade,
                          })),
                        }),
                      });
                      const data = await res.json();
                      if (data.url) {
                        window.location.href = data.url;
                      } else {
                        alert("Erro ao gerar checkout: " + (data.error || "tente novamente"));
                        setFinalizando(false);
                      }
                    } catch {
                      alert("Erro de conexão. Tente novamente.");
                      setFinalizando(false);
                    }
                  }}
                  disabled={finalizando}
                  className="flex-1 bg-gold-400 hover:bg-gold-500 disabled:bg-gold-200 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {finalizando ? "Gerando checkout..." : "Finalizar compra"}
                </button>
              </div>
            </div>
          </>
        )}

        {recomendacoes.length > 0 && (
          <div className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Adicione mais a sua compra
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recomendacoes.map((produto) => (
                <div
                  key={produto.id}
                  className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:shadow-md transition-shadow"
                >

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">
                      {produto.nome}
                    </p>
                    <p className="text-gold-400 font-bold text-sm">
                      R$ {produto.preco.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <button
                    onClick={() => adicionar(produto)}
                    className="bg-gold-400 hover:bg-gold-500 text-black font-semibold text-xs py-2 px-3 rounded-lg transition-colors whitespace-nowrap"
                  >
                    + Adicionar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-black text-gold-400 py-4 px-6 text-center text-sm">
        Feito com ❤ na aula de IA do SENAI
      </footer>
    </div>
  );
}
