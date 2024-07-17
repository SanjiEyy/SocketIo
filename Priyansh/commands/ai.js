const axios = require("axios");

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "BlackBoxAi by Priyansh",
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 2,
    dependencies: {
        "axios": "1.4.0"
    }
};

const services = [
    { url: 'https://hiroshi-rest-api.replit.app/ai/gpt4onew?ask=', params: 'ask' },
    { url: 'https://ai-tools.replit.app/gpt', params: 'prompt' },
    { url: 'https://openaikey-x20f.onrender.com/api', params: 'prompt' },
    { url: 'http://fi1.bot-hosting.net:6518/gpt', params: 'query' },
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: 'question' },
    { url: 'https://markdevs-last-api.onrender.com/gpt4', params: 'prompt' },
    { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', params: 'prompt' },
    { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', params: 'prompt' }
];

async function fetchResponse(query) {
    for (const service of services) {
        try {
            const res = await axios.get(`${service.url}${encodeURIComponent(query)}`);
            return res.data.response || res.data;
        } catch (error) {
            console.error(`Error fetching data from ${service.url}`, error);
        }
    }
    throw new Error("All services failed");
}

function getTimeAndDate() {
    const now = new Date();
    const timeZoneOffset = -480; // Offset for Manila timezone in minutes (UTC+8:00)
    const utcTimestamp = now.getTime() + (now.getTimezoneOffset() * 60000);
    const manilaTimestamp = utcTimestamp + (timeZoneOffset * 60000);
    const manilaDate = new Date(manilaTimestamp);

    const time = manilaDate.toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour12: false });
    const date = manilaDate.toLocaleDateString('en-US', { timeZone: 'Asia/Manila' });

    return { time, date };
}

module.exports.handleEvent = async function ({ api, event, Users }) {
    const { threadID, messageID, body } = event;

    if (body.toLowerCase().startsWith("ai ")) {
        const query = body.slice(3).trim();
        const name = await Users.getNameUser(event.senderID);

        if (!query) {
            return api.sendMessage("Please type a message...", threadID, messageID);
        }

        api.sendMessage("Searching for an answer, please wait...", threadID, messageID);

        try {
            api.setMessageReaction("⌛", event.messageID, () => { }, true);
            const data = await fetchResponse(query);
            const { time, date } = getTimeAndDate();
            const responseMessage = `✾══━━─✷꥟✷─━━══✾\n𝘀𝘆𝗲𝗻𝗽𝗮𝗶👑 𝗽𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗴𝗽𝘁 𝟰\n✾══━━─✷꥟✷─━━══✾\n${data}\n━━━━━━━━━━━━━━━━\n𝘁𝗶𝗺𝗲 𝗮𝗻𝗱 𝗱𝗮𝘁𝗲 📅\n${time}\n${date}\n━━━━━━━━━━━━━━━━`;
            api.sendMessage(responseMessage, event.threadID, messageID);
            api.setMessageReaction("✅", event.messageID, () => { }, true);
        } catch (error) {
            api.sendMessage("An error occurred while fetching data. Please try again later.", threadID, messageID);
            api.setMessageReaction("❌", event.messageID, () => { }, true);
        }
    }
};

module.exports.run = async function ({ api, event, args, Users }) {
    const { threadID, messageID } = event;
    const query = args.join(" ").trim();
    const name = await Users.getNameUser(event.senderID);

    if (!query) {
        return api.sendMessage("Please type a message...", threadID, messageID);
    }

    api.sendMessage("Searching for an answer, please wait...", threadID, messageID);

    try {
        api.setMessageReaction("⌛", event.messageID, () => { }, true);
        const data = await fetchResponse(query);
        const { time, date } = getTimeAndDate();
        const responseMessage = `✾══━━─✷꥟✷─━━══✾\n𝘀𝘆𝗲𝗻𝗽𝗮𝗶👑 𝗽𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗴𝗽𝘁 𝟰\n✾══━━─✷꥟✷─━━══✾\n${data}\n━━━━━━━━━━━━━━━━\n𝘁𝗶𝗺𝗲 𝗮𝗻𝗱 𝗱𝗮𝘁𝗲 📅\n${time}\n${date}\n━━━━━━━━━━━━━━━━`;
        api.sendMessage(responseMessage, event.threadID, messageID);
        api.setMessageReaction("✅", event.messageID, () => { }, true);
    } catch (error) {
        api.sendMessage("An error occurred while fetching data. Please try again later.", threadID, messageID);
        api.setMessageReaction("❌", event.messageID, () => { }, true);
    }
};
