const { EasyBot } = require('easy-djs-bot');

const bot = new EasyBot({ token: 'Your token' });

bot.config = { //configurações de usuário ownerId: 'Your discord ID ', messagespam: 5, limitmessagespam: 15 };

bot.useModule('dnt-teste'); //modulos oficiais...instale cok o dnt install bot.useModule('dnt-economy'); bot.useModule('dnt-ia'); bot.useModule('dnt-comunity'); bot.useModule('dnt-gt'); bot.useModule('ndj-security'); bot.useModule('dnt-conf'); bot.useModule('Dnt-search'); bot.useModule('dnt-embed');

bot.start().catch(err => { console.error('Erro fatal no bot:', err); });
