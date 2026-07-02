export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagem_emoji: string;
}

export const produtos: Produto[] = [
  { id: 1, nome: "Lavender Dream", categoria: "Amadeirado", preco: 89.9, imagem_emoji: "🪻" },
  { id: 2, nome: "Rose Éclat", categoria: "Floral", preco: 129.9, imagem_emoji: "🌹" },
  { id: 3, nome: "Citrus Splash", categoria: "Cítrico", preco: 69.9, imagem_emoji: "🍊" },
  { id: 4, nome: "Herbal Mist", categoria: "Herbáceo", preco: 79.9, imagem_emoji: "🌿" },
  { id: 5, nome: "Vanilla Noir", categoria: "Gourmand", preco: 99.9, imagem_emoji: "🍫" },
  { id: 6, nome: "Ocean Breeze", categoria: "Aquático", preco: 109.9, imagem_emoji: "🌊" },
  { id: 7, nome: "Spice Fire", categoria: "Oriental", preco: 119.9, imagem_emoji: "🔥" },
  { id: 8, nome: "Cherry Bloom", categoria: "Frutal", preco: 74.9, imagem_emoji: "🌸" },
];
