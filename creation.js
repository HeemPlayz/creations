const Discord = require('discord.js');
const prefix = "!";
const hero = new Discord.Client({maxMessagesCache: 1});
const client = new Discord.Client();

client.on('ready', () => {
    console.log('╔[════════════════════════════════════]╗'); // Heeeeeemo
    console.log('')
    console.log('            ╔[════════════]╗')
    console.log('              Bot Is Online')
    console.log('            ╚[════════════]╝')
    console.log('')
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('')
    console.log(`servers! [ " ${client.guilds.size} " ]`);
    console.log('')
    console.log(`Users! [ " ${client.users.size} " ]`);
    console.log('')
    console.log('╚[════════════════════════════════════]╝')
          client.user.setActivity("#js",{type: 'STREAMING'});     //Heeeeeemo Heeeeeeeeeemo   
});

client.on('message', async message => {
  if (message.content.startsWith('!help'))

  var embed = new Discord.RichEmbed()

  .setColor('RANDOM')
  .addField(`-js`,`Publish a JavaScript Code (Must be Support)`,true)
  .addField(`-html`,`Publish a HTML Code (Must be Support)`,true)
  .addField(`-python`,`Publish a Python Code (Soon)`,true)
  .addField(`-eris`,`Publish an Eris Code (Soon)`,true)
  .addField(`-تقديم`,`تقديم على رتبة سبورت (Must Not be Support)`,true)
  .addField(`-قبول`,`قبول شخص على تقديمه (Admininstrator Only)`,true)
  .addField(`-رفض`,`رفض شخص على تقديمه (Administrator Only)`,true)
  .setTimestamp()
  
  message.channel.send(embed)

});  

hero.on('ready', async () => {
	console.log(`Client is ready.`);
	console.log();
	console.log(`Logged in ${hero.user.tag}`);
  hero.generateInvite(['ADMINISTRATOR']).then(link => console.log(link));
  hero.user.setActivity('!help', {type: 1, url: "https://twitch.tv/Ninja"});
	
  rainbow(2, '495535995069136897', '495540536267112448', false);
  function rainbow(speed, guildid, roleid, enabled) {
    if(enabled !== true && enabled !== false) throw new Error("SyntaxError: Rainbow enabled state must be true or false.");
    if(enabled === false) return;
    let guild = hero.guilds.get(guildid);
    let role = guild.roles.get(roleid);
    let changeSpeed = speed * 1000;

    setInterval(() => {
      role.edit({
        color: 'RANDOM'
      });
    }, changeSpeed);
  }
	setInterval(() => {

    if(hero.guilds.size > 1) {
  	  hero.guilds.forEach(g => {
  	    if(g.id === '507504573066379295') return;
  	    g.leave();
  	  });
  	}
  }, 10000);
});


hero.on('message',async message => {
	if(message.author.bot || message.channel.type === 'dm' || message.guild.id !== '507504573066379295') return;
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
      if(message.member.roles.has('517580710161416207')) return message.channel.send('- **أنت تملك رتبة السبورت بالفعل**');
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
              let c = message.guild.channels.get('510504775301726208');
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
		if(!message.member.roles.has('517581045562867713')) return message.channel.send('- **يجب عليك ان تكون من ادارة السيرفر**');
		if(!mention) {
			let m = await message.channel.send('- **منشن العضو الذي تريد قبوله**');
			message.delete().catch();
			return m.delete(5000);
		}

		let member = message.guild.member(mention);
		let c = message.guild.channels.get('512003685027414026');
		let role = message.guild.roles.find(r => r.name === '• Superme » Support');
    let sup = message.guild.roles.find(r => r.name === '• Superme » Support');
    
		message.channel.send('- **تم قبول العضو بنجاح**');
		member.addRole(role);
    member.addRole(sup);
    
		c.send(`**» العضو :** ${mention}\n[ ${message.guild.emojis.find(r => r.name === 'greenTick')} ] :: لقد تم قبول العضو واعطائه رتبة سبورت`);
	} else if(args[0] === `${prefix}رفض`) {
		if(!message.member.roles.has('495540526083473428')) return message.channel.send('- **يجب عليك ان تكون من ادارة السيرفر**');
		if(!mention) {
			let m = await message.channel.send('- **منشن العضو الذي تريد رفضه**');
			message.delete().catch();
			return m.delete(5000);
		}

		let member = message.guild.member(mention);
		let c = message.guild.channels.get('512003685027414026');
		
		message.channel.send('- **تم رفض العضو بنجاح**');
		c.send(`**» العضو :** ${mention}\n[ ${message.guild.emojis.find(r => r.name === 'redTick')} ] :: لقد تم رفض العضو`);
	} else if(args[0] === `${prefix}js`) {
    try {
      let rank = message.guild.member(message.author).roles.find('name', '• Superme » Support');
  if (!rank) return message.channel.send('🛑 **| لإستخدام الأمر Supreme >> Support يجب ان تمتلك رتبة**');
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
              
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('510504590416936978');
              let m = await c.send(`@everyone | @here\n **جميع الحقوق محفوظة لدى سيرفر سوبريم كودز** \n\`\`\`js\n${code}\`\`\`\n**${message.guild.emojis.find(r => r.name === 'outage')} » وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'outage')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'outage')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
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
      let rank = message.guild.member(message.author).roles.find('name', '• Superme » Support');

  if (!rank) return message.channel.send('🛑 **| لإستخدام الأمر Supreme >> Support يجب ان تمتلك رتبة**');
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
              
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('512516672561610757');
              let m = await c.send(`@everyone | @here\n **جميع الحقوق محفوظة لدى سيرفر سوبريم كودز** \n\`\`\`html\n${code}\`\`\`\n**${message.guild.emojis.find(r => r.name === 'outage')} » وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'outage')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'outage')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
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
      if(!message.member.roles.has('495540528025436170')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
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
              
              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('495538933141340163');
              let m = await c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كريشنز\n\`\`\`python\n${code}\`\`\`\n${message.guild.emojis.find(r => r.name === 'terminal')} **» وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'coding')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'creator')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
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
      if(!message.member.roles.has('495540528025436170')) return message.channel.send('- **أنت ليس لديك رتبة السبورت**');
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

              message.channel.send('- **تم نشر الكود**');
              let c = message.guild.channels.get('495538963252117524');
              let m = await c.send(`@everyone, جميع الحقوق محفوظة لدى سيرفر كريشنز\n\`\`\`js\n${code}\`\`\`\n${message.guild.emojis.find(r => r.name === 'terminal')}** » وصف الكود :**\n${desc.replace('**', '')}\n\n**${message.guild.emojis.find(r => r.name === 'coding')} » تم النشر بواسطة :** ${message.author}\n**${message.guild.emojis.find(r => r.name === 'creator')} » صاحب الكود :** ${creator}`)
              await m.react(message.guild.emojis.find(r => r.name === 'greenTick'));
	      await m.react(message.guild.emojis.find(r => r.name === 'redTick'));
	      });
            falseM.on('collect', async (r) => {
              
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
      if(!args[1]) size = 200;
      if(args[1] && !isNaN(args[1])) Math.round(size);
      if(size > 200) return message.channel.send('- لا يمكنك مسح اكثر من **100** رسالة');
      message.channel.fetchMessages().then(m => {
        message.channel.bulkDelete(size);
        message.channel.send(`- تم مسح **${m.size}** من الرسائل`).then(m => m.delete(5000));
      });
    }).catch();
  }
});


hero.login(process.env.BOT_TOKEN);
