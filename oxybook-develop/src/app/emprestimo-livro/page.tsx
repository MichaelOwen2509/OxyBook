"use client";

import { useState, useEffect } from "react";
import { RulesAndPolices } from "@/presentation/modules/books/components/rules-and-policies/rules-and-polices";
import Header from "@/presentation/shared/components/header/header";
import { Footer } from "@/presentation/shared/components/layout/footer/footer";
import { SelectedBooksList } from "@/presentation/shared/components/livros/SelectedBooksList";
import { Book } from "@/types/book";

export default function BookLoan() {
  const [livrosLidos, setLivrosLidos] = useState<Book[]>([]);

  // Função para remover um livro da lista caso o usuário clique na lixeira
  const removerLivro = (id: string) => {
    setLivrosLidos((prev) => prev.filter((book) => book.id !== id));
  };

  useEffect(() => {
    const verificarSensor = async () => {
      try {
        // 1. Faz a requisição para a sua API FastAPI
        const response = await fetch("http://127.0.0.1:8000/api/livro");
        const data = await response.json();

        // 2. Se a API retornou um código (significa que o arquivo .txt não está vazio)
        if (data.codigo) {
          // Verifica se o livro já não está na lista para evitar duplicatas
          setLivrosLidos((listaAtual) => {
            if (listaAtual.find((b) => b.id === data.codigo)) return listaAtual;

            const novoLivro: Book = {
              id: data.codigo,
              title: data.titulo,
              author: data.autor,
              description: data.descricao,
              coverUrl: data.imagem || "/image/capa-livro.png",
            };

            return [...listaAtual, novoLivro];
          });

          // 3. Após adicionar à tela, manda a API limpar o arquivo .txt
          await fetch("http://127.0.0.1:8000/api/livro", { method: "DELETE" });
        }
      } catch (error) {
        console.error("Erro ao conectar com a API do sensor:", error);
      }
    };

    // Define o intervalo de 2 segundos (2000ms)
    const interval = setInterval(verificarSensor, 2000);

    // Limpa o intervalo quando o usuário sai da página
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl text-[#4E0000CC] mb-3">Finalizar empréstimos</h1>
          <p className="text-lg text-[#67463599]">Aproxime o livro do sensor para adicionar à lista</p>
        </div>

        <div className="flex gap-8 items-start">
          <section className="flex-3">
            <SelectedBooksList books={livrosLidos} onRemoveBook={removerLivro} />
          </section>
          <aside className="w-80 shrink-0 flex flex-col gap-4">
            <RulesAndPolices />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}