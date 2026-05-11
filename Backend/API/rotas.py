import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import banco_dados

router = APIRouter()

class PedidoEmprestimo(BaseModel):
    livros_ids: List[str]


@router.get("/api/livro", tags=["Sensor RFID"], summary="Ler leitura atual do sensor")
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
                "imagem": dados_do_livro["imagem"],
                "autor": dados_do_livro.get("autor", "Autor Desconhecido"),
                "descricao": dados_do_livro.get("descricao", "Sem descrição")
            }
    
    return {"codigo": None}


@router.delete("/api/livro")
def deletar_leitura_atual():
    caminho_arquivo = "../Hardware/livro_atual.txt"
    
    if os.path.exists(caminho_arquivo):
        with open(caminho_arquivo, "w") as arquivo:
            arquivo.write("")
            
    return {"status": "limpo"}


@router.post("/api/emprestimo", tags=["Empréstimos"], summary="Finalizar aluguel de livros")
def finalizar_emprestimo(pedido: PedidoEmprestimo):
    livros_para_alugar = []
    
    for livro_id in pedido.livros_ids:
        livro = banco_dados.BANCO_DE_LIVROS.get(livro_id)
        if not livro:
            continue
            
        if livro.get("alugado") == True:
            raise HTTPException(
                status_code=400, 
                detail=f"O livro '{livro['titulo']}' já está alugado por outro usuário."
            )
        livros_para_alugar.append(livro_id)

    for livro_id in livros_para_alugar:
        banco_dados.BANCO_DE_LIVROS[livro_id]["alugado"] = True
            
    return {"status": "success", "message": "Empréstimo realizado com sucesso!"}


@router.get("/api/livros/todos", tags=["Acervo"], summary="Listar todos os livros")
def listar_todos_os_livros():
    """
    Retorna todo o catálogo de livros e seus status de aluguel.
    """
    return banco_dados.BANCO_DE_LIVROS

@router.get("/api/livro/{codigo}", tags=["Acervo"], summary="Consultar livro específico")
def consultar_livro_especifico(codigo: str):
    """
    Consulta o status de um livro pelo seu ID/Tag RFID.
    """
    livro = banco_dados.BANCO_DE_LIVROS.get(codigo)
    
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado no acervo.")
        
    return {
        "codigo": codigo,
        "titulo": livro["titulo"],
        "alugado": livro["alugado"]
    }