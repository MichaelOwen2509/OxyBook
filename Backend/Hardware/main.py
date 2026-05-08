import time
from leitor_rfid import aguardar_e_ler_cartao

def iniciar_sistema():
    print("==================================")
    print("  SISTEMA OXYBOOK - LEITOR ATIVO  ")
    print("==================================")
    
    while True:
        print("\nAproxime um livro do sensor...")
        
        codigo_lido = aguardar_e_ler_cartao()
        
        if codigo_lido:
            print(f"✅ Livro lido com sucesso! Código: {codigo_lido}")
            
            with open("livro_atual.txt", "w") as arquivo:
                arquivo.write(codigo_lido)
            
            print("Dado salvo. Pode retirar o livro.")
            
            time.sleep(3) 

if __name__ == "__main__":
    try:
        iniciar_sistema()
    except KeyboardInterrupt:
        print("\n\n🛑 Sistema encerrado.")