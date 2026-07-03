import RecomendacaoService from "../services/recomendacao.service";
import { ResponseRecomendacaoDTO } from "../dtos/recomendacao.dto";

export default class RecomendacaoController {
  private service: RecomendacaoService;

  constructor() {
    this.service = new RecomendacaoService();
  }

  async getRecomendacoes(produtoId: number, n?: number): Promise<ResponseRecomendacaoDTO> {
    return this.service.recomendar(produtoId, n);
  }
}
