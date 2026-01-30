class Context {
    constructor(interaction) {
        this.interaction = interaction;
        this.client = interaction.client;
        this.user = interaction.user;
        this.member = interaction.member;
        this.channel = interaction.channel;
        this.guild = interaction.guild;
    }

    // Atalho para responder rápido
    async reply(content) {
        if (typeof content === 'string') {
            return this.interaction.reply({ content: content });
        }
        return this.interaction.reply(content);
    }

    // Atalho para mandar mensagem efêmera (só quem usou o comando vê)
    async secretReply(content) {
        return this.interaction.reply({ content: content, ephemeral: true });
    }
}

module.exports = Context;
