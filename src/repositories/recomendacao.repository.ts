import Coocorrencia from "../entities/coocorrencia.entity";

export default class RecomendacaoRepository {
  private coocorrencias: Coocorrencia[] = [
    { produtoIdA: 1, produtoIdB: 5, peso: 4 },
    { produtoIdA: 2, produtoIdB: 8, peso: 5 },
    { produtoIdA: 3, produtoIdB: 6, peso: 4 },
    { produtoIdA: 4, produtoIdB: 1, peso: 3 },
    { produtoIdA: 5, produtoIdB: 7, peso: 5 },
    { produtoIdA: 6, produtoIdB: 3, peso: 3 },
    { produtoIdA: 7, produtoIdB: 5, peso: 4 },
    { produtoIdA: 8, produtoIdB: 2, peso: 3 },
    { produtoIdA: 1, produtoIdB: 4, peso: 3 },
    { produtoIdA: 2, produtoIdB: 5, peso: 4 },
    { produtoIdA: 3, produtoIdB: 4, peso: 3 },
    { produtoIdA: 6, produtoIdB: 1, peso: 2 },
    { produtoIdA: 7, produtoIdB: 8, peso: 3 },
    { produtoIdA: 5, produtoIdB: 2, peso: 3 },
    { produtoIdA: 4, produtoIdB: 3, peso: 2 },
    { produtoIdA: 8, produtoIdB: 7, peso: 2 },
    { produtoIdA: 1, produtoIdB: 6, peso: 2 },
    { produtoIdA: 2, produtoIdB: 7, peso: 2 },
  ].map((c, i) => {
    const coocorrencia = new Coocorrencia();
    coocorrencia.id = i + 1;
    coocorrencia.produtoIdA = c.produtoIdA;
    coocorrencia.produtoIdB = c.produtoIdB;
    coocorrencia.peso = c.peso;
    return coocorrencia;
  });

  async findAll(): Promise<Coocorrencia[]> {
    return this.coocorrencias;
  }
}
