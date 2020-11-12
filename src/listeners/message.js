const { MessageEmbed, DMChannel } = require('discord.js');
const Guilds = require('../database/guild');
const Staff = require('../database/staff');
const CommandHandler = require('../handlers/commandHandler');

const cooldown = new Set();

module.exports = async function onMessage(message) {
  if (message.author.bot || message.channel.type instanceof DMChannel) return;

  const server = await Guilds.findOne({ _id: message.guild.id }).catch(console.error);
  const staff = await Staff.findOne({ projectName: 'The Punisher' }).catch(console.error);
  const prefixDefault = process.env.PREFIX;

  if (!server) {
    console.log(`Adicionado o servidor ${message.guild.name} na database...`);
    const newGuild = new Guilds({
      _id: message.guild.id,
      prefix: process.env.PREFIX,
    });
    await newGuild.save();
  }

  if (!staff) {
    const newStaff = new Staff();
    newStaff.save();
  }

  const prefix = (server && server.prefix) || prefixDefault;

  if (message.content.toLowerCase().startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(' ');
    const name = args.shift();
    const command = CommandHandler.findCommand(name, this.commands, this.aliases);
    const blackListChannels = server && server.events.get('message').commands.channels;

    if (command) {
      if (cooldown.has(message.author.id)) {
        const msg = await message.reply('Aguarde `3s` para usar outro comando novamente.');
        msg.delete({ timeout: 60 * 1000 });
        return;
      }

      const devs = staff.roles.get('developers');
      if (command.onlyDevs && !devs.includes(message.author.id)) {
        message.channel.send(`**${message.author.username}** | Este comando é exclusivo para desenvolvedores do bot.`);
        return;
      }

      if (server && blackListChannels.length > 0 && blackListChannels.includes(message.channel.id) && message.guild.me.permissions.has('MANAGE_MESSAGES')) {
        const msg = await message.reply('Você não pode executar comandos neste canal.');
        msg.delete({ timeout: 10 * 1000 });
        return;
      }

      const botPerms = command.botPermissions.filter((p) => !message.guild.me.permissions.has(p))
        .map((p) => `\`${p}\``);
      if (botPerms.length) {
        message.replyError(`desculpe, eu preciso da permissão ${botPerms.join(', ')} para executar este comando.`);
        return;
      }

      const userPerms = command.userPermissions.filter((p) => !message.member.permissions.has(p))
        .map((p) => `\`${p}\``);
      if (userPerms.length) {
        message.replyError(`desculpe, você precisa da permissão ${userPerms.join(', ')} para executar este comando.`);
        return;
      }

      Object.defineProperty(message, 'command', { value: command });

      command.run({
        command,
        bot: message.client,
        message,
        server,
        staff,
        args,
        prefix,
        MessageEmbed,
      });

      cooldown.add(message.author.id);

      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 3000);
    }
  }
  const botMention = message.guild ? message.guild.me.toString() : message.client.user.toString();

  if (!message.command) {
    const dbMembers = server.members;

    if (!dbMembers.has(message.author.id)) {
      dbMembers.set(message.author.id, {
        _id: message.author.id,
        level: 0,
        xp: 10,
        coins: 0,
      });
      await server.save().catch(console.error);
    } else {
      const dbMember = dbmembers.cache.get(message.author.id);
      dbMember.xp += 10;

      if (dbMember.xp > dbMember.level * 500) {
        dbMember.xp = 0;
        dbMember.level += 1;
      }
      await server.save().catch(console.error);
    }

    if (message.content.startsWith(botMention)) {
      const msg = await message.channel.send(`<a:caralho:531498188386074624> Olá, ${message.author} está com duvidas? digite \`${!server.prefix ? 'm.' : server.prefix}help\``);
      msg.delete({ timeout: 60 * 1000 }).catch(console.error);
      return;
    }

    if (server && server.events.get('message').filterWords.status && message.guild.me.permissions.has('MANAGE_MESSAGES')) {
      if (server.filterWords.words.some((w) => message.content.toLowerCase().includes(w))) {
        message.delete();
        const msg = await message.channel.send('Esta palavra foi bloqueada.');
        msg.delete({ timeout: 10 * 1000 }).catch(console.error);
      }
    } else if (server && server.events.get('message').inviteBlock.status) {
      const regexInvite = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/([a-zA-Z\-_]+)/i;
      const result = message.content.match(regexInvite);

      if (result && result.length >= 5 && message.guild.me.permissions.has('MANAGE_MESSAGES') && !message.member.permissions.has('ADMINISTRATOR')) {
        const fetchInvite = await message.client.fetchInvite(result[5]).catch(() => null);
        if (!fetchInvite || (fetchInvite.guild && fetchInvite.guild.id === message.guild.id)) {
          return;
        }
        message.delete();
        const msg = await message.channel.send('Você não pode enviar convite de outros servidores.');
        msg.delete({ timeout: 60 * 1000 }).catch(console.error);
      }
    }
  }
};
