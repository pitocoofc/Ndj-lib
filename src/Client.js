const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');
const Context = require('./Context');
const fs = require('fs');
const path = require('path');

class EasyBot {
    constructor(options = {}) {
        this.token = options.token;
        this.client = new Client({
            intents: options.intents || [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
        });
        this.commands = new Map();
    }

    // --- SISTEMA DE MÓDULOS DNT ---

    // Função para o bot carregar o módulo
    useModule(moduleName) {
        const modulePath = path.join(process.cwd(), 'modules', moduleName, 'index.js');
        
        try {
            if (fs.existsSync(modulePath)) {
                // Antes de carregar, rodamos o fiscal de versão
                this.constructor.checkModule(path.dirname(modulePath));

                const module = require(modulePath);
                module.init(this); 
                console.log(`📦 [DNT] Módulo '${moduleName}' carregado com sucesso!`);
            } else {
                console.error(`❌ [DNT] Módulo '${moduleName}' não encontrado em ./modules/`);
            }
        } catch (err) {
            console.error(`❌ [DNT] Erro ao carregar módulo '${moduleName}':`, err.message);
        }
    }

    // O "Fiscal" que valida o manifest.dnt
    static checkModule(modulePath) {
        const manifestPath = path.join(modulePath, 'manifest.dnt');
        
        if (!fs.existsSync(manifestPath)) {
            console.error("❌ [DNT] Erro: Módulo inválido (faltando manifest.dnt)");
            return;
        }

        const content = fs.readFileSync(manifestPath, 'utf8');
        const config = {};
        
        content.split('\n').forEach(line => {
            if(line.includes('=')) {
                const [key, value] = line.split('=');
                config[key.trim()] = value.trim();
            }
        });

        const currentLibVersion = "1.0.9"; 

        if (config.compatible_dnt > currentLibVersion) {
            console.error(`\n❌ [DNT ERROR]: O módulo '${config.name}' exige a versão ${config.compatible_dnt}.`);
            console.error(`Sua versão da Ndj-lib é ${currentLibVersion}. Atualize a lib!`);
            process.exit(1);
        }
    }

    // --- SISTEMA DE COMANDOS ---

    command({ name, description, run }) {
        this.commands.set(name, { description, run });
    }

    async start() {
        if (!this.token) throw new Error("ERRO: Você precisa fornecer um token!");

        this.client.once(Events.ClientReady, async (c) => {
            console.log(`✅ Bot online como ${c.user.tag}`);
            
            const rest = new REST({ version: '10' }).setToken(this.token);
            const commandsJSON = Array.from(this.commands.entries()).map(([name, cmd]) => ({
                name: name,
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
