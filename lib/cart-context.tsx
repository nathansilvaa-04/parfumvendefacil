"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Produto } from "./produtos";

interface CartItem {
  produto: Produto;
  quantidade: number;
}

interface CartContextType {
  items: CartItem[];
  adicionar: (produto: Produto) => void;
  remover: (produtoId: number) => void;
  atualizarQuantidade: (produtoId: number, quantidade: number) => void;
  limpar: () => void;
  total: number;
  totalItens: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const adicionar = useCallback((produto: Produto) => {
    setItems((prev) => {
      const existente = prev.find((item) => item.produto.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  }, []);

  const remover = useCallback((produtoId: number) => {
    setItems((prev) => prev.filter((item) => item.produto.id !== produtoId));
  }, []);

  const atualizarQuantidade = useCallback((produtoId: number, quantidade: number) => {
    if (quantidade <= 0) {
      remover(produtoId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item
      )
    );
  }, [remover]);

  const limpar = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce(
    (acc, item) => acc + item.produto.preco * item.quantidade,
    0
  );

  const totalItens = items.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider
      value={{ items, adicionar, remover, atualizarQuantidade, limpar, total, totalItens }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
