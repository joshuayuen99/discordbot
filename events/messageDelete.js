module.exports = async (client, message) => {
    if (message.author.bot) return; // if a bot's message was deleted

    // If the message was not sent in a server
    if (!message.guild) return;

    let settings;
    try {
        settings = await client.getGuild(message.guild);
    } catch (err) {
        console.error("message event error: ", err);
    }

    // Update message in database
    client.updateMessage(message, null, { deleted: true });
}