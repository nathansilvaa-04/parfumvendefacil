import ProdutoRepository from "../repositories/produto.repository";
import { ResponseProdutoDTO } from "../dtos/produto.dto";
import Produto from "../entities/produto.entity";

export default class ProdutoService {
  private repository: ProdutoRepository;

  constructor() {
    this.repository = new ProdutoRepository();
  }

  async findAll(nome?: string, classe?: string): Promise<ResponseProdutoDTO[]> {
    const produtos = await this.repository.findAll(nome, classe);
    return produtos.map((p) => this.toDTO(p));
  }

  async findById(id: number): Promise<ResponseProdutoDTO | null> {
    const produto = await this.repository.findById(id);
    if (!produto) return null;
    return this.toDTO(produto);
  }

  private toDTO(produto: Produto): ResponseProdutoDTO {
    return {
      id: produto.id!,
      nome: produto.nome,
      categoria: produto.categoria,
      classe: produto.classe,
      preco: produto.preco,
      imagem_emoji: produto.imagem_emoji,
    };
  }
}
