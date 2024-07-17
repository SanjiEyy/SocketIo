module.exports.config = {
	name: "translate",
	version: "1.0.1",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
	description: "Text translation",
	commandCategory: "media",
	usages: "[en/ko/hi/vi] [Text]",
	cooldowns: 5,
	dependencies: {
			"request": ""
	}
};

module.exports.run = async ({ api, event, args }) => {
	const request = global.nodemodule["request"];
	const content = args.join(" ");
	if (content.length == 0 && event.type != "message_reply") return global.utils.throwError(this.config.name, event.threadID, event.messageID);

	let translateThis;
	let lang;

	if (event.type == "message_reply") {
			translateThis = event.messageReply.body;
			lang = content.trim() || global.config.language;
	} else {
			const splitContent = content.split(" -> ");
			if (splitContent.length === 2) {
					translateThis = splitContent[0];
					lang = splitContent[1];
			} else {
					translateThis = content;
					lang = global.config.language;
			}
	}

	return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
			if (err) return api.sendMessage("An error has occurred!", event.threadID, event.messageID);
			var retrieve = JSON.parse(body);
			var text = '';
			retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
			var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];
			api.sendMessage(`Translation: ${text}\n - translated from ${fromLang} to ${lang}`, event.threadID, event.messageID);
	});
};
