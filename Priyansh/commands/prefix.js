const { PREFIX } = global.config;
const moment = require('moment-timezone');
const fs = require('fs');

// Function to generate random Minecraft facts
function getRandomMinecraftFact() {
    const minecraftFacts = [
        "Minecraft was created by Markus Persson, also known as 'Notch'.",
        "The original name for Minecraft was 'Cave Game'.",
        "The game was officially released on November 18, 2011.",
        "Minecraft's music and sound effects were created by C418 (Daniel Rosenfeld).",
        "The first public alpha version of Minecraft was released on May 17, 2009.",
        "Minecraft is one of the best-selling games of all time, with over 200 million copies sold.",
        "There are various versions of Minecraft, including Java Edition, Bedrock Edition, and Education Edition.",
        "The Nether is a dimension in Minecraft filled with lava oceans, dangerous mobs like Ghasts and Piglins.",
        "Endermen are hostile mobs in Minecraft that can pick up and teleport blocks.",
        "Diamonds are one of the rarest resources in Minecraft and are used for crafting powerful tools and armor.",
        "Creepers are iconic hostile mobs in Minecraft known for their ability to explode.",
        "The End is another dimension in Minecraft, home to the Ender Dragon boss.",
        "Redstone is a resource in Minecraft that allows players to create complex circuits and mechanisms.",
        "Minecraft has a creative mode where players have unlimited resources and can fly.",
        "Mojang, the company behind Minecraft, was acquired by Microsoft in 2014.",
        "Minecraft has a vast modding community that creates custom content and modifications.",
        "The game has won numerous awards, including the Game Developers Choice Award for Best Debut Game.",
        "Minecraft has inspired various spin-offs, merchandise, and even educational programs.",
        "There are different biomes in Minecraft, each with unique terrain and vegetation.",
        "Minecraft's world is procedurally generated, meaning each world is unique and randomly generated.",
        "The game continues to receive updates with new features, biomes, and mechanics.",
        "Emeralds are a rare gem in Minecraft primarily used for trading with Villagers.",
        "Minecraft has a thriving multiplayer community with servers hosting various minigames and activities.",
        "Horses, llamas, and other animals can be tamed and ridden in Minecraft.",
        "Potions in Minecraft grant temporary effects such as invisibility or strength.",
        "Minecraft has a 'Hardcore' mode where the game is more challenging and death is permanent.",
        "The game's official website is minecraft.net, where players can find updates, news, and community features."
    ];

    const randomIndex = Math.floor(Math.random() * minecraftFacts.length);
    return minecraftFacts[randomIndex];
}

module.exports.config = {
    name: "prefix",
    version: "1.0.0",
    hasPermission: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Get bot prefix and current time",
    commandCategory: "Dành cho Admin",
    usages: "",
    cooldowns: 5,
};

module.exports.handleEvent = async function ({ event, api }) {
    const { threadID, body, senderID } = event;

    // Check if the sender is not the bot and if the credits match
    if (senderID === global.data.botID || module.exports.config.credits !== "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭") {
        return;
    }

    const arr = [
        "mpre", "mprefix", "prefix", "dấu lệnh", "prefix của bot là gì", "daulenh", 
        "duong", "what prefix", "freefix", "what is the prefix", "bot dead", "bots dead", 
        "where prefix", "what is bot", "what prefix bot", "how to use bot", "how use bot", 
        "where are the bots", "bot not working", "bot is offline", "prefx", "prfix", 
        "prifx", "perfix", "bot not talking", "where is bot"
    ];

    if (arr.includes(body.toLowerCase())) {
        let message = `✾══━━─✷꥟✷─━━══✾\n`;
        message += `My prefix is ${PREFIX}\n`;

        const timeInfo = moment.tz('Asia/Manila').format('h:mm A');
        const dateInfo = moment.tz('Asia/Manila').format('MMMM D');
        const dayInfo = moment.tz('Asia/Manila').format('dddd');

        message += `And today is ${dateInfo}, ${dayInfo}\n`;
        message += `Time: ${timeInfo}\n`;

        // Random fact about Minecraft
        const randomMinecraftFact = getRandomMinecraftFact();
        message += `✾══━━─✷꥟✷─━━══✾\nRandom fact about Minecraft:\n${randomMinecraftFact}\n`;

        message += `✾══━━─✷꥟✷─━━══✾`;

        const gifPath = __dirname + '/noprefix/prefix.gif';

        if (fs.existsSync(gifPath)) {
            api.sendMessage({
                body: message,
                attachment: fs.createReadStream(gifPath)
            }, threadID, (err, messageInfo) => {
                if (err) return console.error(err);

                // Add reaction "👑" to the message
                api.setMessageReaction("👑", messageInfo.messageID);
            });
        } else {
            // Log silently without sending a message
            console.error("GIF file not found:", gifPath);
        }
    }
};

module.exports.run = async function ({ event, api }) {
    return api.sendMessage("This command is triggered by specific keywords in the chat. Try typing one of those keywords to see it in action.", event.threadID);
};
