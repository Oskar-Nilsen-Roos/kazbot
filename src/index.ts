import Discord from 'discord.js'
import Ytdl from 'ytdl-core'

const client = new Discord.Client()
import { token, prefix } from './config.json'

client.on('ready', () => {
  console.log('Ready!')
})

client.login(token)

client.removeAllListeners()

client.on('message', async message => {
  console.log(message.content)
  if (!message.content.startsWith(prefix) || message.author.bot) return

  const serverReply = message.guild
    ? message.guild.name
    : `I don't think this is a server.. right?`

  command('ping', message, 'https://www.youtube.com/watch?v=gHQP6uOhCg0')
  command('server', message, serverReply)

  if (message.content === '!join') {
    if (message.member && message.member.voice.channel) {
      const connection = await message.member.voice.channel.join()
      connection.play(
        Ytdl('https://www.youtube.com/watch?v=XwZ6hBwTogg', {
          filter: 'audioonly',
        }),
      )
      console.log(connection)
    } else {
      message.reply('You need to join a voice channel first!')
    }
  }
})

function command(
  command: string,
  message: Discord.Message,
  reply: string,
): void {
  if (message.content.startsWith(prefix + command)) {
    message.channel.send(reply)
  }
}
