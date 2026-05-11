"use client";

import { useState, useEffect } from "react";
import { RulesAndPolices } from "@/presentation/modules/books/components/rules-and-policies/rules-and-polices";
import Header from "@/presentation/shared/components/header/header";
import { Footer } from "@/presentation/shared/components/layout/footer/footer";
import { SelectedBooksList } from "@/presentation/shared/components/livros/SelectedBooksList";
import { Book } from "@/types/book";

export default function BookLoan() {
  const [livrosLidos, setLivrosLidos] = useState<Book[]>([]);
  const [enviando, setEnviando] = useState(false); // Controle para mostrar "Processando..." no botão

  const removerLivro = (id: string) => {
    setLivrosLidos((prev) => prev.filter((book) => book.id !== id));
  };

  const finalizarEmprestimo = async () => {
    // Se a lista estiver vazia, não faz nada
    if (livrosLidos.length === 0) {
      alert("Nenhum livro foi lido pelo sensor ainda!");
      return;
    }

    setEnviando(true); // Muda o botão para "Processando..."

    // Pega apenas os IDs dos livros para mandar para a API
    const idsParaAlugar = livrosLidos.map((livro) => livro.id);

    try {
      const resposta = await fetch("http://127.0.0.1:8000/api/emprestimo", {
        method: "POST", // Método POST porque estamos enviando dados/modificando o banco
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ livros_ids: idsParaAlugar }),
      });

      // Se a API retornar aquele erro 400 que criamos (livro já alugado)
      if (!resposta.ok) {
        const erro = await resposta.json();
        alert(erro.detail); // Vai mostrar: "O livro X já está alugado por outro usuário."
        return; // Para a execução aqui para não limpar a tela
      }

      // Se deu tudo certo (código 200 OK)
      alert("Sucesso! Livros alugados e registrados no sistema.");
      setLivrosLidos([]); // Limpa a tela para o próximo aluno usar
      
    } catch (error) {
      console.error("Erro ao finalizar:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setEnviando(false); // Devolve o botão ao normal, independentemente de sucesso ou erro
    }
  };

  useEffect(() => {
    const verificarSensor = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/livro");
        const data = await response.json();

        if (data.codigo) {
          setLivrosLidos((listaAtual) => {
            if (listaAtual.find((b) => b.id === data.codigo)) return listaAtual;

            const novoLivro: Book = {
              id: data.codigo,
              title: data.titulo,
              author: data.autor || "Autor Desconhecido", // Proteção caso a API mande nulo
              description: data.descricao || "Sem descrição...", 
              coverUrl: data.imagem || "/image/capa-livro.png",
            };

            return [...listaAtual, novoLivro];
          });

          await fetch("http://127.0.0.1:8000/api/livro", { method: "DELETE" });
        }
      } catch (error) {
        console.error("Erro ao conectar com a API do sensor:", error);
      }
    };

    const interval = setInterval(verificarSensor, 2000);

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
            {/* Agora sim, a comunicação de pai para filho está completa */}
            <RulesAndPolices 
              onFinalize={finalizarEmprestimo} 
              isLoading={enviando} 
            />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}