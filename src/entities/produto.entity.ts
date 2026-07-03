import BaseEntity from "./base.entity";

export default class Produto extends BaseEntity {
  nome!: string;
  categoria!: string;
  classe!: string;
  preco!: number;
  imagem_url!: string;
}
