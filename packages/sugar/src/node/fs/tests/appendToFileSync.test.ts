import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import __appendToFileSync from '../appendToFileSync';

describe('sugar.node.fs.appendToFileSync', () => {
  it('should append a string to a file', () => {
    const filePath = path.join(__dirname, 'data/test.txt');
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    fs.writeFileSync(filePath, 'Hello, world!');
    __appendToFileSync(filePath, 'How are you?');
    expect(fs.readFileSync(filePath, 'utf8')).toBe('Hello, world!\nHow are you?');
  });
}); 