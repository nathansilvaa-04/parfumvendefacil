export interface CreateProdutoDTO {
  nome: string;
  categoria: string;
  classe: string;
  preco: number;
  imagem_emoji: string;
}

export interface ResponseProdutoDTO {
  id: number;
  nome: string;
  categoria: string;
  classe: string;
  preco: number;
  imagem_emoji: string;
}

export default class ProdutoDTO {}
