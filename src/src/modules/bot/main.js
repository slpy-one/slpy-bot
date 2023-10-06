const color = require('bash-color')
const path = require('node:path')
const fs = require('node:fs')
const {
  Client,
  GatewayIntentBits,
  ActivityType,
  Collection,
} = require('discord.js')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.on('ready', () => {
  console.log(`${color.cyan('⎹')} Logged in as ${color.cyan(client.user.tag)}`)

  client.user.setActivity({
    name: 'your activity',
    type: ActivityType.Watching,
  })
})

client.commands = new Collection()

let cPath = path.join(__dirname, '/commands')
const commandFiles = fs
  .readdirSync(cPath)
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const filePath = path.join(cPath, file)
  const command = require(filePath)
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    )
  }
}

client.login(process.env.discord_TOKEN)
