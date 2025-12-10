import { Position } from '@/core/domain/position';
import Ride from '@/core/domain/ride';
import { DatabaseConnection } from '@/infra/database/database-connection';

export interface RideRepository {
  saveRide(ride: Ride): Promise<void>;
  updateRide(ride: Ride): Promise<void>;
  getRideById(rideId: string): Promise<Ride>;
  hasActiveRideByPassengerId(passengerId: string): Promise<boolean>;
  hasActiveRideByDriverId(driverId: string): Promise<boolean>;
}

export class RideDAODatabase implements RideRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async getRideById(rideId: string): Promise<Ride> {
    const [rideData] = await this.connection.query(
      'select * from ccca.ride where ride_id = $1',
      [rideId]
    );
    if (!rideData) throw new Error('Ride not found');
    const positions = [];
    const positionsData = await this.connection.query(
      'select * from ccca.position where ride_id = $1',
      [rideId]
    );
    for (const positionData of positionsData) {
      positions.push(
        new Position(
          positionData.position_id,
          positionData.ride_id,
          parseFloat(positionData.latitude),
          parseFloat(positionData.longitude),
          positionData.date
        )
      );
    }

    return new Ride(
      rideData.ride_id,
      rideData.passenger_id,
      rideData.driver_id,
      parseFloat(rideData.from_lat),
      parseFloat(rideData.from_long),
      parseFloat(rideData.to_lat),
      parseFloat(rideData.to_long),
      parseFloat(rideData.fare),
      parseFloat(rideData.distance),
      rideData.status,
      rideData.date,
      positions
    );
  }

  async hasActiveRideByPassengerId(passengerId: string): Promise<boolean> {
    const [rideData] = await this.connection.query(
      "select 1 from ccca.ride where passenger_id = $1 and status not in ('completed', 'cancelled')",
      [passengerId]
    );
    return !!rideData;
  }

  async hasActiveRideByDriverId(driverId: string): Promise<boolean> {
    const [rideData] = await this.connection.query(
      "select 1 from ccca.ride where driver_id = $1 and status not in ('completed', 'cancelled')",
      [driverId]
    );
    return !!rideData;
  }

  async saveRide(ride: Ride) {
    await this.connection.query(
      'insert into ccca.ride (ride_id, passenger_id, driver_id, from_lat, from_long, to_lat, to_long, fare, distance, status, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        ride.getRideId(),
        ride.getPassengerId(),
        ride.getDriverId(),
        ride.getFrom().getLatitude(),
        ride.getFrom().getLongitude(),
        ride.getTo().getLatitude(),
        ride.getTo().getLongitude(),
        ride.fare,
        ride.distance,
        ride.getStatus(),
        ride.date,
      ]
    );
  }

  async updateRide(ride: Ride) {
    await this.connection.query(
      'update ccca.ride set status = $1, driver_id = $2 where ride_id = $3',
      [ride.getStatus(), ride.getDriverId(), ride.getRideId()]
    );
    for (const position of ride.positions) {
      await this.connection.query(
        'insert into ccca.position (position_id, ride_id, latitude, longitude, date) values ($1, $2, $3, $4, $5) on conflict (position_id) do nothing',
        [
          position.getPositionId(),
          position.getRideId(),
          position.getCoordinates().getLatitude(),
          position.getCoordinates().getLongitude(),
          position.date,
        ]
      );
    }
  }
}
