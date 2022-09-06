/**
 *
 * @param {import("../lib/DiscordMusicBot")} client
 * @param {import("discord.js").VoiceState} oldState
 * @param {import("discord.js").VoiceState} newState
 * @returns {Promise<void>}
 */
module.exports = async (client, oldState, newState) => {
  // get guild and player
  let guildId = newState.guild.id;
  const player = client.manager.get(guildId);

  // check if the bot is active (playing, paused or empty does not matter (return otherwise)
  if (!player || player.state !== "CONNECTED") return;

  // prepreoces the data
  const stateChange = {};
  // get the state change
  if (oldState.channel === null && newState.channel !== null)
    stateChange.type = "JOIN";
  if (oldState.channel !== null && newState.channel === null)
    stateChange.type = "LEAVE";
  if (oldState.channel !== null && newState.channel !== null)
    stateChange.type = "MOVE";
  if (oldState.channel === null && newState.channel === null) return; // you never know, right
  if (newState.serverMute == true && oldState.serverMute == false) // !TODO: Prevent the bot from being muted if someone else is server muted. The way I patched (#766) is not the best way to do it since music is still playing if the bot is server muted.
    return;
  if (newState.serverMute == false && oldState.serverMute == true)
    return;
  // move check first as it changes type
  if (stateChange.type === "MOVE") {
    if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
    if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
  }
  // double triggered on purpose for MOVE events
  if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
  if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

  // check if the bot's voice channel is involved (return otherwise)
  if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel)
    return;

  // filter current users based on being a bot
  stateChange.members = stateChange.channel.members.filter(
    (member) => !member.user.bot
  );

  switch (stateChange.type) {
    case "JOIN":
      if (client.config.alwaysplay === false) {
        if (stateChange.members.size === 1 && player.paused) {
          let playerResumed = client
            .Embed()
            // say that the queue has been resumed
            .setTitle(`Resumed!`, client.config.iconURL)
            .setFooter({ text: `The current song has been resumed.` });
          await client.channels.cache
            .get(player.textChannel)
            .send({ embeds: [playerResumed] });

          //!BUG Updated nowplaying message doesn't show buttons
          // update the now playing message and bring it to the front
          let playerPlaying = await client.channels.cache
            .get(player.textChannel)
            .send({
              embeds: [player.nowPlayingMessage.embeds[0]],
              components: [client.createController(player.options.guild)],
            });
          player.setNowplayingMessage(playerPlaying);
          player.pause(false);
        }
      }
      break;
    case "LEAVE":
      if (client.config.alwaysplay === false) {
        if (
          stateChange.members.size === 0 &&
          !player.paused &&
          player.playing
        ) {
          player.pause(true);

          let playerPaused = client
            .Embed()
            .setTitle(`Paused!`, client.config.iconURL)
            .setFooter({
              text: `The current song has been paused because theres no one in the voice channel.`,
            });
          await client.channels.cache
            .get(player.textChannel)
            .send({ embeds: [playerPaused] });
        }
      }
      break;
    }
};