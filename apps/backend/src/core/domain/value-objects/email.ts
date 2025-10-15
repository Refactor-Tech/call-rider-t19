export default class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValidEmail(value)) throw new Error('Invalid email');
    this.value = value;
  }

  isValidEmail(email: string) {
    return email.match(/^(.+)@(.+)$/);
  }

  getValue() {
    return this.value;
  }
}
