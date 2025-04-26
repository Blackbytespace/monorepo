import { describe, expect, it } from 'vitest';
import __parseHtml from '../parseHtml';
import __tagsMap from '../tagsMap.js';
import __chalk from 'chalk';
import __hasAnsi from 'has-ansi';

// Test cases for __parseHtml

describe('__parseHtml', () => {
  Object.entries(__tagsMap).forEach(([key, value]) => {
    // @ts-ignore
    // @TODO        add "single" tag tests
    if (value.tagType === 'single') {
      return;
    //   it(`should format correctly the "${key}" tag`, () => {
    //     const message = `This is a <${key}/>`;
    //     const result = __parseHtml(message);
    //     expect(result).toEqual('This is a \u001b[1mbold\u001b[22m message');
    //   });
    }

    it(`should format correctly the "${key}" tag`, () => {
      const message = `<${key}>This is ${key} message</${key}>`;
      const result = __parseHtml(message);
      expect(__hasAnsi(result)).toBe(true);
    });
  });
});
