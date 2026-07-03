import { ResponseProdutoDTO } from "./produto.dto";

export interface RequestRecomendacaoDTO {
  produtoId: number;
  n?: number;
}

export type ResponseRecomendacaoDTO = ResponseProdutoDTO[];

export default class RecomendacaoDTO {}
