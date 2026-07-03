import ProdutoController from "@/src/controllers/produto.controller";
import RecomendacaoController from "@/src/controllers/recomendacao.controller";
import HomeClient from "./home-client";
import { ResponseRecomendacaoDTO } from "@/src/dtos/recomendacao.dto";

export default async function Home({
  searchParams,
}: {
  searchParams: { busca?: string; classe?: string };
}) {
  const produtoController = new ProdutoController();
  const recomendacaoController = new RecomendacaoController();

  const produtos = await produtoController.getAll(searchParams.busca, searchParams.classe);

  const recomendacoesMap: Record<number, ResponseRecomendacaoDTO> = {};
  for (const produto of produtos) {
    recomendacoesMap[produto.id] = await recomendacaoController.getRecomendacoes(produto.id, 3);
  }

  return <HomeClient produtos={produtos} recomendacoesMap={recomendacoesMap} />;
}
