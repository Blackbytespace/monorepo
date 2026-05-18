import __JsonSchemaUtils from './jsonSchemaUtils.js';

__JsonSchemaUtils.registerSchema('jsonSchemaUtils/id', {
  type: 'string',
  title: 'ID',
  description: 'Unique identifier',
  pattern: '^[a-zA-Z0-9_-]+$',
  minLength: 3,
  maxLength: 50,
  editor: {
    mock: true,
  },
  faker: {
    'string.alpha': [
      {
        length: 10,
        casing: 'lower',
      },
    ],
  },
});

__JsonSchemaUtils.registerSchema('jsonSchemaUtils/class', {
  type: 'string',
  title: 'Class',
  description: 'CSS class name',
  pattern: '^[a-zA-Z0-9_-]+$',
  minLength: 3,
  maxLength: 50,
});
