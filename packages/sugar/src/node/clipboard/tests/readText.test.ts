import __copyText from '../copyText';
import __readText from '../readText';

describe('__copyText', () => {
  it('should copy the text and get it back correctly', () => {
    const text = 'Hello world';
    __copyText(text);
    expect(__readText()).toBe(text);
  });
});
