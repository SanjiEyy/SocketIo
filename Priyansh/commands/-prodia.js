const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "prodia",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "jameslim",
  description: "generate image from prompt",
  commandCategory: "image",
  usages: "query",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  let { threadID, messageID } = event;
  let query = args.join(" ");

  if (!query) {
    return api.sendMessage("Please provide a text/query.", threadID, messageID);
  }

  let path = __dirname + `/cache/prodia.png`;

  try {
    const response = await axios.get(`https://hiroshi-rest-api.replit.app/image/prodia?prompt=${query}`, {
      responseType: "arraybuffer",
    });
    fs.writeFileSync(path, Buffer.from(response.data, "utf-8"));

    api.sendMessage({
      body: "Image will be deleted after 1 hour!",
      attachment: fs.createReadStream(path),
    }, threadID, () => fs.unlinkSync(path), messageID);

  } catch (error) {
    console.error(error);
    api.sendMessage("There was an error generating the image. Please try again later.", threadID, messageID);
  }
};