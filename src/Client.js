const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');
const Context = require('./Context');
const fs = require('fs');
const path = require('path');

class EasyBot {
    constructor(options = {}) {
        // Limpa espaços invisíveis do token para evitar o erro de TokenInvalid
        this.token = typeof options.token === 'string' ? options.token.trim() : options.token;
        
        this.client = new Client({
            intents: options.intents || [
                GatewayIntentBits.Guilds, 
                GatewayIntentBits.GuildMessages, 
                GatewayIntentBits.MessageContent
            ]
        });
        this.commands = new Map();
    }

    // --- SISTEMA DE MÓDULOS DNT ---

    useModule(moduleName) {
        const modulePath = path.join(process.cwd(), 'modules', moduleName, 'index.js');
        
        try {
            if (fs.existsSync(modulePath)) {
                // Valida a versão do módulo antes de carregar
                this.constructor.checkModule(path.dirname(modulePath));

                const module = require(modulePath);
                
                if (typeof module.init === 'function') {
                    module.init(this); 
                    console.log(`📦 [DNT] Módulo '${moduleName}' carregado com sucesso!`);
                } else {
                    console.error(`❌ [DNT] O módulo '${moduleName}' não possui a função init().`);
                }
            } else {
                console.error(`❌ [DNT] Módulo '${moduleName}' não encontrado em ./modules/`);
            }
        } catch (err) {
            console.error(`❌ [DNT] Erro ao carregar módulo '${moduleName}':`, err.message);
        }
    }

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

    // --- SISTEMA DE COMANDOS (AGORA COM OPTIONS) ---

    command({ name, description, options, run }) {
        // Registra o comando no Map, incluindo o array de opções
        this.commands.set(name, { 
            description, 
            options: options || [], 
            run 
        });
    }

    async start() {
        if (!this.token) throw new Error("ERRO: Você precisa fornecer um token!");

        this.client.once(Events.ClientReady, async (c) => {
            console.log(`✅ Bot online como ${c.user.tag}`);
            
            const rest = new REST({ version: '10' }).setToken(this.token);
            
            // Mapeia os comandos para o formato JSON do Discord, incluindo as options
            const commandsJSON = Array.from(this.commands.entries()).map(([name, cmd]) => ({
                name: name,
                description: cmd.description,
                options: cmd.options // Essencial para aparecer o campo de usuário/valor
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
                    console.error("Erro no comando:", err);
                    if (!interaction.replied) {
                        interaction.reply({ content: 'Houve um erro ao executar este comando!', ephemeral: true });
                    }
                }
            }
        });

        await this.client.login(this.token);
    }
}

module.exports = EasyBot;
