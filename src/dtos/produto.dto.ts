export interface CreateProdutoDTO {
  nome: string;
  categoria: string;
  classe: string;
  preco: number;
  imagem_url: string;
}

export interface ResponseProdutoDTO {
  id: number;
  nome: string;
  categoria: string;
  classe: string;
  preco: number;
  imagem_url: string;
}

export default class ProdutoDTO {}
