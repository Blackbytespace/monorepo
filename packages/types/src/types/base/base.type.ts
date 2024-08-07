interface IBase {
  id?: string;
}

export default class __Base {
  protected id: string = '';
  protected data: any = {};

  constructor(props: any = {}) {
    if (props.id === undefined) {
      this.id = `${this.constructor.name.toLowerCase()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    } else {
      this.id = props.id;
    }
    this.data = props;
  }

  public validate(): any[] {
    // @TODO    Implement json schema validation

    return [];
  }

  public set(key: string, value: any): void {
    this.data[key] = value;
  }

  public toObject(): any {
    return this.data;
  }

  public has(key: string): boolean {
    if (this.data[key] === undefined || this.data[key] === null) {
      return false;
    }
    if (typeof this.data[key] === 'string' && this.data[key].trim() === '') {
      return false;
    }
    if (Array.isArray(this.data[key]) && this.data[key].length === 0) {
      return false;
    }
    return true;
  }
}
