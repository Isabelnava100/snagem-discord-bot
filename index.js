const { Client, Intents, MessageEmbed } = require("discord.js");
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:5173', 'https://snagemguild.com/']
}));

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
});

const guild = client.guilds.fetch(process.env.GUILD_ID);

app.use(express.json());

app.post('/', (req, res) => {  
  const { usernames,url,nameThread,via,from } = req.body;
  let mentionedUsers = '';
  usernames.forEach(username => mentionedUsers += `<@${username}> `); 
  
 let embed = new MessageEmbed()
      .setTitle(`new post at ${nameThread} from ${from}`)
      .setURL(url)
      .setDescription(`${via}: ${mentionedUsers}`)
      .setColor("#782B77")
  
  client.channels.cache.get(process.env.CHANNEL_ID).send({ embeds: [embed] })
    .catch(error => console.error('Err sending msg: ', error));
  res.sendStatus(200);
});

app.get('/', (req, res) => {
   res.send('Hello, World!');
});

const listener = app.listen(process.env.PORT, () => {
    console.log('App is on port: ' + listener.address().port);
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`); 
});

client.login(process.env.DISCORD_TOKEN);