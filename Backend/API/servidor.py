from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from rotas import router as rotas_biblioteca

app = FastAPI(
    title="API - Sistema OxyBook",
    description="Backend modular para integração do leitor ACR122U com o React."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rotas_biblioteca)