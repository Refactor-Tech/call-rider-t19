export default class CarPlate {
  private readonly value: string;

  constructor(value: string) {
    if (value && !this.isValidCarPlate(value)) throw new Error('Invalid car plate');
    this.value = value;
  }

  isValidCarPlate(carPlate: string) {
    return carPlate.match(/[A-Z]{3}[0-9]{4}/);
  }

  getValue() {
    return this.value;
  }
}
