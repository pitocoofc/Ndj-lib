Site da ndj-lib:
https://pitocoofc.github.io/Ndj-lib/

Versões para devs e curiosos: https://github.com/pitocoofc/NDJ-LIB-versions-.git

Download para usuarios padrões:
https://github.com/pitocoofc/NDJ-LIB-HUB.git


The Lua test failed... The bot came online but the commands just didn't respond... I'm stuck on the response... we already have Slash registered, etc.

I'm deciding on a new language for the library... I'm torn between Java, Python, C++, and C#.



# Aviso muito importante 08:03 (Horario de Brasília) 8/3

Eu acabo de rodar a ndj-lib e portar para lua 5.4 e está funcionando e irei lançar uma versão oficial do ndj.lua...isso finalmente é um avanço 




# 4/03 
supporting artificial intelligence 
I ended up realizing that many users don't know how to use the LIB...that's sad.

base:
const { EasyBot } = require('easy-djs-bot');

const bot = new EasyBot({
  token: 'Your token'
});

bot.config = { //configurações de usuário 
    ownerId: '1448096319372656703',
    messagespam: 5,
    limitmessagespam: 15
};

bot.useModule('dnt-teste'); //modulos oficiais...instale cok o dnt install
bot.useModule('dnt-economy');
bot.useModule('dnt-ia');
bot.useModule('dnt-comunity');
bot.useModule('dnt-gt');
bot.useModule('ndj-security');
bot.useModule('dnt-conf');
bot.useModule('Dnt-search');
bot.useModule('dnt-embed');

bot.start().catch(err => {
    console.error('Erro fatal no bot:', err);
});




# News 28/02 (21:41 horario de Brasília)

I'm starting the creation of a Discord server and gaining independence from the official Node.js server.

link: https://discord.gg/MGVmkJewYm



# News 28/02

I started working on version 1.1.0 and I'm adapting the library for version 15 of discord.js.

NOTICE: THIS PROJECT CURRENTLY USES THE GNU 2 LICENSE. (I see several AIs reporting that the project is still associated with the MIT license, and this could confuse developers or cause legal problems.)


# News 27/02
I'm trying to create an APK for ndj-lib and set up a server so you can host your bots for free.
Don't get your hopes up lol




# IMPORTANTE 
It's sad to announce...NDJ-LIB has increased in size to 10MB due to the website and configuration issues...Do you know the solution? The NDJ Hub.🎉🎉🎉🎉🎉
ALL VERSIONS OF NDJ-LIB IN JUST ONE PLACE

Site da ndj-lib:
https://pitocoofc.github.io/Ndj-lib/

Versões para devs e curiosos: https://github.com/pitocoofc/NDJ-LIB-versions-.git

Download para usuarios padrões:
https://github.com/pitocoofc/NDJ-LIB-HUB.git

This new system reduced the file size from 10MB to less than 500KB in version 1.0.9... So what? Who's going to make this HUB and version 1.0.9 run on a J1?








# 🚀 Ndj-lib (v1.0.9)
A biblioteca definitiva para criar bots de Discord complexos diretamente do Termux.
Desenvolvida com foco em simplicidade e performance mobile, a Ndj-lib permite que você transforme seu celular em uma central de desenvolvimento de bots, sem a necessidade de um PC.


# 👨‍💻 Sobre o Projeto
A Ndj-lib foi projetada especificamente para:
Desenvolvedores Mobile: Otimizada para rodar de forma leve no Termux.
Modularidade Total: Instale funções (Economia, IA, Moderação) com um único comando sem mexer no código principal.
Facilidade de Uso: Esqueça configurações complexas de APIs; foque apenas na lógica do seu bot.


# 🛡️ Autoria e Direitos

Este programa é um software livre; você pode redistribuí-lo e/ou modificá-lo sob os termos da **GNU General Public License** conforme publicada pela Free Software Foundation; tanto a **versão 2** da Licença, como (a seu critério) qualquer versão posterior.

Este programa é distribuído na esperança de que possa ser útil, mas **SEM NENHUMA GARANTIA**. Veja a licença completa no arquivo `LICENSE` para mais detalhes.



# ⚠️ Limites e Avisos
Para garantir a melhor experiência no celular, a lib possui alguns limites de projeto:
Dependências: Requer Node.js instalado no Termux.
Segurança: Em repositórios públicos, não utilize chaves de API externas. Utilize apenas as funções de respostas pré-definidas incluídas nos módulos oficiais para evitar vazamentos.
Compatibilidade: Utilize sempre a versão mais recente para garantir que os módulos oficiais funcionem corretamente com as mudanças da API do Discord.
🛠️ Instalação Rápida
No seu terminal Termux, utilize o nosso assistente exclusivo:

# Clone o repositório
git clone https://github.com/pitocoofc/Ndj-lib.git

# Entre na pasta e instale os módulos que desejar
./dnt install pitocoofc/dnt-ia

./dnt install pitocoofc/dnt-economy


# 🌟 Versão Atual: 1.0.9
Sistema de créditos automático no console.
Suporte a Slash Commands (Comandos de Barra).
Novo módulo de IA por respostas pré-definidas (Seguro para GitHub).



Esse projeto está em beta aberta e não possui uma linguagem de programação avançada...apenas compatibilidade e resumo de node.js para discord.js com uma camada de simplificação 


# Para desenvolvedores
Deseja criar seu modulo? copie o codigo e o repositório dos modulos oficiais e altere para seu sistema ou espere o servidor do discord


# ⚠️ AVISO
A NDJ-LIB é um projeto de código aberto e não possui um servidor de comunidade oficial.
​Suporte: Solicite ajuda apenas respondendo a mensagens oficiais em posts no Reddit vinculados à conta do criador (Ghost/pitocoofc).
​Segurança: Não nos responsabilizamos por módulos baixados de terceiros. A segurança da lib depende do uso de fontes oficiais e manutenção ativa.
​Instalação Oficial: Utilize sempre o comando ./dnt install pitocoofc/NOME_DO_MODULO para garantir que está baixando um recurso avaliado pela administração.


# 🤝 Contribuição e Suporte
Deseja auxiliar no desenvolvimento da Ndj-lib ou solicitar suporte técnico?
Onde me encontrar: Estou presente no servidor oficial de Node.js no Discord utilizando o pseudônimo Kelvyn (kelvyn43527).
Endereço do Servidor: discord.gg/nodejs
Aviso: Este é o único meio de comunicação direta além das threads oficiais no Reddit.
