import { __wait } from '@blackbyte/sugar/datetime';
import __copyText from '../copyText';
import __readText from '../readText';

describe('__copyText', () => {
  it('should copy the text and get it back correctly', async () => {
    const text = 'Hello world';
    __copyText(text);
    await __wait(); // Wait for the clipboard to update
    expect(__readText()).toBe(text);
  });
});
