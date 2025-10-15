export default class CPF {
  private readonly value: string;

  constructor(value: string) {
    if (!this.isValidCpf(value)) throw new Error('Invalid CPF');
    this.value = value;
  }

  private isValidCpf(cpf: string) {
    if (!cpf) return false;
    cpf = this.sanitizeCpf(cpf);
    const hasValidLength = cpf.length === 11;
    if (!hasValidLength || this.isAllDigitsEqual(cpf)) return false;
    const firstDigit = this.calculateDigit(cpf, 10);
    const secondDigit = this.calculateDigit(cpf, 11);
    return this.extractDigits(cpf) == `${firstDigit}${secondDigit}`;
  }

  private sanitizeCpf(cpf: string) {
    return cpf.replace(/[^0-9]/g, '');
  }

  private isAllDigitsEqual(cpf: string) {
    const firstDigit = cpf[0];
    return [...cpf].every((digit) => digit === firstDigit);
  }

  private calculateDigit(cpf: string, factor: number) {
    let total = 0;
    for (const digit of cpf) {
      if (factor > 1) total += parseInt(digit) * factor--;
    }
    const rest = total % 11;
    return rest < 2 ? 0 : 11 - rest;
  }

  private extractDigits(cpf: string) {
    return cpf.slice(9);
  }

  getValue(): string {
    return this.value;
  }
}
