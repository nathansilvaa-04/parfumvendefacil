import BaseEntity from "./base.entity";

export default class Usuario extends BaseEntity<string> {
  nome!: string;
  senha!: string;
}
