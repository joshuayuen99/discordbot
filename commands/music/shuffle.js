const { shuffle } = require("../../functions.js");

module.exports = {
    name: "shuffle",
    category: "music",
    description: "Shuffles the current queue, or toggles shuffling of the queue with the [toggle] or [t] option.",
    usage: "shuffle [toggle | t]",
    run: async (client, message, args) => {
        const serverQueue = client.musicGuilds.get(message.guild.id);
        if(!serverQueue) {
            return message.reply("There isn't a queue to shuffle")
                .then(m => m.delete(5000));
        }

        // If not toggled, just shuffle
        if(!args[0]) {
            const currentSong = serverQueue.songs.slice(0, 1);
            serverQueue.songs = currentSong.concat(shuffle(serverQueue.songs.slice(1)));
            return message.channel.send("Done shuffling current queue");
        }
        else if(args[0].toLowerCase() == "toggle" || args[0].toLowerCase() == "t") {
            serverQueue.toggle = serverQueue.toggle ? false : true;
            return message.channel.send(`Shuffling is now set to ${serverQueue.toggle}`);
        }
        else {
            const currentSong = serverQueue.songs.slice(0, 1);
            serverQueue.songs = currentSong.concat(shuffle(serverQueue.songs.slice(1)));
            return message.channel.send("Done shuffling current queue");
        }
    }
}