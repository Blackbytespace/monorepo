import __copyText from '../copyText';
import __readText from '../readText';
describe('sugar.node.clipboad', () => {
  it('Should copy and past a text value correctly', async () => {
    const text = 'hello world';
    __copyText(text);
    expect(text).toBe(__readText());
  });
});
