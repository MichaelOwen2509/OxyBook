import { SelectedBooksList } from "@/presentation/shared/components/livros/SelectedBooksList";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>pagina inicial</h1>
     <SelectedBooksList /> 
    </div>
    
  );
}