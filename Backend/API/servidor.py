from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from rotas import router as rotas_biblioteca

descricao_api = """
API do **Sistema OxyBook**
"""

app = FastAPI(
    title="API - Sistema OxyBook",
    description=descricao_api,
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rotas_biblioteca)