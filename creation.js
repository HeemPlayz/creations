const Discord = require('discord.js');
const prefix = "!";
const hero = new Discord.Client({maxMessagesCache: 1});

hero.on('ready', async () => {
	console.log(`Client is ready.`);
	console.log();
	console.log(`Logged in ${hero.user.tag}`);
	
	hero.user.setActivity('Creations.', {type: 1, url: "https://twitch.tv/6xlez1"});
	if(hero.guilds.size > 1) {
	  hero.guilds.forEach(g => {
	    if(g.id === '492914743053385739') return;
	    g.leave();
	  });
	}
});

hero.on('message',async message => {
	if(message.author.bot || message.channel.type === 'dm' || message.guild.id !== '492914743053385739') return;
	let args = message.content.split(' ');
	let author = message.author;
  let guild = message.guild;
	let mention = message.mentions.users.first();

  let lang;
  let time;
  let exp;

  let code;
  let desc;
  let creator;
	if(args[0] === `${prefix}تقديم`) {
      try {
      message.delete().catch();
      if(message.member.roles.has('492922504302690322')) return message.channel.send('- **أنت تملك رتبة السبورت بالفعل**');
      let msg = await message.channel.send('- **أكتب لغتك البرمجية الان**');
      let awaiting = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 20000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        lang = collected.content;
        msg = await msg.edit('- **أكتب مدة خبرتك البرمجية الان**');
        awaiting = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 20000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          time = collected.content;
          msg = await msg.edit('- **أكتب خبرتك البرمجية الان**');
          awaiting = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 20000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            exp = collected.content;
            msg = await msg.edit(`» اللغة : **${lang}**\n» المدة : **${time}**\n» الخبرة : **${exp}**\n\n **هل انت متأكد ؟**`);
            await msg.react('✅');
            await msg.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = msg.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = msg.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              msg = await msg.delete().catch();
              message.channel.send('- **تم ارسال التقديم**');
              let c = message.guild.channels.get('492940220552183819');
              c.send(`» اللغة : **${lang}**\n» المدة : **${time}**\n» الخبرة : **${exp}**\n\n تم التقديم بواسطة : ${author}`);
            });
            falseM.on('collect', async (r) => {
              msg = await msg.delete().catch();
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}قبول`) {
		if(!message.member.roles.has('492922502368985088')) return message.channel.send('- **يجب عليك ان تكون من ادارة السيرفر**');
		if(!mention) {
			let m = await message.channel.send('- **منشن العضو الذي تريد قبوله**');
			message.delete().catch();
			return m.delete(5000);
		}

		let member = message.guild.member(mention);
		let c = message.guild.channels.get('492943073894989825');
		let role = message.guild.roles.find(r => r.name === '☯・Support');
		message.channel.send('- **تم قبول العضو بنجاح**');
		member.addRole(role);

		c.send(`**» العضو :** ${mention}\n[ ${message.guild.emojis.find(r => r.name === 'greenTick')} ] :: لقد تم قبول العضو واعطائه رتبة سبورت`);
	} else if(args[0] === `${prefix}رفض`) {
		if(!message.member.roles.has('492922502368985088')) return message.channel.send('- **يجب عليك ان تكون من ادارة السيرفر**');
		if(!mention) {
			let m = await message.channel.send('- **منشن العضو الذي تريد رفضه**');
			message.delete().catch();
			return m.delete(5000);
		}

		let member = message.guild.member(mention);
		let c = message.guild.channels.get('492943073894989825');
		
		message.channel.send('- **تم رفض العضو بنجاح**');
		c.send(`**» العضو :** ${mention}\n[ ${message.guild.emojis.find(r => r.name === 'redTick')} ] :: لقد تم رفض العضو`);
	} else if(args[0] === `${prefix}js`) {
    try {
      if(!message.member.roles.has('492922504302690322')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`js\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('492964899467821056');
              c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كريشنز\n\`\`\`js\n${code}\`\`\`\n**» وصف الكود :**\n${desc.replace('**', '')}\n\n**» تم النشر بواسطة :** ${message.author}\n**» صاحب الكود :** ${creator}`)
            });
            falseM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}html`) {
    try {
      if(!message.member.roles.has('492922504302690322')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`html\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('492965081630375939');
              c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كريشنز\n\`\`\`html\n${code}\`\`\`\n**» وصف الكود :**\n${desc.replace('**', '')}\n\n**» تم النشر بواسطة :** ${message.author}\n**» صاحب الكود :** ${creator}`)
            });
            falseM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}python`) {
    try {
      if(!message.member.roles.has('492922504302690322')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`python\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('492964975971926030');
              c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كريشنز\n\`\`\`python\n${code}\`\`\`\n**» وصف الكود :**\n${desc.replace('**', '')}\n\n**» تم النشر بواسطة :** ${message.author}\n**» صاحب الكود :** ${creator}`)
            });
            falseM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}eris`) {
    try {
      if(!message.member.roles.has('492922504302690322')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
      let m = await message.channel.send('- **ارسل الكود الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
        let collected = c.first();
        collected.delete().catch();
        code = collected.content;
        m = await m.edit('- **ارسل وصف الكود الان**');
        awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
          let collected = c.first();
          collected.delete().catch();
          desc = collected.content;
          m.edit('- **ارسل اسم السيرفر او الشخص صانع الكود**');
          awaited = await message.channel.awaitMessages(r => r.author.id === author.id, {max: 1, time: 25000, errors:['time']}).then(async c => {
            let collected = c.first();
            collected.delete().catch();
            creator = collected.content;
            m = await m.edit(`${message.author}, \`\`\`js\n${code}\`\`\`\nوصف الكود :\n${desc}\n\nصاحب الكود : ${creator}`);
            await m.react('✅');
            await m.react('❌');
            let thisTrue = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
            let thisFalse = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
            let trueM = m.createReactionCollector(thisTrue, { time: 12000 });
            let falseM = m.createReactionCollector(thisFalse, { time: 12000 });

            trueM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('492965132687638538');
              c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كريشنز\n\`\`\`js\n${code}\`\`\`\n**» وصف الكود :**\n${desc.replace('**', '')}\n\n**» تم النشر بواسطة :** ${message.author}\n**» صاحب الكود :** ${creator}`)
            });
            falseM.on('collect', async (r) => {
              m = await m.delete().catch();
              message.channel.send('- **تم الغاء الارسال**');
            });
          });
        });
      });
    } catch(e) {
      if(e) return;
    }
  } else if(args[0] === `${prefix}clear`) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('- **أنت لا تملك الصلاحيات اللازمة**');
    message.delete().then(() => {
      let size = 0;
      if(!args[1]) size = 100;
      if(args[1] && !isNaN(args[1])) Math.round(size);
      if(size > 100) return message.channel.send('- لا يمكنك مسح اكثر من **100** رسالة');
      message.channel.fetchMessages().then(m => {
        message.channel.bulkDelete(size);
        message.channel.send(`- تم مسح **${m.size}** من الرسائل`).then(m => m.delete(5000));
      });
    }).catch();
  }
});

hero.login(process.env.CREATIONS);