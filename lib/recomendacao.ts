import { produtos, type Produto } from "./produtos";

type Coocorrencia = [number, number, number];

const coocorrencias: Coocorrencia[] = [
  [1, 5, 4], // Lavender Dream + Vanilla Noir (amadeirado + gourmand)
  [2, 8, 5], // Rose Éclat + Cherry Bloom (floral + frutal)
  [3, 6, 4], // Citrus Splash + Ocean Breeze (cítrico + aquático)
  [4, 1, 3], // Herbal Mist + Lavender Dream (herbáceo + amadeirado)
  [5, 7, 5], // Vanilla Noir + Spice Fire (gourmand + oriental)
  [6, 3, 3], // Ocean Breeze + Citrus Splash (aquático + cítrico)
  [7, 5, 4], // Spice Fire + Vanilla Noir (oriental + gourmand)
  [8, 2, 3], // Cherry Bloom + Rose Éclat (frutal + floral)
  [1, 4, 3], // Lavender Dream + Herbal Mist
  [2, 5, 4], // Rose Éclat + Vanilla Noir (floral + gourmand)
  [3, 4, 3], // Citrus Splash + Herbal Mist (cítrico + herbáceo)
  [6, 1, 2], // Ocean Breeze + Lavender Dream
  [7, 8, 3], // Spice Fire + Cherry Bloom (oriental + frutal)
  [5, 2, 3], // Vanilla Noir + Rose Éclat
  [4, 3, 2], // Herbal Mist + Citrus Splash
  [8, 7, 2], // Cherry Bloom + Spice Fire
  [1, 6, 2], // Lavender Dream + Ocean Breeze
  [2, 7, 2], // Rose Éclat + Spice Fire
];

export function recomendar(produtoId: number, n = 3): Produto[] {
  const scores = new Map<number, number>();

  for (const [a, b, peso] of coocorrencias) {
    if (a === produtoId) {
      scores.set(b, (scores.get(b) || 0) + peso);
    }
    if (b === produtoId) {
      scores.set(a, (scores.get(a) || 0) + peso);
    }
  }

  const sorted = Array.from(scores.entries())
    .sort(([, pesoA], [, pesoB]) => pesoB - pesoA)
    .slice(0, n);

  return sorted
    .map(([id]) => produtos.find((p) => p.id === id))
    .filter((p): p is Produto => p !== undefined);
}
