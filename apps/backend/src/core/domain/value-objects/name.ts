export default class Name {
  private value: string;

  constructor(value: string) {
    if (!this.isValidName(value)) throw new Error('Invalid name');
    this.value = value;
  }

  isValidName(name: string) {
    return name.match(/^[a-zA-Z]+ [a-zA-Z]+$/);
  }

  getValue(): string {
    return this.value;
  }
}
