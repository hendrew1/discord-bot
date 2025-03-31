# Discord Music Bot

This is a simple Discord music bot built using `discord.js` and `distube` that allows users to play music in a voice channel. It uses `yt-dlp` to fetch and play songs from YouTube.

## Features

- Play music from YouTube using `yt-dlp`.
- Stop the currently playing music.
- Skip to the next song in the queue.
- Automatically announces the currently playing song.

## Installation

### Prerequisites
- Node.js installed
- A Discord bot token
- Required Discord bot permissions
- **FFmpeg installed** https://ffmpeg.org/download.html

### Steps
1. Clone this repository or copy the code into a new project.
2. Install the dependencies using npm:
   ```sh
   npm install discord.js distube @distube/yt-dlp
   ```
3. Install FFmpeg and ensure it is added to your system's PATH.
4. Create an `.env` file and add your bot token:
   ```sh
   BOT_TOKEN=your_discord_bot_token
   ```
5. Run the bot:
   ```sh
   node bot.js
   ```

## Commands

| Command | Description |
|---------|-------------|
| `!play <song_URL>` | Plays a song from YouTube in a voice channel. |
| `!stop` | Stops the music and clears the queue. |
| `!skip` | Skips the current song and moves to the next one in the queue. |

## How It Works

1. **Bot Initialization**
   - The bot is initialized with required intents to handle messages and voice states.
   - DisTube is set up with `yt-dlp` as a plugin to enable YouTube playback.

2. **Handling Commands**
   - Listens for message events to check if a command is issued.
   - Validates if the user is in a voice channel before playing music.
   - Uses DisTube to manage music playback.

3. **Event Listeners**
   - Logs in the bot once it's ready.
   - Announces the song currently being played.
   - Handles errors gracefully by logging them and notifying users in the channel.

## Notes
- Ensure your bot has `MESSAGE_CONTENT`, `GUILD_VOICE_STATES`, and `GUILDS` permissions enabled in the Discord Developer Portal.
- The bot must be invited with appropriate permissions to function properly.

## License
This project is open-source and free to use.

