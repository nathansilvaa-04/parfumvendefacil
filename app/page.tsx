"use client";

import Link from "next/link";
import { produtos } from "@/lib/produtos";
import { useCart } from "@/lib/cart-context";
import { recomendar } from "@/lib/recomendacao";

export default function Home() {
  const { adicionar, totalItens } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-indigo-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold">
            <span>🧴</span>
            <span>VendeFácil</span>
          </div>
          <Link
            href="/carrinho"
            className="relative flex items-center gap-1 text-lg hover:text-yellow-400 transition-colors"
          >
            <span>🛒</span>
            {totalItens > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {totalItens}
              </span>
            )}
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nossos Perfumes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => {
            const relacionados = recomendar(produto.id, 3);
            return (
              <div
                key={produto.id}
                className="group border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-6xl mb-4">{produto.imagem_emoji}</span>
                <h2 className="text-lg font-semibold text-gray-800">
                  {produto.nome}
                </h2>
                <span className="text-sm text-indigo-600 font-medium mt-1">
                  {produto.categoria}
                </span>
                <span className="text-xl font-bold text-yellow-400 mt-3">
                  R$ {produto.preco.toFixed(2).replace(".", ",")}
                </span>
                <button
                  onClick={() => adicionar(produto)}
                  className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-4 rounded-lg transition-colors w-full"
                >
                  Adicionar ao carrinho
                </button>

                <div className="w-full max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 ease-in-out">
                  <hr className="border-gray-200" />
                  <p className="text-xs font-semibold text-gray-400 mt-3 mb-2">
                    Você também pode gostar
                  </p>
                  <div className="flex flex-col gap-2">
                    {relacionados.map((rec) => (
                      <div key={rec.id} className="flex items-center gap-2 text-sm">
                        <span>{rec.imagem_emoji}</span>
                        <span className="text-gray-700 truncate">{rec.nome}</span>
                        <span className="text-yellow-400 font-bold ml-auto text-xs">
                          R$ {rec.preco.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="bg-indigo-600 text-white py-4 px-6 text-center text-sm">
        Feito com ❤ na aula de IA do SENAI
      </footer>
    </div>
  );
}
