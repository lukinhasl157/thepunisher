const { Permissions } = require('discord.js');
const CommandHandler = require('../handlers/commandHandler');
const categories = require('../utils/categories.json');

describe('Command Tests', () => {
  const commands = CommandHandler.readCommands();

  test('test if command obj has unknown props', () => {
    const commandProps = ['description', 'aliases', 'name', 'run', 'category', 'botPermissions', 'userPermissions'];
    expect(commands
      .map((c) => [c.name, Object.getOwnPropertyNames(c)
        .filter((p) => !commandProps.includes(p))])
      .filter((c) => c[1].length)).toEqual([]);
  });

  test('test if have any commands without a handler', () => {
    expect(commands.filter((c) => !c.run).map((c) => c.name)).toEqual([]);
  });

  test('test if have any commands with an invalid aliases', () => {
    expect(
      commands.filter((c) => c.aliases.some((alias) => typeof alias !== 'string')),
    ).toEqual([]);
  });

  it('should have no duplicate names or aliases', () => {
    const aliases = commands
      .reduce((arr, command) => [...arr, command.name, ...(command.aliases || [])], []);

    const dupes = aliases.filter((v, i, arr) => arr.indexOf(v) !== i);
    expect(dupes).toEqual([]);
  });

  const invalidatePermissions = (perms) => perms.filter((p) => !Permissions.FLAGS[p]);
  it('should have no invalid bot permissions', () => {
    expect(commands.reduce((p, v) => {
      const perms = invalidatePermissions(v.botPermissions);
      if (perms.length) {
        p.push([v.name, perms]);
      }
      return p;
    }, []));
  });

  it('should have no invalid bot permissions', () => {
    expect(commands.reduce((p, v) => {
      const perms = invalidatePermissions(v.botPermissions);
      if (perms.length) {
        p.push([v.name, perms]);
      }
      return p;
    }, []));
  });

  test('test if have any commands without a description', () => {
    expect(commands.filter((c) => !c.description).map((c) => c.name)).toEqual([]);
  });

  test('test if have any commands without a category or invalid category', () => {
    const categoryNames = categories.map((c) => c.name);
    expect(
      commands
        .filter((c) => !c.category || !categoryNames.includes(c))
        .map((c) => c.name),
    ).toEqual([]);
  });
});
