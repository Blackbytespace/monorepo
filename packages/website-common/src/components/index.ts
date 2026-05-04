import CodeElement from '@blackbyte/code-element';
import IconElement from '@blackbyte/icon-element';

IconElement.addProvider(
  'pixelarticons',
  'https://cdn.blackbyte.space/pixelarticons/%name.svg',
);
IconElement.define('s-icon');
CodeElement.define('s-code');
