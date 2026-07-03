"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { ResponseProdutoDTO } from "@/src/dtos/produto.dto";
import { ResponseRecomendacaoDTO } from "@/src/dtos/recomendacao.dto";

interface HomeClientProps {
  produtos: ResponseProdutoDTO[];
  recomendacoesMap: Record<number, ResponseRecomendacaoDTO>;
}

export default function HomeClient({ produtos, recomendacoesMap }: HomeClientProps) {
  const { adicionar, totalItens } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [busca, setBusca] = useState(searchParams.get("busca") || "");
  const [classe, setClasse] = useState(searchParams.get("classe") || "Todas");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (busca) params.set("busca", busca);
    if (classe && classe !== "Todas") params.set("classe", classe);
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black text-gold-400 py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-widest">
            <span>🧴</span>
            <span>ELEGANZA</span>
          </div>
          <Link
            href="/carrinho"
            className="relative flex items-center gap-1 text-lg hover:text-gold-200 transition-colors"
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

        <form onSubmit={handleSearch} className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400"
          />
          <select
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            className="w-full md:w-auto px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white"
          >
            <option value="Todas">Todas as Classes</option>
            <option value="Parfum">Parfum</option>
            <option value="Eau de Parfum">Eau de Parfum</option>
            <option value="Eau de Toilette">Eau de Toilette</option>
            <option value="Eau de Cologne">Eau de Cologne</option>
          </select>
          <button type="submit" className="w-full md:w-auto bg-black hover:bg-gray-800 text-gold-400 font-semibold py-3 px-8 rounded-lg transition-colors">
            Filtrar
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {produtos.map((produto) => {
            const relacionados = recomendacoesMap[produto.id] || [];
            return (
              <div
                key={produto.id}
                className="group border border-gold-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-6xl mb-4">{produto.imagem_emoji}</span>
                <h2 className="text-lg font-semibold text-gray-800">
                  {produto.nome}
                </h2>
                <span className="text-sm text-gold-500 font-medium mt-1">
                  {produto.categoria}
                </span>
                <span className="text-xs text-gray-500 font-semibold uppercase mt-1 tracking-wider">
                  {produto.classe}
                </span>
                <span className="text-xl font-bold text-gold-400 mt-3">
                  R$ {produto.preco.toFixed(2).replace(".", ",")}
                </span>
                <button
                  onClick={() => adicionar(produto)}
                  className="mt-4 bg-gold-400 hover:bg-gold-500 text-black font-semibold py-2 px-4 rounded-lg transition-colors w-full"
                >
                  Adicionar ao carrinho
                </button>

                <div className="w-full max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 group-hover:mt-4 transition-all duration-500 ease-in-out">
                  <hr className="border-gold-200" />
                  <p className="text-xs font-semibold text-gray-400 mt-3 mb-2">
                    Você também pode gostar
                  </p>
                  <div className="flex flex-col gap-2">
                    {relacionados.map((rec) => (
                      <div key={rec.id} className="flex items-center gap-2 text-sm">
                        <span>{rec.imagem_emoji}</span>
                        <span className="text-gray-700 truncate">{rec.nome}</span>
                        <span className="text-gold-400 font-bold ml-auto text-xs">
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

      <footer className="bg-black text-gold-400 py-4 px-6 text-center text-sm">
        Feito com ❤ na aula de IA do SENAI
      </footer>
    </div>
  );
}
