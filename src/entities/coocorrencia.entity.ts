import BaseEntity from "./base.entity";

export default class Coocorrencia extends BaseEntity {
  produtoIdA!: number;
  produtoIdB!: number;
  peso!: number;
}
