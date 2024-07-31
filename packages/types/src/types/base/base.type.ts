export default class __Base {
  constructor(props: any = {}) {
    // assign the properties to the instance
    for (let [key, value] of Object.entries(props)) {
      this.set(key, value);
    }
  }

  public set($key: string, $value: any): void {
    this[$key] = $value;
  }

  public toHtml(): string {
    // @ts-ignore
    if (!this.toDomElement) {
      throw new Error(
        `toDomElement method not found in class ' . ${this.constructor.name} . '. You will need to implement your own \"toHtml\" method...`,
      );
    }
    // @ts-ignore
    const $domElement = this.toDomElement();
    return $domElement.outerHTML;
  }
}
