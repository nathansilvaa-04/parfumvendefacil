"use server";

import ProdutoController from "../src/controllers/produto.controller";
import RecomendacaoController from "../src/controllers/recomendacao.controller";
import { ResponseProdutoDTO } from "../src/dtos/produto.dto";
import { ResponseRecomendacaoDTO } from "../src/dtos/recomendacao.dto";

export async function getProdutos(nome?: string, classe?: string): Promise<ResponseProdutoDTO[]> {
  const controller = new ProdutoController();
  return controller.getAll(nome, classe);
}

export async function getRecomendacoes(id: number, n: number): Promise<ResponseRecomendacaoDTO> {
  const controller = new RecomendacaoController();
  return controller.getRecomendacoes(id, n);
}
