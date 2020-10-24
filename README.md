# Baixar arquivos de audio/video do youtube atráves de uma api com express
Api para download de Musicas e Videos no youtube.

# Install Dependencies:
    yarn add express
    yarn add ytdl-core

# Routers: ( BASE_HOST: localhost:3333 )
    
    [ GET ] /downloader?url=<LINK>&filter=audioonly&format=mp3 - Baixar vídeo via GET com query enviadas na rota 
                 [ url = url video youtube ]
                 [ filter = audioonly or empty to download video too ]
                 [ format = mp3/mp4/flv/etc.. arquive extension  ] 

    [ GET ] /getinfo?url=<LINK> - Obter informações do video
                 [ url = url video youtube ]


created by: Alan F ( ME )
