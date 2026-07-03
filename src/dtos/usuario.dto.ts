export interface CreateUsuarioDTO {
  nome: string;
  senha: string;
}

export interface ResponseUsuarioDTO {
  id: string;
  nome: string;
}

export default class UsuarioDTO {}
