const { RoleMenu } = require("../models");

module.exports = {
    /**
     * Starts checking...
     * @param {import("discord.js").Client} client Discord Client instance
     */
    async init(client) {
        RoleMenu.find().then(async (roleMenus) => {
            for (roleMenu of roleMenus) {
                // Fetch role menu message if not cached already
                if (!client.guilds.cache.has(roleMenu.guildID)) await client.guilds.fetch(roleMenu.guildID).catch((err) => {
                    console.error("Guild was deleted?: ", err);
                });
                if (!client.channels.cache.has(roleMenu.channelID)) await client.channels.fetch(roleMenu.channelID).catch((err) => {
                    console.error("Channel was deleted?: ", err);
                });
                const channel = client.channels.cache.get(roleMenu.channelID);
                if (!channel) continue;
                if (!channel.messages.cache.has(roleMenu.messageID)) await channel.messages.fetch(roleMenu.messageID).then((message) => {
                    client.databaseCache.roleMenus.set(roleMenu.messageID, roleMenu);
                }).catch((err) => {
                    console.error("Role menu was deleted manually? Removing role menu from database: ", err);

                    // remove role menu from database
                    RoleMenu.deleteOne({ messageID: roleMenu.messageID }).catch((err) => {
                        console.error("Couldn't delete role menu from database: ", err);
                    });
                });
            }
        })
    }
};