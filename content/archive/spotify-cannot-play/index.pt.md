+++
title = 'Arch Linux: Como consertar erro de reprodução de arquivos locais no Spotify'
date = 2024-07-20
draft = false
+++

## O problema

Há algum tempo, eu contratei o pacote _premium_ do Spotify e, desde então, tenho estado satisfeito com o serviço deles.
Contudo, às vezes eu procuro por músicas que não estão disponíveis na biblioteca padrão do Spotify.
Felizmente, o Spotify tem um recurso que lida exatamente com essas situações: qualquer usuário pago pode importar músicas armazenadas localmente e ouvi-las no cliente do Spotify.
Ou seja, basta fazer o download de uma música que não está no Spotify e importá-la para sua biblioteca local.
Claramente, fazer isso tem seus próprios desafios.
O principal deles é sincronizar essas músicas locais entre os seus dispositivos.
Porém, não vamos discutir esses problemas aqui.

Esse recurso de arquivos locais funcionou muito bem em meu celular Android, mas, no meu Linux, o Spotify se recusa a reproduzir as músicas importadas.
O erro pode ser visto na imagem abaixo:
![imagem de error](/spotify-cannot-play/error.png "500")

Em tradução livre para o português, seria algo do como "O Spotify não pode reproduzir isso agora. Se você tem o arquivo no computador, pode importá-lo".

## A solução

Para reproduzir arquivos locais, o Spotify precisa de algumas bibliotecas que não estavam presentes em meu computador.
Essas bibliotecas faltantes podem ser facilmente instaladas com o seguinte comando:

`sudo pacman -S ffmpeg4.4`

Depois disso, basta reiniciar o Spotify e as suas músicas serão reproduzidas normalmente.

## Por que a solução funciona (e como solucionar esse problema em outras distros)

Pelo o que eu entendi, o Spotify requer algumas bibliotecas do ffmpeg para reproduzir os arquivos locais.
Contudo, a versão do cliente disponível para Linux foi feita usando uma versão antiga do ffmpeg.
Como o Arch Linux tem a versão mais recente do ffmpeg, o Spotify não consegue reconhecer as bibliotecas que estão instaladas.
Assim, a solução é instalar uma versão mais antiga da biblioteca do ffmpeg que o Spotify precisa.
Eu acredito que a biblioteca em questão é a `libavcodec`.

Antes de consertar o problema, eu li muitas postagens sobre isso e a maioria das solução girava em torno de uma biblioteca chamada "ffmpeg-compat".
Antigamente no Arch Linux, existiam dois pacotes do AUR que aparentemente resolviam o problema: `ffmpeg-compat-57` and `ffmpeg-compat-59`.
Esses dois pacotes continham a versão correta da `libavcodec`.
Infelizmente, esses pacotes não estão mais disponíveis no AUR.
Ainda há os pacotes `ffmpeg-compat-54` e `ffmpeg-compat-55` no AUR, mas nenhum dos dois teve sucesso na compilação em minha máquina.

A minha próxima estratégia foi instalar todo o ffmpeg em uma versão anterior.
Fique tranquilo(a): a instalação não vai conflitar com a versão mais recente do ffmpeg em seu sistema.
No AUR, estão disponíveis as versões 6.1 e 5.1, mas só a versão 5.1 vem com a biblioteca que precisamos.
Infelizmente, depois de uns 10 minutos de compilação, o ffmpeg 5.1 deu erro.
Eu tentei recompilar várias vezes, mas sem sucesso.
Eu não tenho certeza do porquê esses pacotes não compilaram no meu PC (pareciam erros reais no código fonte, tipo acesso a atributos inválidos).
Se alguém conseguir instalar essas versões que eu não consegui, provavelmente será uma solução melhor.

Por sorte, ainda há uma versão ainda mais antiga do ffmpeg no repositório *extra* do pacman, o `ffmpeg4.4`.
Eu consegui instalar essa versão e tudo funcionou direitinho!
Agora eu consigo ouvir minhas músicas locais no Spotify :smile:.

Se você usa alguma outra distribuição, tente procurar por alguma versão antiga da `libavcodec` ou do ffmpeg no seu gerenciador de pacotes.
Provavelmente, essa solução funcionará para você também.

Eu espero que esse blog tenha ajudado você a ouvir suas queridas músicas no Spotify!
