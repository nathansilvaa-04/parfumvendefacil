import UsuarioService from "../services/usuario.service";
import { CreateUsuarioDTO, ResponseUsuarioDTO } from "../dtos/usuario.dto";

export default class UsuarioController {
  private service: UsuarioService;

  constructor() {
    this.service = new UsuarioService();
  }

  async getAll(): Promise<ResponseUsuarioDTO[]> {
    return this.service.findAll();
  }

  async getById(id: string): Promise<ResponseUsuarioDTO | null> {
    return this.service.findById(id);
  }

  async create(data: CreateUsuarioDTO): Promise<ResponseUsuarioDTO> {
    return this.service.create(data);
  }

  async delete(id: string): Promise<void> {
    await this.service.delete(id);
  }
}
