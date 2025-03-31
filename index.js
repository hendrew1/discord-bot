require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Initialize DisTube with yt-dlp
const distube = new DisTube(client, {
  plugins: [new YtDlpPlugin()],
});

// Bot ready event
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// Handle messages
client.on("messageCreate", async (message) => {
  if (!message.guild || message.author.bot) return;
  const args = message.content.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "!play") {
    if (!message.member.voice.channel) {
      return message.reply("You need to be in a voice channel to play music!");
    }
    const song = args.join(" ");
    if (!song) return message.reply("Please provide a song name or URL.");

    distube.play(message.member.voice.channel, song, {
      textChannel: message.channel,
      member: message.member,
    });
  }

  if (command === "!stop") {
    const queue = distube.getQueue(message.guild.id);
    if (!queue) return message.reply("There is no music playing!");
    queue.stop();
    message.reply("Music stopped!");
  }

  if (command === "!skip") {
    const queue = distube.getQueue(message.guild.id);
    if (!queue) return message.reply("There is no song to skip!");
    
    if (queue.songs.length <= 1) {
      queue.stop();  // Stop and leave the voice channel
      return message.reply("No more songs left! Music stopped.");
    }
  
    queue.skip();
    message.reply("Skipped to the next song!");
  }
});

// Announce when a song starts playing
distube.on("playSong", (queue, song) => {
  const textChannel = queue.textChannel;
  if (textChannel) {
    textChannel.send(`🎵 Now playing **${song.name}**!`);
  }
});

// Error handling
distube.on("error", (channel, error) => {
  console.error(error);
  if (channel) channel.send("An error occurred while playing music.");
});

// Bot login (Use environment variables for security)
client.login(process.env.BOT_TOKEN);
