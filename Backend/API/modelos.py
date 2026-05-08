from pydantic import BaseModel
from typing import Optional

class RespostaLivro(BaseModel):
    codigo: Optional[str]
    titulo: Optional[str]
    imagem: Optional[str]
    status: Optional[str] = None