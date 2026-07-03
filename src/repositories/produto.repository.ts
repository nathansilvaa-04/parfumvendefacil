import Produto from "../entities/produto.entity";

export default class ProdutoRepository {
  private produtos: Produto[] = [
    { id: 1, nome: "Lavender Dream", categoria: "Amadeirado", classe: "Eau de Parfum", preco: 89.9, imagem_url: "/perfumes/lavender-dream.png" },
    { id: 2, nome: "Rose Éclat", categoria: "Floral", classe: "Parfum", preco: 129.9, imagem_url: "/perfumes/rose-eclat.png" },
    { id: 3, nome: "Citrus Splash", categoria: "Cítrico", classe: "Eau de Toilette", preco: 69.9, imagem_url: "/perfumes/citrus-splash.png" },
    { id: 4, nome: "Herbal Mist", categoria: "Herbáceo", classe: "Eau de Cologne", preco: 79.9, imagem_url: "/perfumes/herbal-mist.png" },
    { id: 5, nome: "Vanilla Noir", categoria: "Gourmand", classe: "Eau de Parfum", preco: 99.9, imagem_url: "/perfumes/vanilla-noir.png" },
    { id: 6, nome: "Ocean Breeze", categoria: "Aquático", classe: "Eau de Toilette", preco: 109.9, imagem_url: "/perfumes/ocean-breeze.png" },
    { id: 7, nome: "Spice Fire", categoria: "Oriental", classe: "Parfum", preco: 119.9, imagem_url: "/perfumes/spice-fire.png" },
    { id: 8, nome: "Cherry Bloom", categoria: "Frutal", classe: "Eau de Toilette", preco: 74.9, imagem_url: "/perfumes/cherry-bloom.png" },
  ];

  async findAll(nome?: string, classe?: string): Promise<Produto[]> {
    let resultado = this.produtos;

    if (nome) {
      resultado = resultado.filter((p) =>
        p.nome.toLowerCase().includes(nome.toLowerCase())
      );
    }

    if (classe && classe !== "Todas") {
      resultado = resultado.filter((p) => p.classe === classe);
    }

    return resultado;
  }

  async findById(id: number): Promise<Produto | null> {
    const produto = this.produtos.find((p) => p.id === id);
    return produto || null;
  }

  async save(produto: Produto): Promise<Produto> {
    if (!produto.id) {
      produto.id = this.produtos.length + 1;
      this.produtos.push(produto);
    } else {
      const index = this.produtos.findIndex((p) => p.id === produto.id);
      if (index !== -1) {
        this.produtos[index] = produto;
      }
    }
    return produto;
  }

  async delete(id: number): Promise<void> {
    this.produtos = this.produtos.filter((p) => p.id !== id);
  }
}
