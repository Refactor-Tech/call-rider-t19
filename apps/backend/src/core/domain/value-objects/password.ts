export default class Password {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}
