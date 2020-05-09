import Discord, {
  Message,
  StreamDispatcher,
  VoiceConnection,
  TextChannel,
} from 'discord.js'
import Ytdl from 'ytdl-core'

const client = new Discord.Client()

let dispatcher: StreamDispatcher | undefined
let connection: VoiceConnection | undefined

import { token, prefix } from './config.json'

client.on('debug', console.log)

client.once('ready', () => {
  //setChannelEmbed('701464024180588575')
  console.log('Ready!')
})
client.once('shardReconnecting', () => {
  console.log('Reconnecting!')
})
client.once('disconnect', () => {
  console.log('Disconnect!')
})

client.login(token)

client.on('message', async message => {
  console.log('Message: ' + message.content)
  commands(message)
})

function commands(message: Message): void {
  if (!message.content.startsWith(prefix) || message.author.bot) return
  let command = message.content
  if (message.content.indexOf(' ') !== -1) {
    command = command.substring(0, message.content.indexOf(' '))
  }
  switch (command) {
    case '!ping':
      commandHandler(
        'ping',
        message,
        'https://www.youtube.com/watch?v=gHQP6uOhCg0',
      )
      break
    case '!server':
      {
        const serverReply = message.guild
          ? message.guild.name
          : `I don't think this is a server.. right?`
        commandHandler('server', message, serverReply)
      }
      break
    case '!music':
      handleMusicCommands(message)
      break
    case '!ids':
      if (message.guild) message.reply(message.guild.id)
      break
    default:
      message.reply('unknown command')
  }
}

async function setChannelEmbed(channelId: string): Promise<void> {
  console.log('hello')
  const channel = (await client.channels.fetch(channelId)) as TextChannel
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor(
      'Some name',
      'https://i.imgur.com/wSTFkRM.png',
      'https://discord.js.org',
    )
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/wSTFkRM.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addField('Inline field title', 'Some value here', true)
    .setImage('https://i.imgur.com/wSTFkRM.png')
    .setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png')
  channel.send(exampleEmbed)
}

function commandHandler(
  command: string,
  message: Discord.Message,
  reply: string,
): void {
  if (message.content.startsWith(prefix + command)) {
    message.channel.send(reply)
  }
}

async function handleMusicCommands(message: Message): Promise<void> {
  // take args
  const args: string[] = message.content.slice(prefix.length).split(/ +/)
  const firstArg = args[1]
  if (args.length < 2) {
    message.reply('no args given for music command')
    return
  }

  switch (firstArg) {
    case 'join':
      connection = await joinChannel(message)
      console.log(connection)
      break
    case 'play':
      console.log('play', connection)
      if (connection && args[2]) {
        dispatcher = playYoutube(args[2], connection)
      } else {
        message.reply('No link supplied in args')
      }
      break
    case 'pause':
      if (dispatcher) {
        dispatcher.pause()
      }
      break
    case 'resume':
      if (dispatcher) {
        dispatcher.resume()
      }
      break
    default:
      break
  }
}

async function joinChannel(
  message: Message,
): Promise<VoiceConnection | undefined> {
  if (message.member && message.member.voice.channel) {
    return await message.member.voice.channel.join()
  } else {
    message.reply('You need to join a voice channel first!')
    return
  }
}

function playYoutube(
  link: string,
  connection: VoiceConnection,
): StreamDispatcher | undefined {
  return connection.play(
    Ytdl(link, {
      filter: 'audioonly',
    }),
    { volume: 0.5 },
  )
}
