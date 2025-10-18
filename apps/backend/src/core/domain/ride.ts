import Coordinates from './value-objects/coordinates';
import UUID from './value-objects/uuid';

export default class Ride {
  private rideId: UUID;
  private passengerId: UUID;
  private driverId?: UUID;
  private from: Coordinates;
  private to: Coordinates;

  constructor(
    rideId: string,
    passengerId: string,
    driverId: string | null,
    fromLat: number,
    fromLong: number,
    toLat: number,
    toLong: number,
    readonly fare: number,
    readonly distance: number,
    readonly status: string,
    readonly date: Date
  ) {
    this.rideId = new UUID(rideId);
    this.passengerId = new UUID(passengerId);
    if (driverId) {
      this.driverId = new UUID(driverId);
    }
    this.from = new Coordinates(fromLat, fromLong);
    this.to = new Coordinates(toLat, toLong);
  }

  static create(
    passengerId: string,
    fromLat: number,
    fromLong: number,
    toLat: number,
    toLong: number
  ) {
    const rideId = crypto.randomUUID();
    const fare = 0;
    const distance = 0;
    const status = 'requested';
    const date = new Date();
    return new Ride(
      rideId,
      passengerId,
      null,
      fromLat,
      fromLong,
      toLat,
      toLong,
      fare,
      distance,
      status,
      date
    );
  }

  getRideId() {
    return this.rideId.getValue();
  }

  getPassengerId() {
    return this.passengerId.getValue();
  }

  getDriverId() {
    return this.driverId?.getValue();
  }

  getFrom() {
    return this.from;
  }

  getTo() {
    return this.to;
  }
}
