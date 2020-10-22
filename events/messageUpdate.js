/**
 * @param {import("discord.js").Client} client Discord Client instance
 * @param {import("discord.js").Message} oldMessage Discord Message
 * @param {import("discord.js").Message} newMessage Discord Message
*/
module.exports = async (client, oldMessage, newMessage) => {
    if (oldMessage.author.bot) return; // if a bot's message was deleted

    // If the message was not sent in a server
    if (!oldMessage.guild) return;

    let settings;
    try {
        settings = await client.getGuild(oldMessage.guild);
    } catch (err) {
        console.error("message event error: ", err);
    }

    // Update message in database
    client.updateMessage(oldMessage, newMessage, null);
}