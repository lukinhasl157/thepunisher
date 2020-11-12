const ListenerHandler = require('../handlers/listenerHandler');

it('have no return error', () => {
  expect(() => ListenerHandler.loadListeners()).not.toThrow();
});
