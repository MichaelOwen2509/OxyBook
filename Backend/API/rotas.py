import os
from fastapi import APIRouter
import banco_dados

router = APIRouter()

@router.get("/api/livro")
def ler_livro():
    caminho_arquivo = "../Hardware/livro_atual.txt"
    
    if os.path.exists(caminho_arquivo):
        with open(caminho_arquivo, "r") as arquivo:
            codigo = arquivo.read().strip()
        
        if codigo:
            dados_do_livro = banco_dados.BANCO_DE_LIVROS.get(codigo, banco_dados.LIVRO_PADRAO)
            
            return {
                "codigo": codigo,
                "titulo": dados_do_livro["titulo"],
                "imagem": dados_do_livro["imagem"]
            }
    
    return {"codigo": None}


@router.delete("/api/livro")
def deletar_leitura_atual():
    caminho_arquivo = "../Hardware/livro_atual.txt"
    
    if os.path.exists(caminho_arquivo):
        with open(caminho_arquivo, "w") as arquivo:
            arquivo.write("")
            
    return {"status": "limpo"}