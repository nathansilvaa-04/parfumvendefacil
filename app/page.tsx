import { produtos } from "@/lib/produtos";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-indigo-600 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-2xl font-bold">
          <span>🧴</span>
          <span>VendeFácil</span>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Nossos Perfumes
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-indigo-600 text-white py-4 px-6 text-center text-sm">
        Feito com ❤ na aula de IA do SENAI
      </footer>
    </div>
  );
}
