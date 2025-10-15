import crypto from 'crypto';

export default class UUID {
  private value: string;

  constructor(value: string) {
    if (!this.isValidUUID(value)) throw new Error('Invalid UUID');
    this.value = value;
  }

  private isValidUUID(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  static create() {
    const uuid = crypto.randomUUID();
    return new UUID(uuid);
  }

  getValue(): string {
    return this.value;
  }
}
