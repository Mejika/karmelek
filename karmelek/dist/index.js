"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const wokcommands_1 = __importDefault(require("wokcommands"));
const dotenv_1 = __importDefault(require("dotenv"));
const voice_1 = require("@discordjs/voice");
const path = __importStar(require("path"));
const { OpusEncoder } = require('@discordjs/opus');
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates
    ],
    partials: [discord_js_1.Partials.Channel]
});
client.on('ready', () => {
    console.log('Karmelek zyje');
    new wokcommands_1.default({
        client,
        commandsDir: path.join(__dirname, 'commands'),
    });
});
client.on('messageCreate', (message) => {
    let wiad = message.content.toLowerCase();
    switch (wiad) {
        case 'zarelko':
            message.reply({ content: 'Dej', });
            break;
        case 'nie dam zarelka':
            message.channel.send('😿 ja tobie nie lubiem');
            break;
        case 'gruby jestes':
            message.channel.send('nieplawda');
            break;
        case 'kocimietka':
            message.channel.send({ files: [{ attachment: 'karmelzjarany.png' }] });
            break;
        case 'mikolajki':
            message.channel.send({ files: [{ attachment: 'karmelkowyprezent.png' }] });
            break;
        case 'turlaj':
            message.channel.send({ files: [{ attachment: 'turlaj.jpg' }] });
            break;
        case 'bagieta':
            message.channel.send({ files: [{ attachment: 'bagieta.jpg' }] });
            break;
        default:
            break;
    }
    const jedzenietab = ['jedzonko', 'jedzenie', 'karma', 'zarcie', 'mieso', 'miesko'];
    if (jedzenietab.some(slowo => wiad.includes(slowo))) {
        if (message.author.bot)
            return;
        message.reply({ content: 'Dej jesc', });
    }
    const wolaniekarmela = ['karmel', 'karmelek', 'kicia', 'kot', 'kocur', 'kicius'];
    if (wolaniekarmela.some(slowo => wiad.includes(slowo))) {
        message.channel.send({ content: 'Miau', });
    }
    if (wiad.includes('prawda')) {
        message.channel.send({ files: [{ attachment: 'karmel.png' }] });
    }
    if (wiad.includes('weterynarz')) {
        message.channel.send({ files: [{ attachment: 'strych.png' }] });
    }
});
client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (message.author.bot)
        return;
    if (message.content.toLowerCase() !== 'kicikici')
        return;
    yield message.channel.send('🔊 Masz jedzonko?');
    console.log('➡️ Odebrano wiadomość "kicikici", odpowiadam i próbuję dołączyć do VC');
    const member = message.member;
    const voiceChannel = (_a = member === null || member === void 0 ? void 0 : member.voice) === null || _a === void 0 ? void 0 : _a.channel;
    if (!voiceChannel) {
        message.channel.send('😿 Nie jesteś na kanale głosowym!');
        console.log('❌ Użytkownik nie jest na kanale głosowym, kończę');
        return;
    }
    console.log(`➡️ Użytkownik jest na kanale głosowym: ${voiceChannel.name}`);
    try {
        console.log('➡️ Próba dołączenia do kanału głosowego...');
        const connection = (0, voice_1.joinVoiceChannel)({
            channelId: voiceChannel.id,
            guildId: voiceChannel.guild.id,
            adapterCreator: voiceChannel.guild.voiceAdapterCreator,
        });
        connection.on('stateChange', (oldState, newState) => {
            console.log(`Voice connection state changed: ${oldState.status} -> ${newState.status}`);
        });
        try {
            yield (0, voice_1.entersState)(connection, voice_1.VoiceConnectionStatus.Ready, 30000);
            console.log('Połączenie głosowe jest gotowe!');
        }
        catch (error) {
            console.error('Błąd połączenia:', error);
        }
        const player = (0, voice_1.createAudioPlayer)();
        const resource = (0, voice_1.createAudioResource)(path.join(__dirname, 'miau.mp3'));
        connection.subscribe(player);
        console.log('➡️ Subskrybowano player, startuję odtwarzanie...');
        player.play(resource);
        player.once(voice_1.AudioPlayerStatus.Idle, () => {
            console.log('⏹️ Odtwarzanie zakończone, niszczę połączenie');
            connection.destroy();
        });
    }
    catch (error) {
        console.error('❌ Błąd podczas dołączania:', error);
        message.channel.send('❌ Wystąpił błąd podczas dołączania do kanału głosowego.');
    }
}));
client.login(process.env.TOKEN);
