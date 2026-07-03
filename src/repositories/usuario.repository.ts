import Usuario from "../entities/usuario.entity";

export default class UsuarioRepository {
  private usuarios: Usuario[] = [];

  async findAll(): Promise<Usuario[]> {
    return this.usuarios;
  }

  async findById(id: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((u) => u.id === id);
    return usuario || null;
  }

  async save(usuario: Usuario): Promise<Usuario> {
    if (!usuario.id) {
      usuario.id = Math.random().toString(36).substring(2, 15);
      this.usuarios.push(usuario);
    } else {
      const index = this.usuarios.findIndex((u) => u.id === usuario.id);
      if (index !== -1) {
        this.usuarios[index] = usuario;
      } else {
        this.usuarios.push(usuario);
      }
    }
    return usuario;
  }

  async delete(id: string): Promise<void> {
    this.usuarios = this.usuarios.filter((u) => u.id !== id);
  }
}
