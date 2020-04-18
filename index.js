const { Client, MessageCollector } = require('discord.js')
const client = new Client()
const bot_prefix = '-'

require('dotenv').config()
const token = process.env.BOT_TOKEn

const robots = require('./functions/image.js')


client.on('ready', () => {
    console.log(`Bot iniciado`)

    client.user.setPresence({ activity: { name: "Pokémon 😉" }, afk: true, status: "idle" })
})

client.on('message', message => {
    if(message.author.bot || message.channel.type == "dm") 
        return;
    
    let filter = m => true
    let collector = new MessageCollector(message.channel, filter, { max: 1 })

    

    collector.on('collect', message => {
        
        if(message.embeds[0]) {
            if(message.embeds[0].image) {

                if(message.guild.id == '575815357609148426') {
                    
                    if(message.channel.id !== '589611252897284098' && message.content.startsWith('p!')) {
                        if(message.content.startsWith('Congratulations <@398223947403100170>!')) {
                            message.delete({ timeout: 3000 })
                        }
                        message.delete( { timeout: 3000 } )
                    }
                    
                    var url = message.embeds[0].image.url

                    robots.nameOfPokemon(message, client, url)
                } else {

                    var url = message.embeds[0].image.url

                    robots.nameOfPokemon(message, client, url)

                }

            }
        }
    })
    

    if(!message.content.toLowerCase().startsWith(bot_prefix))
        return

    const args = message.content.slice(bot_prefix.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase()

    try {
        let commands = require(`./commands/${comando}.js`)
        commands.run(client, message, args)
    } catch (e) {
        message.channel.send('翻訳者に行き、吸盤が何であるかを確認してください')
    }
})

client.login(token)