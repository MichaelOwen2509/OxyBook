from smartcard.CardType import AnyCardType
from smartcard.CardRequest import CardRequest
from smartcard.util import toHexString

def aguardar_e_ler_cartao():
    try:
        tipo = AnyCardType()
        
        requisicao = CardRequest(timeout=None, cardType=tipo)
        
        servico = requisicao.waitforcard()
        
        conexao = servico.connection
        conexao.connect()
        
        comando_apdu = [0xFF, 0xCA, 0x00, 0x00, 0x00]
        resposta, sw1, sw2 = conexao.transmit(comando_apdu)
        
        
        if sw1 == 144 and sw2 == 0:
            uid_limpo = toHexString(resposta).replace(" ", "")
            return uid_limpo
            
    except Exception as erro:
        print(f"Erro na comunicação com o hardware: {erro}")
        
    return None