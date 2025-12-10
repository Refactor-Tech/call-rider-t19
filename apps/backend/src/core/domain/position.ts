import UUID from '@/core/domain/value-objects/uuid';
import Coordinates from '@/core/domain/value-objects/coordinates';

export class Position {
  private positionId: UUID;
  private rideId: UUID;
  private coordinates: Coordinates;

  constructor(
    positionId: string,
    rideId: string,
    latitude: number,
    longitude: number,
    readonly date: Date
  ) {
    this.positionId = new UUID(positionId);
    this.rideId = new UUID(rideId);
    this.coordinates = new Coordinates(latitude, longitude);
  }

  static create(rideId: string, latitude: number, longitude: number): Position {
    const positionId = UUID.create();
    const date = new Date();
    return new Position(positionId.getValue(), rideId, latitude, longitude, date);
  }

  getPositionId(): string {
    return this.positionId.getValue();
  }

  getRideId(): string {
    return this.rideId.getValue();
  }

  getCoordinates(): Coordinates {
    return this.coordinates;
  }
}
