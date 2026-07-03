import ProdutoService from "../services/produto.service";
import { ResponseProdutoDTO } from "../dtos/produto.dto";

export default class ProdutoController {
  private service: ProdutoService;

  constructor() {
    this.service = new ProdutoService();
  }

  async getAll(nome?: string, classe?: string): Promise<ResponseProdutoDTO[]> {
    return this.service.findAll(nome, classe);
  }

  async getById(id: number): Promise<ResponseProdutoDTO | null> {
    return this.service.findById(id);
  }
}
