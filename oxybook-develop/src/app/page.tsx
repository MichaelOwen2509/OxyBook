import { SelectedBooksList } from "@/presentation/shared/components/livros/SelectedBooksList";
import Image from "next/image";
import BookLoan from "./emprestimo-livro/page";

export default function Home() {
  return (
    <div>
      <h1>pagina inicial</h1>
     <BookLoan /> 
    </div>
    
  );
}