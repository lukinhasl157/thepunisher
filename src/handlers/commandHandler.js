/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const { resolve } = require('path');
const { readdirSync, statSync } = require('fs');

function readCommands(path = resolve(__dirname, '..', 'commands')) {
  return readdirSync(path)
    .reduce((commands, filename) => {
      const fullpath = resolve(path, filename);

      if (!fullpath.endsWith('.js')) {
        if (statSync(fullpath).isDirectory()) {
          commands.push(...readCommands(fullpath));
        }
        return commands;
      }

      const command = require(fullpath);

      if (!command.name) {
        command.name = filename.replace('.js', '');
      }

      if (!Array.isArray(command.aliases)) {
        command.aliases = [];
      }

      if (!command.botPermissions) {
        command.botPermissions = [];
      }

      if (!command.userPermissions) {
        command.userPermissions = [];
      }

      if (!Array.isArray(command.aliases)) {
        command.aliases = [];
      }

      command.name = command.name.toLowerCase();
      command.aliases = command.aliases.map((alias) => alias.toLowerCase());

      commands.push(command);

      return commands;
    }, []);
}

function loadAliases(commands) {
  const addAlias = (alias, aliases, commandName) => {
    const conflict = aliases.get(alias);
    if (conflict) {
      throw new Error(`Alias '${alias}' of '${commandName}' already exists on '${conflict}`);
    }
    aliases.set(alias, commandName);
  };

  return commands.reduce((aliases, command) => {
    addAlias(command.name, aliases, command.name);
    command.aliases.forEach((alias) => addAlias(alias, aliases, command.name));
    return aliases;
  }, new Map());
}

function findCommand(query, commands, aliases) {
  return commands.get(aliases.get(query.toLowerCase()));
}

module.exports = { readCommands, loadAliases, findCommand };
