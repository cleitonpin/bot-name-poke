const { Client, MessageCollector } = require('discord.js')
const client = new Client()
const bot_prefix = '-'

require('dotenv').config()
const token = process.env.BOT_TOKEn

const robots = require('./functions/image.js')


const bot_status = [
    { name: 'WWZ', type: "PLAYING" },
]

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
                console.log(true)
                var url = message.embeds[0].image.url

                robots.nameOfPokemon(message, client, url)
                if(message.channel.id !== "589611252897284098"){
                    message.delete({ timeout: 5000 })
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