import Link from "next/link";

export default function Sucesso() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black text-gold-400 py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-2xl font-bold tracking-widest">
          <span>🧴</span>
          <span>ELEGANZA</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <span className="text-8xl mb-6">✅</span>
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Pedido realizado com sucesso!
        </h1>
        <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
          Seu pagamento foi processado. Você receberá os detalhes da compra em breve.
        </p>
        <Link
          href="/"
          className="bg-gold-400 hover:bg-gold-500 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Voltar às compras
        </Link>
      </main>

      <footer className="bg-black text-gold-400 py-4 px-6 text-center text-sm">
        Feito com ❤ na aula de IA do SENAI
      </footer>
    </div>
  );
}
