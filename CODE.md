const { EasyBot } = require('easy-djs-bot');

const bot = new EasyBot({
    token: 'Your Bot token' // Sem o >
});


// Defina suas configurações globais aqui
bot.config = {
    ownerId: '1448096319372656703', // Pegue seu ID no Discord (botão direito no seu perfil)
    messagespam: 5,                   // Limite para o módulo de segurança
    limitmessagespam: 15              // Tempo para o módulo de segurança
};



bot.useModule('dnt-teste');
bot.useModule('dnt-economy');
bot.useModule('dnt-ia');
bot.useModule('dnt-comunity');
bot.useModule('dnt-gt');
bot.useModule('ndj-security');
bot.useModule('dnt-conf');
bot.useModule('Dnt-search');
bot.useModule('dnt-conf');
bot.useModule('dnt-embed');
bot.start().catch(err => {
    console.error("Erro fatal no bot:", err);
});
