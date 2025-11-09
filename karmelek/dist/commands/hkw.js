"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    name: 'karmelek', // <- NAZWA KOMENDY
    category: 'Testing',
    description: 'Opis karmelka',
    guildOnly: true,
    permissions: ['ViewChannel'], // poprawna nazwa uprawnienia (case-sensitive)
    callback: ({ message }) => {
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('How Karmelek Works')
            .setDescription('Karmelek sp z o.o')
            .setColor('#b8860b') // dark goldenrod
            .addFields([
            { name: 'karmelek', value: 'To ja', inline: true },
            { name: 'zarelko', value: 'Lubie jesc', inline: true },
            { name: 'gruby jestes', value: '*puszysty', inline: true },
            { name: 'kocimietka', value: '😻' },
            { name: 'nie dam żarelka', value: 'zly czlowiek', inline: true },
            { name: 'weterynarz', value: 'nie lubiem', inline: true },
            { name: 'turlaj', value: 'turlaj dropsa', inline: true },
            { name: 'mikolajki', value: 'prezencior karmelcior' },
        ]);
        // wysyłamy embed jako odpowiedź
        message.reply({ embeds: [embed] });
    },
};
