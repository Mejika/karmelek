    
    import DiscordJS, { GatewayIntentBits, Partials, Client, Interaction, TextChannel, Message, TextBasedChannel } from 'discord.js'
    import WOKCommands from 'wokcommands'
    import dotenv from 'dotenv'
    import { joinVoiceChannel, createAudioPlayer, createAudioResource, 
         AudioPlayerStatus, StreamType, entersState, 
         VoiceConnectionStatus, NoSubscriberBehavior } from '@discordjs/voice';
    import * as path from 'path';
    import { createReadStream } from 'fs';
    import ffmpeg from 'ffmpeg-static';
    const { OpusEncoder } = require('@discordjs/opus');
    dotenv.config()

    

    const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel]
    });

    client.on('ready', () => {
        console.log('Karmelek zyje')

        new WOKCommands({
            client,
            commandsDir: path.join(__dirname, 'commands'),
        })

    })

    
    client.on('messageCreate', (message) => {
        let wiad = message.content.toLowerCase()

        switch (wiad) {
            case 'zarelko':
                message.reply({content: 'Dej',})
                break;
            case 'nie dam zarelka':
                message.channel.send('😿 ja tobie nie lubiem',)
                break;
            case 'gruby jestes':
                message.channel.send('nieplawda',)
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
            if (message.author.bot) return;
            message.reply({content: 'Dej jesc',})
       }

       const wolaniekarmela = ['karmel', 'karmelek', 'kicia', 'kot', 'kocur', 'kicius']

       if (wolaniekarmela.some(slowo => wiad.includes(slowo))) {
            message.channel.send({content: 'Miau',})
       }

        if (wiad.includes('prawda')) {
            message.channel.send({ files: [{ attachment: 'karmel.png' }] });
       }
       if(wiad.includes('weterynarz')) {
            message.channel.send({ files: [{ attachment: 'strych.png' }] });
       }
 })

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() !== 'kicikici') return;

  await message.channel.send('Masz jedzonko?');
  console.log('proba dolaczenia do vc');

  const member = message.member;
  const voiceChannel = member?.voice?.channel;

  if (!voiceChannel) {
    message.channel.send('klamiesz! nie masz jedzonka!');
    console.log('uzyt. nie na vc');
    return;
  }
  console.log(`wykryto vc: ${voiceChannel.name}`);

  try {
    console.log('probuje dolaczyc do vc...');

    

const connection = joinVoiceChannel({
  channelId: voiceChannel.id,
  guildId: voiceChannel.guild.id,
  adapterCreator: voiceChannel.guild.voiceAdapterCreator,
});

connection.on('stateChange', (oldState, newState) => {
  console.log(`Voice connection state changed: ${oldState.status} -> ${newState.status}`);
});

try {
  await entersState(connection, VoiceConnectionStatus.Ready, 30000);
  console.log('wszystko gitez');
} catch (error) {
  console.error('taki blad:', error);
}

 const player = createAudioPlayer();
    const resource = createAudioResource(path.join(__dirname, 'miau.mp3'));

    connection.subscribe(player);
    console.log('dzwiek leci...');
    player.play(resource);

    player.once(AudioPlayerStatus.Idle, () => {
      console.log('dziwiek sie skonczyl');
      connection.destroy();
    });


  } catch (error) {
    console.error('blad przy dolaczaniu:', error);
    message.channel.send('zgubilem siem');
  }
});







   

client.login(process.env.TOKEN)






      