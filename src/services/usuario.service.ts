import UsuarioRepository from "../repositories/usuario.repository";
import { CreateUsuarioDTO, ResponseUsuarioDTO } from "../dtos/usuario.dto";
import Usuario from "../entities/usuario.entity";

export default class UsuarioService {
  private repository: UsuarioRepository;

  constructor() {
    this.repository = new UsuarioRepository();
  }

  async findAll(): Promise<ResponseUsuarioDTO[]> {
    const usuarios = await this.repository.findAll();
    return usuarios.map((u) => this.toDTO(u));
  }

  async findById(id: string): Promise<ResponseUsuarioDTO | null> {
    const usuario = await this.repository.findById(id);
    if (!usuario) return null;
    return this.toDTO(usuario);
  }

  async create(data: CreateUsuarioDTO): Promise<ResponseUsuarioDTO> {
    const usuario = new Usuario();
    usuario.nome = data.nome;
    usuario.senha = data.senha;

    const salvo = await this.repository.save(usuario);
    return this.toDTO(salvo);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  private toDTO(usuario: Usuario): ResponseUsuarioDTO {
    return {
      id: usuario.id!,
      nome: usuario.nome,
    };
  }
}
