const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const token = process.env.BOT_TOKEN; // Token aus Umgebungsvariable

client.once('ready', () => {
    console.log(`Eingeloggt als ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content === '!hallo') {
        message.channel.send('Hallo! Ich bin dein Bot!');
    }
});

client.login(token);
