import { Position } from '@/core/domain/entity/position';
import Coordinates from '@/core/domain/value-objects/coordinates';
import UUID from '@/core/domain/value-objects/uuid';
import { DistanceCalculator } from '../service/distance-calculator';

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
    private status: string,
    readonly date: Date,
    readonly positions: Position[]
  ) {
    this.rideId = new UUID(rideId);
    this.passengerId = new UUID(passengerId);
    if (driverId) this.driverId = new UUID(driverId);
    this.from = new Coordinates(fromLat, fromLong);
    this.to = new Coordinates(toLat, toLong);
    this.positions = positions;
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
      date,
      []
    );
  }

  accept(driverId: string) {
    this.driverId = new UUID(driverId);
    if (this.status !== 'requested') {
      throw new Error('Ride cannot be accepted');
    }
    this.status = 'accepted';
  }

  start() {
    if (this.status !== 'accepted') throw new Error('Ride cannot be started');
    this.status = 'in_progress';
  }

  updatePosition(position: Position) {
    if (this.status !== 'in_progress') throw new Error('Cannot update position');
    this.positions.push(position);
  }

  getDistance() {
    let distance = 0;
    for (const [index, position] of this.positions.entries()) {
      const nextPosition = this.positions[index + 1];
      if (!nextPosition) break;
      distance += DistanceCalculator.calculate(
        position.getCoordinates(),
        nextPosition.getCoordinates()
      );
    }
    return distance;
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

  getStatus() {
    return this.status;
  }
}
