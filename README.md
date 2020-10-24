# Baixar arquivos de audio/video do youtube atráves de uma api com express

_Abaixo todas as informações da api de fácil uso, apenas com duas rotas, podendo baixar e obter informações de video do youtube, de fácil implementação em qualquer aplicação, já que está no formato Api, e só basta dar um GET, e após baixar o arquivo e enviar para o usuario, ele exclui automaticamente do seu computador.

# Install Dependencies:
    yarn add express
    yarn add ytdl-core
    
    or type: "yarn install" with shell in the page -> this install all dependencies.

# Routers: ( BASE_HOST: localhost:3333 )
    
    [ GET ] /downloader?url=<LINK>&filter=audioonly&format=mp3 - Baixar vídeo via GET com query enviadas na rota 
                 [ url = url video youtube ]
                 [ filter = audioonly or empty to download video too ]
                 [ format = mp3/mp4/flv/etc.. arquive extension  ] 

    [ GET ] /getinfo?url=<LINK> - Obter informações do video
                 [ url = url video youtube ]


created by: Alan F ( ME )
