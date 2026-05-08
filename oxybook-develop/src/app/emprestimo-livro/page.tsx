import { RulesAndPolices } from "@/presentation/modules/books/components/rules-and-policies/rules-and-polices";
import Header from "@/presentation/shared/components/header/header";
import { Footer } from "@/presentation/shared/components/layout/footer/footer";
import { SelectedBooksList } from "@/presentation/shared/components/livros/SelectedBooksList";
import { Book } from "@/types/book";

const livrosTeste: Book[] = [
  {
    id: "1",
    title: "The Silver Crow",
    author: "Osvaldo Sousa",
    description: "Uma jornada envolvente sobre tecnologia e inovação.",
    coverUrl: "/image/capa-livro.png",
  },
  {
    id: "2",
    title: "The Silver Crow",
    author: "Osvaldo Sousa",
    description: "Uma jornada envolvente sobre tecnologia e inovação.",
    coverUrl: "/image/capa-livro.png",
  },
  {
    id: "3",
    title: "The Silver Crow",
    author: "Osvaldo Sousa",
    description: "Uma jornada envolvente sobre tecnologia e inovação.",
    coverUrl: "/image/capa-livro.png",
  },
  {
    id: "4",
    title: "The Silver Crow",
    author: "Osvaldo Sousa",
    description: "Uma jornada envolvente sobre tecnologia e inovação.",
    coverUrl: "/image/capa-livro.png",
  },
  {
    id: "5",
    title: "The Silver Crow",
    author: "Osvaldo Sousa",
    description: "Uma jornada envolvente sobre tecnologia e inovação.",
    coverUrl: "/image/capa-livro.png",
  },

 {
    id: "6",
    title: "The Silver Crow",
    author: "Osvaldo Sousa",
    description: "Uma jornada envolvente sobre tecnologia e inovação.",
    coverUrl: "/image/capa-livro.png",
  },
]

export default function BookLoan() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-8">

        <div className="mb-6">
          <h1 className="text-4xl text-[#4E0000CC] mb-3">Finalizar empréstimos</h1>
          <p className="text-lg text-[#67463599]">Revise seus livros e regras antes de confirmar</p>
        </div>

        <div className="flex gap-8 items-start">
          <section className="flex-3">
            <SelectedBooksList initialBooks={livrosTeste} />
          </section>


          <aside className="w-80 shrink-0 flex flex-col gap-4">
            <RulesAndPolices />
          </aside>
        </div>
      </main>

      <Footer />

    </div>
  )
}