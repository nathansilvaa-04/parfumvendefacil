import RecomendacaoRepository from "../repositories/recomendacao.repository";
import ProdutoRepository from "../repositories/produto.repository";
import { ResponseRecomendacaoDTO } from "../dtos/recomendacao.dto";

export default class RecomendacaoService {
  private repository: RecomendacaoRepository;
  private produtoRepository: ProdutoRepository;

  constructor() {
    this.repository = new RecomendacaoRepository();
    this.produtoRepository = new ProdutoRepository();
  }

  async recomendar(produtoId: number, n: number = 3): Promise<ResponseRecomendacaoDTO> {
    const scores = new Map<number, number>();
    const coocorrencias = await this.repository.findAll();

    for (const cooc of coocorrencias) {
      if (cooc.produtoIdA === produtoId) {
        scores.set(cooc.produtoIdB, (scores.get(cooc.produtoIdB) || 0) + cooc.peso);
      }
      if (cooc.produtoIdB === produtoId) {
        scores.set(cooc.produtoIdA, (scores.get(cooc.produtoIdA) || 0) + cooc.peso);
      }
    }

    const sortedIds = Array.from(scores.entries())
      .sort(([, pesoA], [, pesoB]) => pesoB - pesoA)
      .slice(0, n)
      .map(([id]) => id);

    const produtos = await this.produtoRepository.findAll();
    
    return sortedIds
      .map((id) => produtos.find((p) => p.id === id))
      .filter((p) => p !== undefined)
      .map((p) => ({
        id: p!.id!,
        nome: p!.nome,
        categoria: p!.categoria,
        classe: p!.classe,
        preco: p!.preco,
        imagem_url: p!.imagem_url,
      }));
  }
}
