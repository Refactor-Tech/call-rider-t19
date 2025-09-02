import pgp from 'pg-promise';

export interface RideDAO {
  saveRide(ride: any): Promise<void>;
  getRideById(rideId: string): Promise<any>;
}

export class RideDAODatabase implements RideDAO {
  async getRideById(rideId: string) {
    const connection = pgp()('postgres://admin:123456@localhost:5432/app');
    const [rideData] = await connection.query('select * from ccca.ride where ride_id = $1', [
      rideId,
    ]);
    await connection.$pool.end();
    return {
      rideId: rideData.ride_id,
      passengerId: rideData.passenger_id,
      driverId: rideData.driver_id,
      from: {
        latitude: parseFloat(rideData.from_lat),
        longitude: parseFloat(rideData.from_long),
      },
      to: {
        latitude: parseFloat(rideData.to_lat),
        longitude: parseFloat(rideData.to_long),
      },
      fare: parseFloat(rideData.fare),
      distance: parseFloat(rideData.distance),
      status: rideData.status,
      date: rideData.date,
    };
  }

  async saveRide(ride: any) {
    const connection = pgp()('postgres://admin:123456@localhost:5432/app');
    await connection.query(
      'insert into ccca.ride (ride_id, passenger_id, driver_id, from_lat, from_long, to_lat, to_long, fare, distance, status, date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        ride.rideId,
        ride.passengerId,
        ride.driverId,
        ride.from.latitude,
        ride.from.longitude,
        ride.to.latitude,
        ride.to.longitude,
        ride.fare,
        ride.distance,
        ride.status,
        ride.date,
      ]
    );
    await connection.$pool.end();
  }
}
