import ComponentSource from './ComponentSource.js';

export default class Component {
  static registerSource(source: ComponentSource): void {
    console.log('register', source);
  }
}
