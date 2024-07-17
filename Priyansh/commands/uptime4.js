const os = require('os');
const si = require('systeminformation');
const prettyMs = require('pretty-ms');

module.exports.config = {
    name: "uptime4",
    version: "1.0.0",
    hasPermssion: 0,
    creditss: "datoccho",
    description: "Show system and bot uptime information",
    commandCategory: "system",
    usages: "",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const { threadID, messageID } = event;

    // Get system information
    const osInfo = await si.osInfo();
    const cpu = await si.cpu();
    const currentLoad = await si.currentLoad();
    const mem = await si.mem();
    const disk = await si.fsSize();
    const networkInterfaces = os.networkInterfaces();

    // Format network information
    const ipv4Addresses = [];
    const ipv6Addresses = [];
    const macAddresses = [];
    for (let iface of Object.values(networkInterfaces)) {
        for (let info of iface) {
            if (info.family === 'IPv4') ipv4Addresses.push(info.address);
            if (info.family === 'IPv6') ipv6Addresses.push(info.address);
            macAddresses.push(info.mac);
        }
    }

    // Get uptime information
    const botUptime = process.uptime();
    const serverUptime = os.uptime();

    // Format the message
    const message = `
𝐒𝐭𝐚𝐭𝐮𝐬 & 𝐍𝐞𝐭𝐰𝐨𝐫𝐤 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧
----------------------
⚙  𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:
  𝐎𝐒: ${osInfo.distro} ${osInfo.release}
  𝐊𝐞𝐫𝐧𝐞𝐥 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: ${osInfo.kernel}
  𝐇𝐨𝐬𝐭𝐧𝐚𝐦𝐞: ${os.hostname()}
  𝐀𝐫𝐜𝐡: ${os.arch()}
  𝐂𝐏𝐔: ${cpu.manufacturer} ${cpu.brand} @ ${cpu.speed}GHz (${cpu.cores} cores)
  𝐋𝐨𝐚𝐝 𝐀𝐯𝐠: ${currentLoad.avgload.toFixed(2)}%
----------------------
🌐 𝐍𝐞𝐭𝐰𝐨𝐫𝐤 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:
  𝐈𝐏𝐕𝟒: ${ipv4Addresses.join(', ')}
  𝐈𝐏𝐕𝟔: ${ipv6Addresses.join(', ')}
  𝐌𝐚𝐜 𝐀𝐝𝐝𝐫𝐞𝐬𝐬: ${macAddresses.join(', ')}
  𝐏𝐢𝐧𝐠: N/Ams
----------------------
💾 𝐒𝐭𝐨𝐫𝐚𝐠𝐞 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:
  𝐓𝐨𝐭𝐚𝐥 𝐃𝐢𝐬𝐤 𝐒𝐩𝐚𝐜𝐞: ${(disk.reduce((total, d) => total + d.size, 0) / 1e9).toFixed(2)} GB
  𝐅𝐫𝐞𝐞 𝐃𝐢𝐬𝐤 𝐒𝐩𝐚𝐜𝐞: ${(disk.reduce((total, d) => total + d.available, 0) / 1e9).toFixed(2)} GB
  𝐔𝐬𝐞𝐝 𝐃𝐢𝐬𝐤 𝐒𝐩𝐚𝐜𝐞: ${(disk.reduce((total, d) => total + d.used, 0) / 1e9).toFixed(2)} GB
----------------------
🧠 𝐌𝐞𝐦𝐨𝐫𝐲 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧:
  𝐓𝐨𝐭𝐚𝐥 𝐌𝐞𝐦𝐨𝐫𝐲: ${(mem.total / 1e9).toFixed(2)} GB
  𝐅𝐫𝐞𝐞 𝐌𝐞𝐦𝐨𝐫𝐲: ${(mem.free / 1e9).toFixed(2)} GB
  𝐔𝐬𝐞𝐝 𝐌𝐞𝐦𝐨𝐫𝐲: ${(mem.used / 1e9).toFixed(2)} GB
----------------------
🤖 𝐁𝐨𝐭 𝐔𝐩𝐭𝐢𝐦𝐞: ${prettyMs(botUptime * 1000)}
⚙ 𝐒𝐞𝐫𝐯𝐞𝐫 𝐔𝐩𝐭𝐢𝐦𝐞: ${Math.floor(serverUptime / 86400)}d ${prettyMs((serverUptime % 86400) * 1000)}
📊 𝐏𝐫𝐨𝐜𝐞𝐬𝐬 𝐌𝐞𝐦𝐨𝐫𝐲 𝐔𝐬𝐚𝐠𝐞: ${(process.memoryUsage().rss / 1e6).toFixed(2)} MB
----------------------`;

    // Send the message
    return api.sendMessage(message, threadID, messageID);
};
