const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');
const Context = require('./Context');

class EasyBot {
    constructor(options = {}) {
        this.token = options.token;
        this.client = new Client({
            intents: options.intents || [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
        });
        this.commands = new Map();
    }

    // Registra o comando na memória da lib
    command({ name, description, run }) {
        this.commands.set(name, { description, run });
    }

    async start() {
        if (!this.token) throw new Error("ERRO: Você precisa fornecer um token!");

        this.client.once(Events.ClientReady, async (c) => {
            console.log(`✅ Bot online como ${c.user.tag}`);
            
            // Registro automático de Slash Commands no Discord
            const rest = new REST({ version: '10' }).setToken(this.token);
            const commandsJSON = Array.from(this.commands.values()).map((cmd, name) => ({
                name: Array.from(this.commands.keys())[name],
                description: cmd.description
            }));

            try {
                await rest.put(Routes.applicationCommands(c.user.id), { body: commandsJSON });
                console.log('🚀 Slash Commands registrados com sucesso!');
            } catch (error) {
                console.error('❌ Erro ao registrar comandos:', error);
            }
        });

        this.client.on(Events.InteractionCreate, async (interaction) => {
            if (!interaction.isChatInputCommand()) return;

            const cmd = this.commands.get(interaction.commandName);
            if (cmd) {
                const ctx = new Context(interaction);
                try {
                    await cmd.run(ctx);
                } catch (err) {
                    console.error(err);
                    interaction.reply({ content: 'Houve um erro ao executar este comando!', ephemeral: true });
                }
            }
        });

        await this.client.login(this.token);
    }
}

module.exports = EasyBot;
                         
